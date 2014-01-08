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

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.HashMap;
import java.util.Map;

import org.alfresco.mobile.android.api.model.ContentFile;
import org.alfresco.mobile.android.api.model.Folder;
import org.alfresco.mobile.android.api.model.impl.ContentFileImpl;
import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.TiFileProxy;
import org.appcelerator.titanium.io.TiBaseFile;
import org.appcelerator.titanium.io.TiFileFactory;


@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class ContentFileProxy extends KrollProxy 
{
	public ContentFile contentFile = null;
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
	public void initialiseWithFile (final Object args[])
	{
		new Thread()
    	{
			@Override
    		public void run() 
    		{
				try
				{
					File file = new File((String)args[0]);
					contentFile = new ContentFileImpl (file);
					humanReadableName = (String)args[0];
				}
				catch (Exception e)
				{
					e.printStackTrace();
    				
    				SDKUtil.createErrorEvent (e, "ContentFileProxy.initialiseWithFile()", ContentFileProxy.this);
                    return;
				}
				
				HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put ("code", 1);
		        fireEvent ("initialisedfile", new KrollDict(map));
    		}
    	}.start();
	}
	
	
	@Kroll.method
	public void initialiseWithPlainText (final Object args[])
	{
		new Thread()
    	{
			@Override
    		public void run() 
    		{
				try
				{
					File file = File.createTempFile ("alfresco", "tmp");
					
					BufferedWriter writer = new BufferedWriter (new FileWriter(file));
				    writer.write ((String)args[0]);
				    writer.close();
				    
					contentFile = new ContentFileImpl (file, file.getPath(), "text/plain");
					humanReadableName = "temp";
				}
				catch (Exception e)
				{
					e.printStackTrace();
    				
    				SDKUtil.createErrorEvent (e, "ContentFileProxy.initialiseWithPlainText()", ContentFileProxy.this);
                    return;
				}
				
				HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put ("code", 1);
		        fireEvent ("initialisedfile", new KrollDict(map));
    		}
    	}.start();
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
		//Appceleratorise the path...
		return new String("file://localhost" + contentFile.getFile().getPath()).replace (" ", "%20");
	}
	
	
	@Kroll.method
	public TiFileProxy getFile()
	{
		TiBaseFile tiFile = TiFileFactory.createTitaniumFile(new String[] { getPath() }, false);		
		return new TiFileProxy(tiFile);
	}
}
