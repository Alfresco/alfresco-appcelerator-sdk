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

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.alfresco.mobile.android.api.model.ContentFile;
import org.alfresco.mobile.android.api.model.Document;
import org.alfresco.mobile.android.api.model.Folder;
import org.alfresco.mobile.android.api.model.Node;
import org.alfresco.mobile.android.api.model.Permissions;
import org.alfresco.mobile.android.api.services.DocumentFolderService;
import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.util.Log;
import org.appcelerator.titanium.util.TiConvert;


@SuppressWarnings("deprecation")
@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class DocumentFolderServiceProxy extends KrollProxy
{
	private DocumentFolderService service;
	private Folder currentFolder;
    
    
    public DocumentFolderServiceProxy() 
    {
		super();
	}
    
    
    @Kroll.method
    void initialiseWithSession(Object[] args)
    {
    	SessionProxy seshProxy = (SessionProxy) args[0];
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
    				e.printStackTrace();
    				
    				SDKUtil.createErrorEvent (e, "DocumentFolderService.getChildren()", DocumentFolderServiceProxy.this);
                    return;
    			}
    			
    	        Log.i("Alfresco", "Nodes: " + nodes.size());
    	        
    	        for (Node node : nodes)
    	        {
    	        	SDKUtil.createEventWithNode (node, DocumentFolderServiceProxy.this);
    	        }
    	        SDKUtil.createEnumerationEndEvent (DocumentFolderServiceProxy.this);
    	        
    			super.run();
    		}
    	}.start();
    }
    
    
    @Kroll.method
    FolderProxy getCurrentFolder()
    {
    	return new FolderProxy (currentFolder);
    }
    
 
    /** Retrieve permissions of document or folder object
    @param Document or Folder object
    @since v1.0
    */
    @Kroll.method
    void retrievePermissionsOfNode (Object[] arg)
    {
    	final NodeProxy nodeProxy = (NodeProxy)arg[0];
    	
    	new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			Permissions permissions = service.getPermissions (nodeProxy.node);
    	        
    			PermissionsProxy p = new PermissionsProxy(permissions);
    	        HashMap<String, Object> map = new HashMap<String, Object>();
    	        map.put("permissions", p);
    	        fireEvent("retrievedpermissions", new KrollDict(map) );
    		}
    	}.start();
    }


    //Deprecated in favour of retrieveContentOfDocument method.
    @Kroll.method
    void saveDocument(final Object arg[])
    {
        retrieveContentOfDocument(arg);
    }


    @Kroll.method
    void retrieveContentOfDocument (final Object args[])
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
    	        	SDKUtil.createErrorEventWithCode (SDKUtil.ERROR_CODE_FILE_NOT_FOUND, "File does not exist", DocumentFolderServiceProxy.this);
    	        	return;
    	        }
    	        
    	        HashMap<String, Object> map = new HashMap<String, Object>();
    	        map.put("contentfile", new ContentFileProxy(file, arg.getDocument().getName()));
    	        fireEvent("retrieveddocument", new KrollDict(map) );
    		}
    	}.start();
    }
    
    
    @Kroll.method
    void createDocumentWithName (final Object args[])
    {
    	new Thread()
    	{
    		@SuppressWarnings({ "unchecked", "rawtypes" })
			@Override
    		public void run() 
    		{
    			String name = (String)args[0];
    			FolderProxy folderProxy = (FolderProxy)args[1];
			    ContentFileProxy fileProxy = (ContentFileProxy)args[2];
			    //KrollDict nodeProperties = (KrollDict)args[3];			    
			    Document doc;
			    
    			try
    			{
    				doc = service.createDocument (folderProxy.getFolder(), name, /*(Map)nodeProperties*/ new HashMap(), fileProxy.contentFile);  
    			}
    			catch (Exception e)
    			{
    				e.printStackTrace();
    				
    				SDKUtil.createErrorEvent (e, "DocumentFolderService.createDocument()", DocumentFolderServiceProxy.this);
                    return;
    			}
    			
    	        SDKUtil.createEventWithNode (doc, DocumentFolderServiceProxy.this, "newdocumentnode"); 
    		}
    	}.start();
    }
    
    
    @Kroll.method
    void createFolderWithName (final Object args[])
    {
    	new Thread()
    	{
    		@SuppressWarnings({ "unchecked", "rawtypes" })
			@Override
    		public void run() 
    		{
    			String name = (String)args[0];
    			FolderProxy folderProxy = (FolderProxy)args[1];
			    //KrollDict nodeProperties = (KrollDict)args[3];			    
			    Folder folder;
			    
    			try
    			{
    				folder = service.createFolder (folderProxy.getFolder(), name, new HashMap()); //, (Map)nodeProperties);  
    			}
    			catch (Exception e)
    			{
    				e.printStackTrace();
    				
    				SDKUtil.createErrorEvent (e, "DocumentFolderService.createDocument()", DocumentFolderServiceProxy.this);
                    return;
    			}
    			
    	        SDKUtil.createEventWithNode (folder, DocumentFolderServiceProxy.this, "newfoldernode"); 
    		}
    	}.start();
    }
    
    
    @Kroll.method
    void deleteNode (final Object args[])
    {
    	new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			NodeProxy arg = (NodeProxy) args[0];
    		     
    			try
    			{
    				service.deleteNode(arg.node);
    			}
    			catch (Exception e)
    			{
    				e.printStackTrace();
    				
    				SDKUtil.createErrorEvent (e, "DocumentFolderService.deleteNode()", DocumentFolderServiceProxy.this);
                    return;
    			}
    			
    	        HashMap<String, Object> map = new HashMap<String, Object>();
    	        map.put("code", 0);
    	        fireEvent("deletednode", new KrollDict(map) );
    		}
    	}.start();
    }
}
