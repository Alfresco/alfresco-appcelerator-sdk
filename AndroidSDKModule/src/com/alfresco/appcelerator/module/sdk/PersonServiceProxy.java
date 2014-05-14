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

import org.alfresco.mobile.android.api.model.ContentFile;
import org.alfresco.mobile.android.api.model.PagingResult;
import org.alfresco.mobile.android.api.model.Person;
import org.alfresco.mobile.android.api.services.PersonService;
import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;


@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class PersonServiceProxy extends KrollProxy
{
	PersonService service;
	private boolean supportsAvatars = false;
	
	public PersonServiceProxy()
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
		supportsAvatars = seshProxy.session.getRepositoryInfo().getCapabilities().doesSupportLikingNodes();
        service = seshProxy.session.getServiceRegistry().getPersonService();
	}


	/**
	 Retrieve person with identifier
	 @param string identifier
	 */
	@Kroll.method
	void retrievePersonWithIdentifier (Object[] arg)
	{
		final String id = (String)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			Person person;
    			
				try
				{
					person = service.getPerson (id);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "PersonService.getPerson(id)", PersonServiceProxy.this);
                    return;
				}
				
				PersonProxy personProxy = new PersonProxy (person);
				HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("person", personProxy);
		        fireEvent("personnode", new KrollDict(map));
    	        
    	        SDKUtil.createEnumerationEndEvent (PersonServiceProxy.this, "retrievePersonWithIdentifier", id);
    	    
    	        super.run();
    		}
    	}.start();
	}


	/**
	 Retrieve avatar for person
	 @param Person person
	 */
	@Kroll.method
	void retrieveAvatarForPerson (Object[] arg)
	{
		final PersonProxy personProxy = (PersonProxy)arg[0];
		
		if (supportsAvatars)
		{
			new Thread()
	    	{
	    		@Override
	    		public void run() 
	    		{
	    			ContentFile avatar;
	    			
					try
					{
						avatar = service.getAvatar (personProxy.person);
					}
					catch(Exception e)
					{
						SDKUtil.createErrorEvent (e, "PersonService.getAvatar()", PersonServiceProxy.this);
						
	                    return;
					}
					
					if (avatar != null)
					{
						ContentFileProxy cfProxy = new ContentFileProxy(avatar);
						HashMap<String, Object> map = new HashMap<String, Object>();
				        map.put("contentfile", cfProxy);
				        map.put("personid", personProxy.person.getIdentifier());
				        fireEvent("retrievedavatar", new KrollDict(map));
		    	        
		    	        SDKUtil.createEnumerationEndEvent (PersonServiceProxy.this, "retrieveAvatarForPerson", personProxy);
					}
					
	    	        super.run();
	    		}
	    	}.start();
		}
	}
	
	
	/** Returns a list of site members that respect the filter. 
	 @param filter - filter that needs to be applied to search query.
	 @since v1.2
	 */
	@Kroll.method
	void search (Object[] arg)
	{
		final String filter = (String)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<Person> searchResult;
    			
				try
				{
					searchResult = service.search(filter);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "PersonService.search()", PersonServiceProxy.this);
                    return;
				}
				
				if (searchResult != null)
				{
					for (Person person : searchResult)
					{
						PersonProxy personProxy = new PersonProxy (person);
						HashMap<String, Object> map = new HashMap<String, Object>();
				        map.put("person", personProxy);
				        fireEvent("personnode", new KrollDict(map));
					}
					SDKUtil.createEnumerationEndEvent (PersonServiceProxy.this, "search", filter);
				}
				
    	        super.run();
    		}
    	}.start();
	}

	
	/** Returns a paged list of site members that respect the filter.
	 
	 @param filter - filter that needs to be applied to search query.
	 @param listingContext - The listing context with a paging definition that's used to search for people.
	 @since v1.2
	 */
	@Kroll.method
	void searchWithListingContext (Object[] args)
	{
		final String filter = (String)args[0];
		final ListingContextProxy proxy = (ListingContextProxy)args[1];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			PagingResult<Person> searchResult;
    			
				try
				{
					searchResult = service.search(filter, proxy.listingContext);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "PersonService.searchWithListingContext()", PersonServiceProxy.this);
                    return;
				}
				
				if (searchResult != null)
				{
					for (Person person : searchResult.getList())
					{
						PersonProxy personProxy = new PersonProxy (person);
						HashMap<String, Object> map = new HashMap<String, Object>();
				        map.put("person", personProxy);
				        fireEvent("personnode", new KrollDict(map));
					}
					SDKUtil.createEnumerationEndEvent (PersonServiceProxy.this, "searchWithListingContext", filter);
				}
				
    	        super.run();
    		}
    	}.start();
	}

	
	/** Retrieve the latest (and complete) properties for person.
	 
	 @param The person which is to be refreshed with its latest properties
	 @since v1.2
	 */
	@Kroll.method
	void refreshPerson (Object[] arg)
	{
		final PersonProxy personProxy = (PersonProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			Person person;
    			
				try
				{
					person = service.refresh(personProxy.person);
				}
				catch(Exception e)
				{
					SDKUtil.createErrorEvent (e, "PersonService.refreshPerson()", PersonServiceProxy.this);
                    return;
				}
				
				if (person != null)
				{
					PersonProxy personProxy = new PersonProxy (person);
					HashMap<String, Object> map = new HashMap<String, Object>();
			        map.put("person", personProxy);
			        fireEvent("refreshedperson", new KrollDict(map));
				}
				
    	        super.run();
    		}
    	}.start();
	}
}
