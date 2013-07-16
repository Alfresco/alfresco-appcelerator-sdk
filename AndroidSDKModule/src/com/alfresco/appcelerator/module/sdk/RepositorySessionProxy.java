package com.alfresco.appcelerator.module.sdk;

import java.util.HashMap;
import java.util.List;

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.kroll.annotations.Kroll.getProperty;
import org.appcelerator.titanium.util.TiConvert;

import android.os.AsyncTask;
import android.util.Log;

import org.alfresco.mobile.android.api.exceptions.AlfrescoSessionException;
import org.alfresco.mobile.android.api.model.Folder;
import org.alfresco.mobile.android.api.model.Node;
import org.alfresco.mobile.android.api.model.RepositoryInfo;
import org.alfresco.mobile.android.api.model.Site;
import org.alfresco.mobile.android.api.services.DocumentFolderService;
import org.alfresco.mobile.android.api.services.SiteService;
import org.alfresco.mobile.android.api.session.RepositorySession;
import org.alfresco.mobile.android.api.session.impl.*;

@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class, propertyAccessors = { "serverUrl", "serverUsername", "serverPassword" })
public class RepositorySessionProxy extends SessionProxy 
{
	public RepositorySessionProxy()
	{
		super();
	}
	
	@Kroll.method
	public void connect()
	{
		String url = (String) getProperty("serverUrl");
		url = url.replace("localhost", "10.0.2.2");	//For emulator to call on a local server.
		Log.i ("Alfresco", "URL: " + url);
		
        String username = (String) getProperty("serverUsername");
        String password = (String) getProperty("serverPassword");

        new ConnectToRepo().execute(url, username, password);
	}
	
	
	class ConnectToRepo extends AsyncTask<String, Integer, String>
    {
        private static final String TAG = "ConnectToRepo";

        @Override
        protected String doInBackground(String... params)
        {
            String url = params[0];
            String username = params[1];
            String password = params[2];

            try
            {
                // connect to on-premise repo
                RepositorySessionProxy.this.session = RepositorySession.connect(url, username, password);

                if (session != null)
                {
                    // Obtain a repository information object
                    RepositorySessionProxy.this.info = session.getRepositoryInfo();

                    HashMap<String, Object> map = new HashMap<String, Object>();
                    map.put("servername", info.getName());
                    fireEvent("success", new KrollDict(map));
                }
                else
                {
                    Log.d(TAG, "No Session available!");
                    
                    RepositorySessionProxy.this.error = - 1;
                    
                    HashMap<String, Object> map = new HashMap<String, Object>();
                    map.put("errorcode", TiConvert.toInt(error) );
                    fireEvent("error", new KrollDict(map) );
                }

            }
            catch (AlfrescoSessionException e)
            {
                Log.e(TAG, "Failed to connect: " + e.toString());
                
                RepositorySessionProxy.this.error = e.getErrorCode();
                
                HashMap<String, Object> map = new HashMap<String, Object>();
                map.put("errorcode", TiConvert.toInt(error));
                map.put("errorstring", e.getMessage());
                fireEvent("error", new KrollDict(map) );
            }

            return "doInBackground Complete";
        }

        @Override
        protected void onPostExecute(String result)
        {
            super.onPostExecute(result);
        }

        @Override
        protected void onProgressUpdate(Integer... values)
        {
            super.onProgressUpdate(values);
        }
    }
}
