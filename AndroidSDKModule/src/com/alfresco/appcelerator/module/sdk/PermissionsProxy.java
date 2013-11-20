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
