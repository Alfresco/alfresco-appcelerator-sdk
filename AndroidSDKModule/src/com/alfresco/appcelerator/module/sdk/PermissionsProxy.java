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

import org.alfresco.mobile.android.api.model.Permissions;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.util.Log;

@SuppressWarnings("deprecation")
@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class, 
propertyAccessors = {"canEdit", "canDelete", "canAddChildren", "canComment"}) //, "canGetContent", "canSetContent", "canGetProperties", "canGetAllVersions", "canGetChildren"})
public class PermissionsProxy extends KrollProxy
{
	Permissions permissions;
	
	public PermissionsProxy(Permissions permissions)
	{
        this.permissions = permissions;
    
        String permissionGetters[] = {"canEdit", "canDelete", "canAddChildren", "canComment"}; //, "canGetContent", "canSetContent", "canGetProperties", "canGetAllVersions", "canGetChildren"};
    	
		for (int i = 0;  i < permissionGetters.length;  i++)
		{
			Object value = SDKUtil.extractProperty (permissions, permissionGetters[i]);
			if (value != null)
			{
				Log.i("Alfresco", "Permission: " + permissionGetters[i] + " = " + value);
				setProperty(permissionGetters[i], value);
			}
		}
	}
}
