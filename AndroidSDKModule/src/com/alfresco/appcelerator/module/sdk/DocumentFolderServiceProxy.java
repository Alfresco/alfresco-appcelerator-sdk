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

import java.lang.reflect.InvocationTargetException;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.alfresco.mobile.android.api.model.ContentFile;
import org.alfresco.mobile.android.api.model.Document;
import org.alfresco.mobile.android.api.model.Folder;
import org.alfresco.mobile.android.api.model.Node;
import org.alfresco.mobile.android.api.services.DocumentFolderService;
import org.alfresco.mobile.android.api.services.SiteService;
import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.util.Log;
import org.appcelerator.titanium.util.TiConvert;


@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class DocumentFolderServiceProxy extends KrollProxy
{
	SiteService siteService;
	DocumentFolderService service;
    Folder currentFolder;
    int errorCode;
    Map<String, Folder> folders;
    
    
    public DocumentFolderServiceProxy() 
    {
		super();
	}
    
    
    @Kroll.method
    void initialiseWithSession(Object[] args)
    {
    	SessionProxy seshProxy = (SessionProxy) args[0];
    	
        siteService = seshProxy.session.getServiceRegistry().getSiteService();
        service = seshProxy.session.getServiceRegistry().getDocumentFolderService();
    }
    
    
    @Kroll.method
    void retrieveRootFolder()
    {
    	new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			currentFolder = service.getRootFolder();
    			
    			HashMap<String, Object> map = new HashMap<String, Object>();
    	        map.put("folder", currentFolder.getName());
    	        fireEvent("retrievedfolder", new KrollDict(map));
    		}
    	}.start();
    }
    
    
    @Kroll.method
    void setFolder(Object[] args)
    {
    	FolderProxy folder = (FolderProxy)args[0];
    	
    	currentFolder = folder.getFolder();
    }
    
    
    @Kroll.method
    void retrieveChildrenInFolder()
    {
    	new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<Node> nodes;
    			try
    			{
	    			// Get children of document library
	    	        nodes = service.getChildren(currentFolder);
    			}
    			catch (Exception e)
    			{
    				Log.e("Alfresco", "Error retrieving child nodes: " + e.getMessage());
    				
    				HashMap<String, Object> map = new HashMap<String, Object>();
                    map.put("errorcode", TiConvert.toInt(1));
                    map.put("errorstring", "Error calling DocumentFolderService.getChildren() in Alfresco SDK: " + e.getMessage());
                    fireEvent("error", new KrollDict(map) );
                    return;
    			}
    			
    	        Log.i("Alfresco", "Nodes: " + nodes.size());
    	        
    	        for (Node node : nodes)
    	        {
    	        	HashMap<String, Object> map = new HashMap<String, Object>();
    	        	
    	        	if (node.isDocument())
    	        	{
    	        		Document doc = (Document)node;	
    	        		DocumentProxy thiDocument = new DocumentProxy (doc);
    	        		map.put("document", thiDocument);
    	                fireEvent("documentnode", new KrollDict(map));
    	        	}
    	        	else
    	        	{
    	        		Folder folder = (Folder)node;
    	        		FolderProxy thisFolder = new FolderProxy (folder);
    	                map.put("folder", thisFolder);
    	        		fireEvent("foldernode", new KrollDict(map));
    	        	}
    	        }

    			super.run();
    		}
    	}.start();
    }
    
    
    @Kroll.method
    FolderProxy getCurrentFolder()
    {
    	return new FolderProxy (currentFolder);
    }
    
 
    @Kroll.method
    void saveDocument (final Object args[])
    {
    	new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			DocumentProxy arg = (DocumentProxy) args[0];
    		     
    	        ContentFile file = service.getContent(arg.getDocument());
    	        if (!file.getFile().exists())
    	        {
    	        	HashMap<String, Object> map = new HashMap<String, Object>();
        	        map.put("errorcode", 1);
        	        map.put("errorstring", "File does not exist");
        	        fireEvent("error", new KrollDict(map) );
        	        return;
    	        }
    	        
    	        HashMap<String, Object> map = new HashMap<String, Object>();
    	        map.put("contentfile", new ContentFileProxy(file, arg.getDocument().getName()));
    	        fireEvent("retrieveddocument", new KrollDict(map) );
    		}
    	}.start();
    }
}
