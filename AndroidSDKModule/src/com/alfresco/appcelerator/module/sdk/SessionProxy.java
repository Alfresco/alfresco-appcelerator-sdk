package com.alfresco.appcelerator.module.sdk;

import org.alfresco.mobile.android.api.model.RepositoryInfo;
import org.alfresco.mobile.android.api.session.RepositorySession;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class SessionProxy extends KrollProxy
{
	SessionProxy()
	{
		super();
	}
	
	public RepositoryInfo info;
	public RepositorySession session;
	public int error;
}
