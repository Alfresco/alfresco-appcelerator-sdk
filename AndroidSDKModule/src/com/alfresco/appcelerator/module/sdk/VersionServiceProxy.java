/*
 ******************************************************************************
 * Copyright (C) 2005-2013 Alfresco Software Limited.
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
 
import java.util.List;

import org.alfresco.mobile.android.api.model.Document;
import org.alfresco.mobile.android.api.model.Node;
import org.alfresco.mobile.android.api.services.VersionService;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.util.Log;

import com.alfresco.appcelerator.module.sdk.AndroidsdkmoduleModule;
import com.alfresco.appcelerator.module.sdk.SDKUtil;
import com.alfresco.appcelerator.module.sdk.SessionProxy;


@SuppressWarnings("deprecation")
@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class) 
public class VersionServiceProxy extends KrollProxy 
{
	VersionService service;
	
	public VersionServiceProxy() 
	{
		super();
	}
	
	
	/**
	 Initialise the service
	 @param RepositorySession session
	*/
	@Kroll.method
	void initialiseWithSession (Object[] arg)
	{
		SessionProxy seshProxy = (SessionProxy) arg[0];
    	
        service = seshProxy.session.getServiceRegistry().getVersionService();
	}


	/**
	 Retrieve all version of document node
	 @param Document docObject
	 */
	@Kroll.method
	void retrieveAllVersionsOfDocument (Object[] arg)
	{
		final DocumentProxy docProxy = (DocumentProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<Document> entries;
    			
				try
				{
					entries = service.getVersions (docProxy.getDocument());
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "TaggingService.getAllTags()", VersionServiceProxy.this);
                    return;
				}
				
				Log.i("Alfresco", "Tags: " + entries.size());
    	        
    	        for (Node entry : entries)
    	        {
    	        	SDKUtil.createEventWithNode(entry, VersionServiceProxy.this);
    	        }
    	        SDKUtil.createEnumerationEndEvent (VersionServiceProxy.this);
    	    
    	        super.run();
    		}
    	}.start();
	}
}
