package com.alfresco.appcelerator.module.sdk;

import java.util.HashMap;
import java.util.List;

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
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
public class RepositorySessionProxy extends KrollProxy 
{
	public RepositorySessionProxy()
	{
		super();
	}
	
	@Kroll.method
	public void connect()
	{
		Log.w("test", "msg");
		
		//TODO: Get params from Javascript.
		// Also replace 'localhost' with '10.0.2.2' if it comes in, as this is required in emulator.
		String url = "http://10.0.2.2:8080/alfresco";
        String username = "admin";
        String password = "password";

        new ConnectToRepo().execute(url, username, password);
	}
	
	
	class ConnectToRepo extends AsyncTask<String, Integer, String>
    {
        private static final String TAG = "ConnectToRepo";

        @Override
        protected String doInBackground(String... params)
        {

            Log.d(TAG, "doInBackground");
            Log.d(TAG, params[0] + ":" + params[1] + ":" + params[2]);

            String url = params[0];
            String username = params[1];
            String password = params[2];

            // HelloRepo
            try
            {
                // connect to on-premise repo
                RepositorySession session = RepositorySession.connect(url, username, password);

                if (session != null)
                {
                    // Get some repository information
                    Log.d(TAG, "baseUrl: " + session.getBaseUrl());
                    Log.d(TAG, "rootFolder: " + session.getRootFolder().getName());

                    // Obtain a repository information object
                    RepositoryInfo repoInfo = session.getRepositoryInfo();

                    Log.d(TAG, "repoId: " + repoInfo.getIdentifier());
                    Log.d(TAG, "repoName: " + repoInfo.getName());
                    Log.d(TAG, "repoDescription: " + repoInfo.getDescription());
                    Log.d(TAG, "repoVersion: " + repoInfo.getVersion());
                    Log.d(TAG, "repoEdition: " + repoInfo.getEdition());

                    HashMap<String, Object> map = new HashMap<String, Object>();
                    map.put("servername", repoInfo.getName());
                    fireEvent("success", new KrollDict(map));
                    
                    /*
                    // Get site service
                    SiteService siteService = session.getServiceRegistry().getSiteService();

                    // Get sites for current user
                    List<Site> sites = siteService.getSites();

                    // Get first site
                    Site site = sites.get(0);

                    // Get site document library
                    Folder folder = siteService.getDocumentLibrary(site);

                    // Find DocumentFolderService
                    DocumentFolderService documentFolderService = session.getServiceRegistry()
                            .getDocumentFolderService();

                    // Get children of document library
                    List<Node> nodes = documentFolderService.getChildren(folder);

                    for (Node node : nodes)
                    {

                        Log.d(TAG,
                                "node: " + node.getTitle() + "=" + node.getName() + " created by: "
                                        + node.getCreatedBy() + " isFolder: " + node.isFolder());

                    }
*/
                }
                else
                {
                    Log.d(TAG, "No Session available!");
                    
                    HashMap<String, Object> map = new HashMap<String, Object>();
                    map.put("errorcode", TiConvert.toInt(1) );
                    fireEvent("error", new KrollDict(map) );
                }

            }
            catch (AlfrescoSessionException e)
            {
                Log.e(TAG, "Failed to connect: " + e.toString());
                
                HashMap<String, Object> map = new HashMap<String, Object>();
                map.put("errorcode", TiConvert.toInt(e.getErrorCode()) );
                fireEvent("error", new KrollDict(map) );
            }

            Log.d(TAG, "doInBackground Complete");
            return "doInBackground Complete";
        }

        @Override
        protected void onPostExecute(String result)
        {
            super.onPostExecute(result);
            Log.d(TAG, "onPostExecute");
        }

        @Override
        protected void onProgressUpdate(Integer... values)
        {
            super.onProgressUpdate(values);
            Log.d(TAG, "onProgressUpdate");

        }

    }
}
