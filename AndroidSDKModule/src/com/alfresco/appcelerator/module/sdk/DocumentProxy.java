package com.alfresco.appcelerator.module.sdk;

import org.alfresco.mobile.android.api.model.Document;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class DocumentProxy extends KrollProxy 
{
	private Document document;
	
	DocumentProxy()
	{
		super();
	}
	
	
	DocumentProxy(Document document)
	{
		this.document = document;
	}
}
