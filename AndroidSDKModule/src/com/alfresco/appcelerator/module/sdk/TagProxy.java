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

import org.alfresco.mobile.android.api.model.Tag;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class, 
propertyAccessors = { "identifier", "value" })
public class TagProxy extends KrollProxy
{
	public Tag tag;
	
	public TagProxy()
	{
		super();
	}
	
	
	public TagProxy (Tag tag)
	{
        this.tag = tag;
        
        String tagGetters[] = {"identifier", "value"};
    	
		for (int i = 0;  i < tagGetters.length;  i++)
		{
			Object value = SDKUtil.extractProperty (tag, tagGetters[i]);
			if (value != null)
				setProperty(tagGetters[i], value);
		}
	}
}
