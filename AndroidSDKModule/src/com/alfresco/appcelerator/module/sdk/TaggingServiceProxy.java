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

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.alfresco.mobile.android.api.model.Tag;
import org.alfresco.mobile.android.api.services.TaggingService;
import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.util.Log;

import com.alfresco.appcelerator.module.sdk.AndroidsdkmoduleModule;
import com.alfresco.appcelerator.module.sdk.NodeProxy;
import com.alfresco.appcelerator.module.sdk.SDKUtil;
import com.alfresco.appcelerator.module.sdk.SessionProxy;
import com.alfresco.appcelerator.module.sdk.TagProxy;


@SuppressWarnings("deprecation")
@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class) 
public class TaggingServiceProxy extends KrollProxy 
{
	TaggingService service;
	
	public TaggingServiceProxy() 
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
    	
        service = seshProxy.session.getServiceRegistry().getTaggingService();
	}


	/**
	 Retrieve all tags
	*/
	@Kroll.method
	void retrieveAllTags (Object[] noargs)
	{
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<Tag> entries;
    			
				try
				{
					entries = service.getAllTags();
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "TaggingService.getAllTags()", TaggingServiceProxy.this);
                    return;
				}
				
				Log.i("Alfresco", "Tags: " + entries.size());
    	        
    	        for (Tag entry : entries)
    	        {
    	        	TagProxy tagProxy = new TagProxy(entry);
    	        	createEventWithTag (tagProxy);
    	        }
    	        SDKUtil.createEnumerationEndEvent (TaggingServiceProxy.this, "retrieveAllTags", null);
    	    
    	        super.run();
    		}
    	}.start();
	}


	/**
	 Retrieve all tags
	 @param Folder or Document object
	 */
	@Kroll.method
	void retrieveTagsForNode (Object[] arg)
	{
		final NodeProxy nodeProxy = (NodeProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<Tag> entries;
    			
				try
				{
					entries = service.getTags(nodeProxy.node);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "TaggingService.getTags()", TaggingServiceProxy.this);
                    return;
				}
				
				Log.i("Alfresco", "Tags: " + entries.size());
    	        
    	        for (Tag entry : entries)
    	        {
    	        	TagProxy tagProxy = new TagProxy(entry);
    	        	createEventWithTag (tagProxy);
    	        }
    	        SDKUtil.createEnumerationEndEvent (TaggingServiceProxy.this, "retrieveTagsForNode", nodeProxy);
    	    
    	        super.run();
    		}
    	}.start();
	}
	

	/** Adds the given tags to the given node.
	 @param Array of strings containing tags that should be added.
	 @param The node to which the tags should be added.
	 @since v1.1
	 */
	@Kroll.method
	void addTags(Object args[])
	{
		final Object[] tags = (Object[])args[0];
		final NodeProxy nodeProxy = (NodeProxy)args[1];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			String[] stringTags = Arrays.copyOf (tags, tags.length, String[].class);
    			
				try
				{
					service.addTags (nodeProxy.node, Arrays.asList(stringTags));
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "TaggingService.addTags()", TaggingServiceProxy.this);
                    return;
				}
				
				HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("code", (Integer)1);
		        fireEvent("addedtags", new KrollDict(map));
    	        super.run();
    		}
    	}.start();
	}
		
	
	private void createEventWithTag (TagProxy tag)
	{
		HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("tag", tag);
        fireEvent("tagnode", new KrollDict(map));
	}
}
