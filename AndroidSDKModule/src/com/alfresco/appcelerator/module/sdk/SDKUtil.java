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
import java.util.HashMap;

import org.alfresco.mobile.android.api.model.Document;
import org.alfresco.mobile.android.api.model.Folder;
import org.alfresco.mobile.android.api.model.Node;
import org.alfresco.mobile.android.api.model.PagingResult;
import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;

public class SDKUtil
{
	static void createEnumerationEndEvent (KrollProxy proxyObj)
	{
		HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("code", 1);
        proxyObj.fireEvent("endenumeration", new KrollDict(map));
	}


	static void createParamErrorEvent (KrollProxy proxyObj)
	{
		createErrorEvent (0, "Parameter error", proxyObj);
	}


	static void createErrorEvent (int errorCode, String errorString, KrollProxy proxyObj)
	{
		HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("errorcode", errorCode);
        map.put("errorstring", errorString);
        proxyObj.fireEvent("error", new KrollDict(map));
	}

	
	static void createEventWithNode (Node node, KrollProxy proxyObj)
	{
	    if (node.isFolder())
	    {
	        FolderProxy thisFolder = new FolderProxy ((Folder)node);
	        
	        HashMap<String, Object> map = new HashMap<String, Object>();
	        map.put("folder", thisFolder);
	        proxyObj.fireEvent("foldernode", new KrollDict(map));
	    }
	    else
	    {
	    	DocumentProxy thisDocument = new DocumentProxy ((Document)node);
	        
	        HashMap<String, Object> map = new HashMap<String, Object>();
	        map.put("document", thisDocument);
	        proxyObj.fireEvent("documentnode", new KrollDict(map));
	    }
	}


	static void createEventWithPagingResult (PagingResult pagingResult, KrollProxy proxyObj)
	{
		HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("hasmoreitems", pagingResult.hasMoreItems());
        map.put("totalitems", pagingResult.getTotalItems());
        proxyObj.fireEvent("pagingresult", new KrollDict(map));
	}

	
    static Object extractProperty (Object obj, String getter)
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
};