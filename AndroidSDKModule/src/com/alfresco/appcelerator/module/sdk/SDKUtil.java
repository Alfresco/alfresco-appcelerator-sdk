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
import org.appcelerator.titanium.util.Log;
import org.appcelerator.titanium.util.TiConvert;

public class SDKUtil
{
	static final int ERROR_CODE_SDK_METHOD_EXCEPTION = 1;
	static final int ERROR_CODE_PARAM_ERROR = 2;
	static final int ERROR_CODE_FILE_NOT_FOUND = 3;
	
	
	static void createEnumerationEndEvent (KrollProxy proxyObj)
	{
		HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("code", TiConvert.toInt(1));
        proxyObj.fireEvent("endenumeration", new KrollDict(map));
	}


	static void createParamErrorEvent (KrollProxy proxyObj)
	{
		createErrorEventWithCode (ERROR_CODE_PARAM_ERROR, "Parameter error", proxyObj);
	}

	
	static void createErrorEvent (Exception e, String methodName, KrollProxy proxyObj)
	{
		createErrorEventWithCode (ERROR_CODE_SDK_METHOD_EXCEPTION, "Error calling " + methodName + " in Alfresco SDK: " + e.getMessage(), proxyObj);	
	}
	
	
	static void createErrorEventWithCode (int errorCode, Exception e, String methodName, KrollProxy proxyObj)
	{
		createErrorEventWithCode (errorCode, "Error calling " + methodName + " in Alfresco SDK: " + e.getMessage(), proxyObj);	
	}
	
	
	static void createErrorEventWithCode (int errorCode, String errorString, KrollProxy proxyObj)
	{
		HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("errorcode", TiConvert.toInt(errorCode));
        map.put("errorstring", errorString);
        proxyObj.fireEvent("error", new KrollDict(map));
	}

	
	static void createEventWithNode (Node node, KrollProxy proxyObj)
	{
		createEventWithNode (node, proxyObj, null);
	}
	
	
	static void createEventWithNode (Node node, KrollProxy proxyObj, String eventName)
	{
	    if (node.isFolder())
	    {
	        FolderProxy thisFolder = new FolderProxy ((Folder)node);
	        
	        HashMap<String, Object> map = new HashMap<String, Object>();
	        map.put("folder", thisFolder);
	        proxyObj.fireEvent(eventName != null ? eventName : "foldernode", new KrollDict(map));
	    }
	    else
	    {
	    	DocumentProxy thisDocument = new DocumentProxy ((Document)node);
	        
	        HashMap<String, Object> map = new HashMap<String, Object>();
	        map.put("document", thisDocument);
	        proxyObj.fireEvent(eventName != null ? eventName : "documentnode", new KrollDict(map));
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
    	
    	//Log.i("Alfresco", "Property: " + getterMethod);
    	
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
					{
						Log.i("Alfresco", "Conversion of date property");
						retObj = ((GregorianCalendar)retObj).getTime();
					}
					else
					if (retObj.getClass().isEnum())
					{
						Log.i("Alfresco", "Conversion of enum property");
						retObj = ((Enum)retObj).ordinal();
					}
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