/*
 ******************************************************************************
 * Copyright (C) 2005-2014 Alfresco Software Limited.
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

import org.alfresco.mobile.android.api.model.Person;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class, 
propertyAccessors = {"identifier", "firstName", "lastName", "fullName", "avatarIdentifier",
					//@since v1.2
					"jobTitle", "location", "description", "telephoneNumber", "mobileNumber", "email", "skypeId", "instantMessageId", "googleId", "status", "statusTime"})
public class PersonProxy extends KrollProxy
{
	public Person person;
	
	public PersonProxy()
	{
		super();
	}
	
	PersonProxy (Person person)
	{
        this.person = person;

        String nodeGetters[] = {"identifier", "firstName", "lastName", "fullName", "avatarIdentifier", "jobTitle", "location", "description", "telephoneNumber", "mobileNumber", "email", "skypeId", "instantMessageId", "googleId", "status", "statusTime"};    	
		for (int i = 0;  i < nodeGetters.length;  i++)
		{
			Object value = SDKUtil.extractProperty(person, nodeGetters[i]);
			if (value != null)
				setProperty(nodeGetters[i], value);
		}
	}
}
