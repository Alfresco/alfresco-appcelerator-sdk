package com.alfresco.appcelerator.module.sdk;

import org.alfresco.mobile.android.api.model.ContentFile;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.TiFileProxy;
import org.appcelerator.titanium.io.TiBaseFile;
import org.appcelerator.titanium.io.TiFileFactory;


@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class ContentFileProxy extends KrollProxy 
{
	private ContentFile contentFile = null;
	private String humanReadableName = null;
	
	public ContentFileProxy()
	{	
		super();
	}
	
	public ContentFileProxy(ContentFile file)
	{
		contentFile = file;
		humanReadableName = file.getFileName();
	}

	public ContentFileProxy(ContentFile file, String humanReadableName)
	{
		contentFile = file;
		this.humanReadableName = humanReadableName;
	}
	
	
	@Kroll.method
	public String getName()
	{
		return humanReadableName;
	}
	
	@Kroll.method
	public String getMIMEType()
	{
		return contentFile.getMimeType();
	}
	
	@Kroll.method
	public String getPath()
	{
		return contentFile.getFile().getPath();
	}
	
	@Kroll.method
	public TiFileProxy getFile()
	{
		TiBaseFile tiFile = TiFileFactory.createTitaniumFile(new String[] { "file:/" + contentFile.getFile().getPath() }, false);		
		return new TiFileProxy(tiFile);
	}
}
