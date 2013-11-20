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

import java.util.HashMap;
import java.util.List;

import org.alfresco.mobile.android.api.model.Comment;
import org.alfresco.mobile.android.api.services.CommentService;
import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.util.Log;

@SuppressWarnings("deprecation")
@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class CommentServiceProxy extends KrollProxy 
{
	CommentService service;
	
	public CommentServiceProxy() 
	{
		super();
	}
	
	
	/** Initialise the service
	 @param RepositorySession session
	 @since v1.0
	 */
	@Kroll.method
	void initialiseWithSession (Object[] arg)
	{
		SessionProxy seshProxy = (SessionProxy) arg[0];
    	
        service = seshProxy.session.getServiceRegistry().getCommentService();
	}


	/** Retrieve comments for a give document or folder object
	 @param Document or Folder object
	 @since v1.0
	 */
	@Kroll.method
	void retrieveCommentsForNode (Object[] arg)
	{
		final NodeProxy nodeProxy = (NodeProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<Comment> entries;
    			
				try
				{
					entries = service.getComments (nodeProxy.node);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "CommentService.getComments()", CommentServiceProxy.this);
                    return;
				}
				
				Log.i("Alfresco", "Comments: " + entries.size());
    	        
    	        for (Comment entry : entries)
    	        {
    	        	CommentProxy commentProxy = new CommentProxy(entry);
    	        	createEventWithComment (commentProxy);
    	        }
    	        SDKUtil.createEnumerationEndEvent (CommentServiceProxy.this);
    	    
    	        super.run();
    		}
    	}.start();
	}


	/** Retrieve comments for a give document or folder object, with listing context
	 @param Document or Folder object
	 @param ListingContext listingContext
	 @since v1.0
	 */
	@Kroll.method
	void retrieveCommentsForNodeWithListingContext (Object[] args)
	{
		final NodeProxy nodeProxy = (NodeProxy)args[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<Comment> entries;
    			
				try
				{
					entries = service.getComments (nodeProxy.node);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "CommentService.getComments()", CommentServiceProxy.this);
                    return;
				}
				
				Log.i("Alfresco", "Comments: " + entries.size());
    	        
    	        for (Comment entry : entries)
    	        {
    	        	CommentProxy commentProxy = new CommentProxy(entry);
    	        	createEventWithComment (commentProxy);
    	        }
    	        SDKUtil.createEnumerationEndEvent (CommentServiceProxy.this);
    	    
    	        super.run();
    		}
    	}.start();
	}
	
	
	private void createEventWithComment (CommentProxy commentProxy)
	{
		HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("comment", commentProxy);
        fireEvent("commentnode", new KrollDict(map));
	}
}
