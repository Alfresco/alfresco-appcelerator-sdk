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
import org.alfresco.mobile.android.api.services.RatingService;
import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.util.Log;
import org.appcelerator.titanium.util.TiConvert;


@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class RatingServiceProxy extends KrollProxy
{
	private RatingService service;
    
    public RatingServiceProxy() 
    {
		super();
	}
    
    
    @Kroll.method
    void initialiseWithSession(Object[] args)
    {
    	SessionProxy seshProxy = (SessionProxy) args[0];
        service = seshProxy.session.getServiceRegistry().getRatingService();
    }
    
    
    /** Retrieves the number of likes for the given node.
    @param The node for which the like count needs to be retrieved.
    @since v1.1
    */
    @Kroll.method
    void retrieveLikeCountForNode(Object arg[])
    {
    	final NodeProxy nodeProxy = (NodeProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			int count = 0;
    			
				try
				{
					count = service.getLikeCount (nodeProxy.node);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "RatingService.getLikeCount()", RatingServiceProxy.this);
                    return;
				}
				
				HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put ("count", new Integer(count));
		        fireEvent ("retrievedlikecount", new KrollDict(map));
    	    
    	        super.run();
    		}
    	}.start();
    }
    

   /** Has the user liked the given node?
    @param The node for which the like rating should be validated.
    @since v1.1
    */
    @Kroll.method
    void isNodeLiked(Object arg[])
    {
    	final NodeProxy nodeProxy = (NodeProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			boolean isLiked = false;
    			
				try
				{
					isLiked = service.isLiked (nodeProxy.node);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "RatingService.isLiked()", RatingServiceProxy.this);
                    return;
				}
				
				HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put ("isliked", new Integer(isLiked ? 1 : 0));
		        fireEvent ("retrievedisliked", new KrollDict(map));
    	    
    	        super.run();
    		}
    	}.start();
    }

    
   /** Adds a like rating to the given node.
    @param The node for which the like rating should be added.
    @since v1.1
    */
    @Kroll.method
    void likeNode(Object arg[])
    {
    	final NodeProxy nodeProxy = (NodeProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
				try
				{
					service.like (nodeProxy.node);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "RatingService.like()", RatingServiceProxy.this);
                    return;
				}
				
				HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put ("code", new Integer(1));
		        fireEvent ("likednode", new KrollDict(map));
    	    
    	        super.run();
    		}
    	}.start();
    }

    
   /** Removes the like rating from the given node.
    @param The node for which the like rating should be removed.
    @since v1.1
    */
    @Kroll.method
    void unlikeNode(Object arg[])
    {
    	final NodeProxy nodeProxy = (NodeProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
				try
				{
					service.unlike (nodeProxy.node);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "RatingService.unlike()", RatingServiceProxy.this);
                    return;
				}
				
				HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put ("code", new Integer(1));
		        fireEvent ("unlikednode", new KrollDict(map));
    	    
    	        super.run();
    		}
    	}.start();
    }
}
