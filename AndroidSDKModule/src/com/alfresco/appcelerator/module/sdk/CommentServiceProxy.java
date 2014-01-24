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
    	        	createEventWithComment (commentProxy, "commentnode");
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
    	        	createEventWithComment (commentProxy, "commentnode");
    	        }
    	        SDKUtil.createEnumerationEndEvent (CommentServiceProxy.this);
    	    
    	        super.run();
    		}
    	}.start();
	}
	
	
	/** Adds a comment to a node.
	 @param The node to which a comments will be added.
	 @param The comment content.
	 @param The comment title.
	 @since v1.1
	 */
	@Kroll.method
	void addCommentToNode(Object args[])
	{
		final NodeProxy nodeProxy = (NodeProxy)args[0];
		final String commentString = (String)args[1];
		final String commentTitle = (String)args[2];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			Comment comment;
    			
				try
				{
					comment = service.addComment (nodeProxy.node, commentString);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "CommentService.addComment()", CommentServiceProxy.this);
                    return;
				}
				
				CommentProxy commentProxy = new CommentProxy (comment);
				createEventWithComment (commentProxy, "commentupdated");
    	        
    	        super.run();
    		}
    	}.start();
	}


	/** Updates a comment.
	 @param The node of the comment to be updated.
	 @param The Comment of the node to be updated
	 @param The new comment content.
	 @since v1.1
	*/
	@Kroll.method
	void updateCommentOnNode(Object args[])
	{
		final NodeProxy nodeProxy = (NodeProxy)args[0];
		final CommentProxy commentProxy = (CommentProxy)args[1];
		final String commentString = (String)args[1];
		
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			Comment comment;
    			
				try
				{
					comment = service.updateComment (nodeProxy.node, commentProxy.comment, commentString);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "CommentService.updateComment()", CommentServiceProxy.this);
                    return;
				}
				
				CommentProxy commentProxy = new CommentProxy (comment);
				createEventWithComment (commentProxy, "commentupdated");
    	        
    	        super.run();
    		}
    	}.start();
	}


	/** Deletes a comment.
	 @param The node of the comment to be deleted
	 @param The comment that needs to be deleted.
	 @since v1.1
	*/
	@Kroll.method
	void deleteCommentFromNode(Object args[])
	{
		final NodeProxy nodeProxy = (NodeProxy)args[0];
		final CommentProxy commentProxy = (CommentProxy)args[1];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
				try
				{
					service.deleteComment (nodeProxy.node, commentProxy.comment);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "CommentService.deleteComment()", CommentServiceProxy.this);
                    return;
				}
				
				HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("code", new Integer(1));
		        fireEvent("deletedcomment", new KrollDict(map));
    	        
    	        super.run();
    		}
    	}.start();
	}

	
	
	private void createEventWithComment (CommentProxy commentProxy, String context)
	{
		HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("comment", commentProxy);
        fireEvent(context, new KrollDict(map));
	}
}
