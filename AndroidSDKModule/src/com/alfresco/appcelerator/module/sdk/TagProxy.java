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
