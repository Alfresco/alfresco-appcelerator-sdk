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

import java.lang.reflect.InvocationTargetException;
import java.util.GregorianCalendar;

import org.alfresco.mobile.android.api.model.Folder;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class FolderProxy extends KrollProxy
{
	private Folder folder = null;
 	
	public FolderProxy ()
	{
		super();
	}
	
	public FolderProxy (Folder folder)
	{
		this.folder = folder;
		
		String nodeGetters[] = {"name", "title", "summary", "type", "createdBy", "createdAt", "modifiedBy", "modifiedAt"};    	
		for (int i = 0;  i < nodeGetters.length;  i++)
		{
			Object value = extractProperty(folder, nodeGetters[i]);
			if (value != null)
				setProperty(nodeGetters[i], value);
		}
	}
	
	public Folder getFolder()
	{
		return folder;
	}
	
	@Kroll.method
	public String getName()
	{
		return folder.getName();
	}
	
	
	Object extractProperty (Object obj, String getter)
    {
    	StringBuilder getterMethod = new StringBuilder(getter);	
    	if (!getter.startsWith("is"))
    	{
    		getterMethod.setCharAt(0, Character.toTitleCase(getterMethod.charAt(0)));
    		getterMethod = new StringBuilder("get" + getterMethod);
    	}
    	
		java.lang.reflect.Method method;
		try 
		{
			method = obj.getClass().getMethod(getterMethod.toString());
			
			try 
			{
				Object retObj = method.invoke(obj);
				if (retObj != null)
				{
					if (retObj instanceof GregorianCalendar)
						retObj = ((GregorianCalendar)retObj).getTime();
				}
				return retObj;
			}
			catch (IllegalArgumentException e) 
			{
			}
			catch (IllegalAccessException e) 
			{
			}
			catch (InvocationTargetException e) 
			{
			}
		}
		catch (SecurityException e) 
		{
		} 
		catch (NoSuchMethodException e) 
		{
		}
		
		return null;
    }
}
