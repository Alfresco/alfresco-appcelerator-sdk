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

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.util.Log;
import org.alfresco.mobile.android.api.model.ActivityEntry;
import org.alfresco.mobile.android.api.model.PagingResult;
import org.alfresco.mobile.android.api.services.ActivityStreamService;


@SuppressWarnings("deprecation")
@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class ActivityServiceProxy extends KrollProxy 
{
	private ActivityStreamService service;
	
	public ActivityServiceProxy()
	{
		super();
	}
	
	
	/** Initialises the service
	 @param RepositorySession session
	 */
	@Kroll.method
	void initialiseWithSession (Object[] arg)
	{
		SessionProxy seshProxy = (SessionProxy) arg[0];
    	
        service = seshProxy.session.getServiceRegistry().getActivityStreamService();
	}


	/** Retrieves all activities for the logged-in user.
	 */
	@Kroll.method
	void retrieveActivityStream (Object[] noargs)
	{
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<ActivityEntry> entries;
    			
				try
				{
					entries = service.getActivityStream();
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "ActivityStreamService.getActivityStream()", ActivityServiceProxy.this);
                    return;
				}
				
				Log.i("Alfresco", "Activities: " + entries.size());
    	        
    	        for (ActivityEntry entry : entries)
    	        {
    	        	createEventWithActivityEntry(entry);
    	        }
    	        SDKUtil.createEnumerationEndEvent (ActivityServiceProxy.this);
    	    
    	        super.run();
    		}
    	}.start();
	}


	/** Retrieves all activities for the logged-in user with listing context
	 @param ListingContext listingContext
	 */
	@Kroll.method
	void retrieveActivityStreamWithListingContext (Object[] arg)
	{
		final ListingContextProxy listingContextProxy = (ListingContextProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			PagingResult<ActivityEntry> entries;
    			
				try
				{
					entries = service.getActivityStream (listingContextProxy.listingContext);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "ActivityStreamService.getActivityStream()", ActivityServiceProxy.this);
                    return;
				}
				
				Log.i("Alfresco", "Activities: " + entries.getList().size());
    	        
    	        for (ActivityEntry entry : entries.getList())
    	        {
    	        	createEventWithActivityEntry(entry);
    	        }
    	        SDKUtil.createEventWithPagingResult(entries, ActivityServiceProxy.this);
    	        SDKUtil.createEnumerationEndEvent (ActivityServiceProxy.this);
    	    
    	        super.run();
    		}
    	}.start();
	}


	/** Retrieves activities for the given person.
	 @param String person
	 */
	@Kroll.method
	void retrieveActivityStreamForPerson (Object[] arg)
	{
		final String person = (String)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<ActivityEntry> entries;
    			
				try
				{
					entries = service.getActivityStream (person);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "ActivityStreamService.getActivityStream()", ActivityServiceProxy.this);
                    return;
				}
				
				Log.i("Alfresco", "Activities: " + entries.size());
    	        
    	        for (ActivityEntry entry : entries)
    	        {
    	        	createEventWithActivityEntry(entry);
    	        }
    	        SDKUtil.createEnumerationEndEvent (ActivityServiceProxy.this);
    	    
    	        super.run();
    		}
    	}.start();
	}


	/** Retrieves activities for the given person, with listing context.
	@param String person
	@param ListingContext listingContext
	*/
	@Kroll.method
	void retrieveActivityStreamForPersonWithListingContext (Object[] args)
	{
		final String person = (String)args[0];
		final ListingContextProxy listingContextProxy = (ListingContextProxy)args[1];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			PagingResult<ActivityEntry> entries;
    			
				try
				{
					entries = service.getActivityStream (person, listingContextProxy.listingContext);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "ActivityStreamService.getActivityStream()", ActivityServiceProxy.this);
                    return;
				}
				
				Log.i("Alfresco", "Activities: " + entries.getList().size());
    	        
    	        for (ActivityEntry entry : entries.getList())
    	        {
    	        	createEventWithActivityEntry(entry);
    	        }
    	        SDKUtil.createEventWithPagingResult (entries, ActivityServiceProxy.this);
    	        SDKUtil.createEnumerationEndEvent (ActivityServiceProxy.this);
    	    
    	        super.run();
    		}
    	}.start();	
	}


	/** Retrieves activities for the given site.
	 @param Site site
	 */
	@Kroll.method
	void retrieveActivityStreamForSite (Object[] arg)
	{
		SiteProxy siteProxy = (SiteProxy)arg[0];
		final String site = siteProxy.site.getIdentifier();
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<ActivityEntry> entries;
    			
				try
				{
					entries = service.getSiteActivityStream(site);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "ActivityStreamService.getSiteActivityStream()", ActivityServiceProxy.this);
                    return;
				}
				
				Log.i("Alfresco", "Activities: " + entries.size());
    	        
    	        for (ActivityEntry entry : entries)
    	        {
    	        	createEventWithActivityEntry(entry);
    	        }
    	        SDKUtil.createEnumerationEndEvent (ActivityServiceProxy.this);
    	    
    	        super.run();
    		}
    	}.start();
	}


	/** Retrieves activities for the given site.
	 @param Site site
	 @param ListingContext listingContext
	 */
	@Kroll.method
	void retrieveActivityStreamForSiteWithListingContext (Object[] args)
	{
		SiteProxy siteProxy = (SiteProxy)args[0];
		final String site = siteProxy.site.getIdentifier();
		final ListingContextProxy listingContextProxy = (ListingContextProxy)args[1];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			PagingResult<ActivityEntry> entries;
    			
				try
				{
					entries = service.getSiteActivityStream(site, listingContextProxy.listingContext);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "ActivityStreamService.getSiteActivityStream()", ActivityServiceProxy.this);
                    return;
				}
				
				Log.i("Alfresco", "Activities: " + entries.getList().size());
    	        
    	        for (ActivityEntry entry : entries.getList())
    	        {
    	        	createEventWithActivityEntry(entry);
    	        }
    	        SDKUtil.createEventWithPagingResult(entries, ActivityServiceProxy.this);
    	        SDKUtil.createEnumerationEndEvent (ActivityServiceProxy.this);
    	    
    	        super.run();
    		}
    	}.start();
	}



	//Internal
	void createEventWithActivityEntry (ActivityEntry entry)
	{
		ActivityProxy activityProxy = new ActivityProxy (entry);
	    
	    HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("activity", activityProxy);
        fireEvent("activitynode", new KrollDict(map));
	}
}
