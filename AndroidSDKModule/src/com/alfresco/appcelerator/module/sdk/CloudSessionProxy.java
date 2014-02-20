/*
 ******************************************************************************
 * Copyright (C) 2005-2014 Alfresco Software Limited.
 * 
 * This file is part of the Alfresco Mobile SDK.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  
 *  http://www.apache.org/licenses/LICENSE-2.0
 * 
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *****************************************************************************
 */
package com.alfresco.appcelerator.module.sdk;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.util.TiConvert;

import android.os.AsyncTask;
import android.util.Log;

import org.alfresco.mobile.android.api.exceptions.AlfrescoSessionException;
import org.alfresco.mobile.android.api.session.AlfrescoSession;
import org.alfresco.mobile.android.api.session.CloudNetwork;
import org.alfresco.mobile.android.api.session.CloudSession;
import org.alfresco.mobile.android.api.session.authentication.impl.OAuth2DataImpl;


@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class CloudSessionProxy extends SessionProxy 
{
	OAuth2DataImpl data;
	String networkID = null;
	boolean init = true;
	
	
	public CloudSessionProxy()
	{
		super();
	}
	
	
	/**
	 Initialise the Cloud Session.  This must be called before any retrieveNetworks call.
	 @param oauthData
	 @since v1.2
	 */
	@Kroll.method
	void initialiseWithOAuthData(Object[] arg)
	{
		OAuthDataProxy dataProxy = (OAuthDataProxy)arg[0];
		
		init = true;
		data = dataProxy.data;
		
		new ConnectToRepo().execute();
	}


	/**
	 This method obtains a list of available Cloud networks (or domains/tenants) for the registered user.
	 @since v1.2
	 */
	@Kroll.method
	void retrieveNetworks(Object[] noargs)
	{
		new Thread()
		{
			@Override
    		public void run() 
    		{
				List<CloudNetwork> networks = ((CloudSession)session).getNetworks();
				
				for (CloudNetwork n : networks)
				{
					HashMap<String, Object> map = new HashMap<String, Object>();
                    map.put("networkid", n.getIdentifier());
                    fireEvent("retrievednetwork", new KrollDict(map));
				}
				SDKUtil.createEnumerationEndEvent (CloudSessionProxy.this, "retrieveNetworks", null);
    		}
		}.start();
	}


	/**
	 Connect to default network using access and refresh tokens from OAuth data provided during initialisation.
	 @since v1.2
	 */
	@Kroll.method
	void connect(Object[] noargs)
	{
		networkID = null;
		
        new ConnectToRepo().execute();
	}


	/**
	 Connect to given network using access and refresh tokens from OAuth data provided during initialisation.
	 @param networkIdentifer - also known as tenent ID
	 @since v1.2
	 */
	@Kroll.method
	void connectWithNetworkID(Object[] arg)
	{
		networkID = (String)arg[0];
		
		new ConnectToRepo().execute();
	}
	
	
	class ConnectToRepo extends AsyncTask<String, Integer, String>
    {
        private static final String TAG = "ConnectToRepo";

        @Override
        protected String doInBackground(String... params)
        {
            try
            {
            	// connect to cloud repo
            	
            	Map<String,Serializable> connectParams = new HashMap<String,Serializable>();
        		
        		connectParams.put (AlfrescoSession.HTTP_ACCEPT_ENCODING, "false");
        		connectParams.put (AlfrescoSession.HTTP_CHUNK_TRANSFERT, "true");
        		
            	if (networkID != null)
            		session = CloudSession.connect (data, networkID, connectParams);
            	else
            	{
            		Log.d(TAG, "Data: " + data.getApiKey() + ", " + data.getAccessToken() + ", " + data.getRefreshToken() );
            		
            		session = CloudSession.connect (data, connectParams);
            	}
            	
                if (session != null)
                {
                    // Obtain a repository information object

                	if (!init)
                	{
	                	info = session.getRepositoryInfo();
	                    HashMap<String, Object> map = new HashMap<String, Object>();
	                    map.put("servername", info.getName());
	                    fireEvent("success", new KrollDict(map));
                	}
                	else
                	{
                		HashMap<String, Object> map = new HashMap<String, Object>();
	                    map.put("code", "");
	                    fireEvent("retrievedsession", new KrollDict(map));
	                    
	                    init = false;
                	}
                }
                else
                {
                    Log.d(TAG, "No Session available!");
                    
                    CloudSessionProxy.this.error = - 1;
                    
                    HashMap<String, Object> map = new HashMap<String, Object>();
                    map.put("errorcode", TiConvert.toInt(error) );
                    fireEvent("error", new KrollDict(map) );
                }

            }
            catch (AlfrescoSessionException e)
            {
                Log.e(TAG, "Failed to connect: " + e.toString());
                
                CloudSessionProxy.this.error = e.getErrorCode();
                
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
