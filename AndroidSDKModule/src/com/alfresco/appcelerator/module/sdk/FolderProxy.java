package com.alfresco.appcelerator.module.sdk;

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
	}
	
	public Folder getFolder()
	{
		return folder;
	}
	
	@Kroll.method
	public String getFolderName()
	{
		return folder.getName();
	}
}
