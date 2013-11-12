package com.alfresco.appcelerator.module.sdk;

import org.alfresco.mobile.android.api.model.Person;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class, 
propertyAccessors = {"identifier", "firstName", "lastName", "fullName", "avatarIdentifier"})
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

        String nodeGetters[] = {"identifier", "firstName", "lastName", "fullName", "avatarIdentifier"};    	
		for (int i = 0;  i < nodeGetters.length;  i++)
		{
			Object value = SDKUtil.extractProperty(person, nodeGetters[i]);
			if (value != null)
				setProperty(nodeGetters[i], value);
		}
	}
}
