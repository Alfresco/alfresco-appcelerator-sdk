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
    	        SDKUtil.createEnumerationEndEvent (SiteServiceProxy.this);
    	    
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
    	        SDKUtil.createEnumerationEndEvent (SiteServiceProxy.this);
    	    
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
    	        SDKUtil.createEnumerationEndEvent (SiteServiceProxy.this);
    	    
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


	//Internal
	void createEventWithSite (Site site, String context)
	{
	    SiteProxy siteProxy = new SiteProxy (site);
	    
	    HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("site", siteProxy);
        fireEvent(context, new KrollDict(map));
	}
}
