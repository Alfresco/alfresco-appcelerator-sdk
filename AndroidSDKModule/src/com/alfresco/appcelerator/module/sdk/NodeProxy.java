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

import org.alfresco.mobile.android.api.model.Node;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import com.alfresco.appcelerator.module.sdk.SDKUtil;

@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class, 
 propertyAccessors = { "name", "title", "summary", "type", "createdBy", "createdAt", "modifiedBy", "modifiedAt", "isFolder", "isDocument",
					   "contentMimeType", "contentLength", "versionLabel", "versionComment", "isLatestVersion"})
public class NodeProxy extends KrollProxy
{
	public Node node = null;
 	
	public NodeProxy ()
	{
		super();
	}
	
	public NodeProxy (Node node)
	{
		this.node = node;
		
		String nodeGetters[] =   {"name", "title", "description", "type", "createdBy", "createdAt", "modifiedBy", "modifiedAt", "isFolder", "isDocument"};  
		String nodePropNames[] = {null, null, "summary", null, null, null, null, null, null, null}; //For where they differ from iOS property names.
		
		String docGetters[] =   {"contentStreamMimeType", "contentStreamLength", "versionLabel", "versionComment", "isLatestVersion"};
		String docPropNames[] = {"contentMimeType", "contentLength", null, null, null};	//For where they differ from iOS property names.
    	
		for (int i = 0;  i < nodeGetters.length;  i++)
		{
			Object value = SDKUtil.extractProperty (node, nodeGetters[i]);
			if (value != null)
				setProperty (nodePropNames[i] != null ? nodePropNames[i] : nodeGetters[i], value);
		}
		
		if (node.isDocument())
		{
			for (int i = 0;  i < docGetters.length;  i++)
			{
				Object value = SDKUtil.extractProperty (node, docGetters[i]);
				if (value != null)
					setProperty (docPropNames[i] != null ? docPropNames[i] : docGetters[i], value);
			}
		}
	}
	

	@Kroll.method
	public String getName()
	{
		return node.getName();
	}
}
