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

import org.alfresco.mobile.android.api.model.Folder;
import org.alfresco.mobile.android.api.model.PagingResult;
import org.alfresco.mobile.android.api.model.Person;
import org.alfresco.mobile.android.api.model.Site;
import org.alfresco.mobile.android.api.services.SiteService;
import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.util.Log;


@SuppressWarnings("deprecation")
@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class SiteServiceProxy extends KrollProxy
{
	private SiteService service;
	
	public SiteServiceProxy() 
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
    	
        service = seshProxy.session.getServiceRegistry().getSiteService();
	}


	/** Retrieve all sites
	 @since v1.0
	 */
	@Kroll.method
	void retrieveAllSites (Object[] noargs)
	{
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<Site> sites;
    			
    			try
    			{
    				sites = service.getAllSites();
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "SiteService.getAllSites()", SiteServiceProxy.this);
                    return;
    			}
    			
    	        Log.i("Alfresco", "Sites: " + sites.size());
    	        
    	        for (Site site : sites)
    	        {
    	        	createEventWithSite (site, "allsitesnode");
    	        }
    	        SDKUtil.createEnumerationEndEvent (SiteServiceProxy.this, "retrieveAllSites", null);
    	    
    	        super.run();
    		}
    	}.start();
	}


	/** Retrieve users sites
	 @since v1.0
	 */
	@Kroll.method
	void retrieveSites (Object[] noargs)
	{
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<Site> sites;
    			
    			try
    			{
    				sites = service.getSites();
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "SiteService.getSites()", SiteServiceProxy.this);
                    return;
    			}
    			
    	        Log.i("Alfresco", "Sites: " + sites.size());
    	        
    	        for (Site site : sites)
    	        {
    	        	createEventWithSite (site, "mysitesnode");
    	        }
    	        SDKUtil.createEnumerationEndEvent (SiteServiceProxy.this, "retrieveSites", null);
    	    
    	        super.run();
    		}
    	}.start();
	}


	/** Retrieve favorite sites.
	 @since v1.0
	 */
	@Kroll.method
	void retrieveFavoriteSites (Object[] noargs)
	{
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<Site> sites;
    			
    			try
    			{
    				sites = service.getFavoriteSites();
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "SiteService.getFavoriteSites()", SiteServiceProxy.this);
                    return;
    			}
    			
    	        Log.i("Alfresco", "Sites: " + sites.size());
    	        
    	        for (Site site : sites)
    	        {
    	        	createEventWithSite (site, "favsitesnode");
    	        }
    	        SDKUtil.createEnumerationEndEvent (SiteServiceProxy.this, "retrieveFavoriteSites", null);
    	    
    	        super.run();
    		}
    	}.start();
	}


	/** Retrieve a site object from site name.
	 @param string siteName
	 @since v1.0
	 */
	@Kroll.method
	void retrieveSiteWithShortName (Object[] arg)
	{
		final String siteName = (String)arg[0];
	
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			Site site;
    			
    			try
    			{
    				site = service.getSite(siteName);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "SiteService.getSite()", SiteServiceProxy.this);
    				return;
    			}
    			
    			createEventWithSite (site, "sitenode");
    			
    			super.run();
    		}
    	}.start();
	}


	/** Retrieve document library folder object for site.
	 @param Site siteObject
	 @since v1.0
	 */
	@Kroll.method
	void retrieveDocumentLibraryFolderForSite (Object[] arg)
	{
		final String siteName = (String)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			Folder folder;
    			Site site;
    			
    			try
    			{
    				site = service.getSite(siteName);
    				Log.i("Alfresco", "Site name from object: " + site.getShortName());
    			}
    			catch(Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "SiteService.getSite()", SiteServiceProxy.this);
                    return;
    			}
    			
    			try
    			{
    				folder = service.getDocumentLibrary (site);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "SiteService.getDocumentLibrary()", SiteServiceProxy.this);
                    return;
    			}
    			
    			SDKUtil.createEventWithNode (folder, SiteServiceProxy.this, "retrievedDocumentFolder");
    			
    			super.run();
    		}
    	}.start();
	}
	

	/** Clear sites cache
	 @since v1.0
	 */
	@Kroll.method
	void clearSitesCache (Object[] noargs)
	{
		service.clear();
	}

	
	/**
	 Marks a site as favorite and adds it to the favorite list
	 @param The site object to be added to favorites
	 @since v1.1
	 */
	@Kroll.method
	void addFavoriteSite (Object[] arg)
	{
		final SiteProxy siteProxy = (SiteProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			Site site;
    			
    			try
    			{
    				site = service.addFavoriteSite (siteProxy.site);
    				
    			}
    			catch(Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "SiteService.addFavoriteSite()", SiteServiceProxy.this);
                    return;
    			}
    			
    			createEventWithSite (site, "siteupdated");
    			
    			super.run();
    		}
    	}.start();
	}


	/**
	 Unmarks a site as favorite and removes it from the favorite list
	 @param The site to be added to favorites
	 @since v1.1
	 */
	@Kroll.method
	void removeFavoriteSite(Object arg[])
	{
		final SiteProxy siteProxy = (SiteProxy)arg[0];
		
		new Thread()
		{
			@Override
			public void run() 
			{
				Site site;
				
				try
				{
					site = service.removeFavoriteSite (siteProxy.site);
					
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "SiteService.removeFavoriteSite()", SiteServiceProxy.this);
	                return;
				}
				
				createEventWithSite (site, "siteupdated");
				
				super.run();
			}
		}.start();
	}
	
	
	/**
	 Creates a request to join a site. Please, note, this method works for both joining public and joining moderated sites.
	 For public sites, the same AlfrescoSite object will be returned.
	 For moderated sites, an updated AlfrescoSite object will be returned - with pending flag set to YES.
	 @param The site to join.
	 @since v1.1
	 */
	@Kroll.method
	void joinSite(Object arg[])
	{
		final SiteProxy siteProxy = (SiteProxy)arg[0];
		
		new Thread()
		{
			@Override
			public void run() 
			{
				Site site;
				
				try
				{
					site = service.joinSite (siteProxy.site);
					
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "SiteService.joinSite()", SiteServiceProxy.this);
	                return;
				}
				
				createEventWithSite (site, "siteupdated");
				
				super.run();
			}
		}.start();
	}
	
	
	/**
	 Retrieves a list of sites for which a join request is pending
	 @since v1.1
	 */
	@Kroll.method
	void retrievePendingSites(Object noargs[])
	{
		new Thread()
		{
			@Override
			public void run() 
			{
				List<Site> sites;
				
				try
				{
					sites = service.getPendingSites();
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "SiteService.getPendingSites()", SiteServiceProxy.this);
	                return;
				}
				
				for (Site site : sites)
				{
					createEventWithSite (site, "retrievedpendingsite");
				}
				
				SDKUtil.createEnumerationEndEvent (SiteServiceProxy.this, "retrievePendingSites", null);
				
				super.run();
			}
		}.start();
	}
	
	
	/**
	 Retrieves a list of pending join request sites with a specified listing context
	 @param listing context
	 @since v1.1
	 */
	@Kroll.method
	void retrievePendingSitesWithListingContext(Object arg[])
	{
		final ListingContextProxy lc = (ListingContextProxy)arg[0];
		
		new Thread()
		{
			@Override
			public void run() 
			{
				PagingResult<Site> sites;
				
				try
				{
					sites = service.getPendingSites (lc.listingContext);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "SiteService.getPendingSites(ListingContext)", SiteServiceProxy.this);
	                return;
				}
				
				for (Site site : sites.getList())
				{
					createEventWithSite (site, "retrievedpendingsite");
				}
				
				SDKUtil.createEnumerationEndEvent (SiteServiceProxy.this, "retrievePendingSitesWithListingContext", null);
				SDKUtil.createEventWithPagingResult (sites, SiteServiceProxy.this);
				
				super.run();
			}
		}.start();
	}
	
	
	/**
	 Cancels a join request for a specified site
	 @param The pending site for which the join request is to be cancelled
	 @since v1.1
	 */
	@Kroll.method
	void cancelPendingJoinRequestForSite(Object arg[])
	{
		final SiteProxy siteProxy = (SiteProxy)arg[0];
		
		new Thread()
		{
			@Override
			public void run() 
			{
				Site site;
				
				try
				{
					site = service.cancelRequestToJoinSite (siteProxy.site);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "SiteService.cancelRequestToJoinSite()", SiteServiceProxy.this);
	                return;
				}
				
				createEventWithSite (site, "siteupdated");
				
				super.run();
			}
		}.start();
	}
	
	
	/**
	 Leave a site
	 @param site
	 @since v1.1
	 */
	@Kroll.method
	void leaveSite(Object arg[])
	{
		final SiteProxy siteProxy = (SiteProxy)arg[0];
		
		new Thread()
		{
			@Override
			public void run() 
			{
				Site site;
				
				try
				{
					site = service.leaveSite (siteProxy.site);
					
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "SiteService.leaveSite()", SiteServiceProxy.this);
	                return;
				}
				
				createEventWithSite (site, "siteupdated");
				
				super.run();
			}
		}.start();
	}

	
	/** Returns a list of all members for a site.
	 @param site - site from which members are retrieved
	 @since v1.2
	 */
	@Kroll.method
	void retrieveAllMembers(Object[] arg)
	{
		final SiteProxy proxy = (SiteProxy) arg[0];
		
		new Thread()
		{
			@Override
			public void run() 
			{
				List<Person> members;
				
				try
				{
					members = service.getAllMembers (proxy.site);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "SiteService.getAllSites()", SiteServiceProxy.this);
	                return;
				}
				
				for (Person person : members)
				{
					PersonProxy personProxy = new PersonProxy (person);
					HashMap<String, Object> map = new HashMap<String, Object>();
			        map.put("person", personProxy);
			        fireEvent("personnode", new KrollDict(map));
				}
				
				SDKUtil.createEnumerationEndEvent (SiteServiceProxy.this, "retrieveAllMembers", null);
				
				super.run();
			}
		}.start();
	}

	
	/** Returns a paged list of all members for a site.
	 @param site - site from which members are retrieved
	 @param listingContext - The listing context with a paging definition that's used to retrieve members.
	 @since v1.2
	 */
	@Kroll.method
	void retrieveAllMembersWithListingContext(Object[] args)
	{
		final SiteProxy proxy = (SiteProxy) args[0];
		final ListingContextProxy lc = (ListingContextProxy)args[1];
		
		new Thread()
		{
			@Override
			public void run() 
			{
				PagingResult<Person> members;
				
				try
				{
					members = service.getAllMembers (proxy.site, lc.listingContext);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "SiteService.getAllMembers(ListingContext)", SiteServiceProxy.this);
	                return;
				}
				
				for (Person person : members.getList())
				{
					PersonProxy personProxy = new PersonProxy (person);
					HashMap<String, Object> map = new HashMap<String, Object>();
			        map.put("person", personProxy);
			        fireEvent("personnode", new KrollDict(map));
				}
				
				SDKUtil.createEnumerationEndEvent (SiteServiceProxy.this, "retrieveAllMembersWithListingContext", proxy);
				SDKUtil.createEventWithPagingResult (members, SiteServiceProxy.this);
				
				super.run();
			}
		}.start();
	}

	
	/** Returns a paged list of all members for a site that respect the filter.
	 @param site - site from which members are retrieved
	 @param filter - filter that needs to be applied to search query.
	 @param listingContext - The listing context with a paging definition that's used to retrieve members.
	 @since v1.2
	 */
     @Kroll.method
	void searchMembers(Object[] args)
    {
    	final SiteProxy proxy = (SiteProxy) args[0];
    	final String filter = (String)args[1];
 		final ListingContextProxy lc = (ListingContextProxy)args[2];
 		
 		new Thread()
 		{
 			@Override
 			public void run() 
 			{
 				PagingResult<Person> members;
 				
 				try
 				{
 					members = service.searchMembers (proxy.site, filter, lc.listingContext);
 				}
 				catch(Exception e)
 				{
 					SDKUtil.createErrorEvent (e, "SiteService.searchMembers()", SiteServiceProxy.this);
 	                return;
 				}
 				
 				for (Person person : members.getList())
 				{
 					PersonProxy personProxy = new PersonProxy (person);
 					HashMap<String, Object> map = new HashMap<String, Object>();
 			        map.put("person", personProxy);
 			        fireEvent("personnode", new KrollDict(map));
 				}
 				
 				SDKUtil.createEnumerationEndEvent (SiteServiceProxy.this, "searchMembers", proxy);
 				SDKUtil.createEventWithPagingResult (members, SiteServiceProxy.this);
 				
 				super.run();
 			}
 		}.start();
    }
     

	/** Returns true if the person is member of the site, returns false otherwise
	 @param person - person for whom membership status is retrieved
	 @param site - site from which membership status for the person is retrieved
	 @since v1.2
	 */
	@Kroll.method
	void isPersonMember(Object[] args)
	{
		final PersonProxy personProxy = (PersonProxy) args[0];
		final SiteProxy siteProxy = (SiteProxy) args[1];
 		
 		new Thread()
 		{
 			@Override
 			public void run() 
 			{
 				boolean isMember = false;
 				
 				try
 				{
 					isMember = service.isMember (siteProxy.site, personProxy.person);
 				}
 				catch(Exception e)
 				{
 					SDKUtil.createErrorEvent (e, "SiteService.isMember()", SiteServiceProxy.this);
 	                return;
 				}
 				 				
				HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("isMember", isMember ? 1 : 0);
		        fireEvent("retrievedmembership", new KrollDict(map));
 				
 				super.run();
 			}
 		}.start();
	}



	//Internal
	void createEventWithSite (Site site, String context)
	{
	    SiteProxy siteProxy = new SiteProxy (site);
	    
	    HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("site", siteProxy);
        fireEvent(context, new KrollDict(map));
	}
}
