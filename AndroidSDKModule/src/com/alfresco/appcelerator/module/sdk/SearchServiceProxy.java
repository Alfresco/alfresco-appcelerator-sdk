package com.alfresco.appcelerator.module.sdk;

import java.util.List;

import org.alfresco.mobile.android.api.model.Node;
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
 
	SearchServiceProxy()
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
