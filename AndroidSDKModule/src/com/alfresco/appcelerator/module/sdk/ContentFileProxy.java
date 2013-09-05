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
