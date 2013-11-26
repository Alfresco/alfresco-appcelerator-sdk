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

import org.alfresco.mobile.android.api.model.ListingContext;
import org.alfresco.mobile.android.api.model.Node;
import org.alfresco.mobile.android.api.model.PagingResult;
import org.alfresco.mobile.android.api.model.SearchLanguage;
import org.alfresco.mobile.android.api.services.SearchService;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.util.Log;

@SuppressWarnings("deprecation")
@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class SearchServiceProxy extends KrollProxy
{
	SearchService service;
 
	public SearchServiceProxy()
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
    	
        service = seshProxy.session.getServiceRegistry().getSearchService();
	}
	
	
	/** Search with statement
	 @param string statementString
	 @since v1.0
	 */
	@Kroll.method
	void searchWithStatement (Object[] arg)
	{
		final String searchTerm = (String)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<Node> entries;
    			
				try
				{
					entries = service.search (searchTerm, SearchLanguage.CMIS);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "SearchService.search()", SearchServiceProxy.this);
                    return;
				}
				
				Log.i("Alfresco", "Nodes: " + entries.size());
    	        
    	        for (Node entry : entries)
    	        {
    	        	SDKUtil.createEventWithNode(entry, SearchServiceProxy.this);
    	        }
    	        SDKUtil.createEnumerationEndEvent (SearchServiceProxy.this);
    	    
    	        super.run();
    		}
    	}.start();
	}
	
	
	/** Search with statement and listing context
	 @param string statementString
	 @param ListingContext listingContextObject
	 @since v1.0
	 */
	@Kroll.method
	void searchWithStatementAndListingContext (Object[] args)
	{
		final String searchTerm = (String)args[0];
		final ListingContextProxy lcProxy = (ListingContextProxy)args[1];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			PagingResult<Node> entries;
    			
				try
				{
					entries = service.search (searchTerm, SearchLanguage.CMIS, lcProxy.listingContext);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "SearchService.search()", SearchServiceProxy.this);
                    return;
				}
				
				Log.i("Alfresco", "Nodes: " + entries.getList().size());
    	        
    	        for (Node entry : entries.getList())
    	        {
    	        	SDKUtil.createEventWithNode(entry, SearchServiceProxy.this);
    	        }
    	        
    	        SDKUtil.createEventWithPagingResult (entries, SearchServiceProxy.this);
    	        
    	        SDKUtil.createEnumerationEndEvent (SearchServiceProxy.this);
    	    
    	        super.run();
    		}
    	}.start();
	}
	
	
	/** Search with keywords
	 @param String keywords
	 @param KeywordSearchOptions searchOptionsObject
	 @since v1.0
	 */
	@Kroll.method
	void searchWithKeywords (Object[] args)
	{
		final String searchTerm = (String)args[0];
		final KeywordSearchOptionsProxy searchOptions = (KeywordSearchOptionsProxy)args[1];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<Node> entries;
    			
				try
				{
					entries = service.keywordSearch (searchTerm, searchOptions.searchOptions);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "SearchService.keywordSearch()", SearchServiceProxy.this);
                    return;
				}
				
				Log.i("Alfresco", "Nodes: " + entries.size());
    	        
    	        for (Node entry : entries)
    	        {
    	        	SDKUtil.createEventWithNode(entry, SearchServiceProxy.this);
    	        }
    	        SDKUtil.createEnumerationEndEvent (SearchServiceProxy.this);
    	    
    	        super.run();
    		}
    	}.start();
	}
	
	
	/** Search with keywords and listing context
	 @param String keywords
	 @param KeywordSearchOptions searchOptionsObject
	 @param ListingContext listingContextObject
	 @since v1.0
	 */
	@Kroll.method
	void searchWithKeywordsAndListingContext (Object[] args)
	{
		final String searchTerm = (String)args[0];
		final KeywordSearchOptionsProxy searchOptions = (KeywordSearchOptionsProxy)args[1];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<Node> entries;
    			
				try
				{
					entries = service.keywordSearch (searchTerm, searchOptions.searchOptions);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "SearchService.keywordSearch()", SearchServiceProxy.this);
                    return;
				}
				
				Log.i("Alfresco", "Nodes: " + entries.size());
    	        
    	        for (Node entry : entries)
    	        {
    	        	SDKUtil.createEventWithNode(entry, SearchServiceProxy.this);
    	        }
    	        SDKUtil.createEnumerationEndEvent (SearchServiceProxy.this);
    	    
    	        super.run();
    		}
    	}.start();
	}
}
