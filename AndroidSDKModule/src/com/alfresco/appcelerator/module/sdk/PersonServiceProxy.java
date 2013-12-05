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

import org.alfresco.mobile.android.api.model.ContentFile;
import org.alfresco.mobile.android.api.model.Person;
import org.alfresco.mobile.android.api.services.PersonService;
import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;


@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class PersonServiceProxy extends KrollProxy
{
	PersonService service;
	
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
    	        
    	        SDKUtil.createEnumerationEndEvent (PersonServiceProxy.this);
    	    
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
				
				ContentFileProxy cfProxy = new ContentFileProxy(avatar);
				HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("contentfile", cfProxy);
		        fireEvent("retrievedavatar", new KrollDict(map));
    	        
    	        SDKUtil.createEnumerationEndEvent (PersonServiceProxy.this);
    	    
    	        super.run();
    		}
    	}.start();
	}
}
