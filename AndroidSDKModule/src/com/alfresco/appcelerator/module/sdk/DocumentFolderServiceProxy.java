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
import org.alfresco.mobile.android.api.model.Property;
import org.alfresco.mobile.android.api.model.Site;
import org.alfresco.mobile.android.api.services.DocumentFolderService;
import org.alfresco.mobile.android.api.services.SiteService;
import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.io.TiFile;
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
    void initWithSession(Object[] args)
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
    	        	String nodeGetters[] = {"name", "title", "summary", "type", "createdBy", "createdAt", "modifiedBy", "modifiedAt"};    	
    	        	HashMap<String, Object> map = new HashMap<String, Object>();
    	        	
    	        	if (node.isDocument())
    	        	{
    	        		Document doc = (Document)node;
    	        		String docGetters[] = {"contentStreamMimeType", "contentStreamLength", "versionLabel", "versionComment", "isLatestVersion"};
    	        		String docPropertyNames[] = {"contentMimeType", "contentLength", null, null, null};	//For where they differ from iOS property names.
    	        	
    	        		for (int i = 0;  i < nodeGetters.length;  i++)
    	        		{
    	        			Object value = extractProperty(doc, nodeGetters[i]);
    	        			if (value != null)
    	        				map.put(nodeGetters[i], value);
    	        		}
    	        		for (int i = 0;  i < docGetters.length;  i++)
    	        		{
    	        			Object value = extractProperty(doc, docGetters[i]);
    	        			if (value != null)
    	        				map.put(docPropertyNames[i] != null ? docPropertyNames[i] : docGetters[i], value);
    	        		}
    	        		
    	        		DocumentProxy thiDocument = new DocumentProxy (doc);
    	        		map.put("document", thiDocument);
    	       
    	                fireEvent("documentnode", new KrollDict(map));
    	        	}
    	        	else
    	        	{
    	        		Folder folder = (Folder)node;
    	        		
    	        		for (int i = 0;  i < nodeGetters.length;  i++)
    	        		{
    	        			Object value = extractProperty(folder, nodeGetters[i]);
    	        			if (value != null)
    	        				map.put(nodeGetters[i], value);
    	        		}
    	        		
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
    	        
    	        HashMap<String, Object> map = new HashMap<String, Object>();
    	        TiFile tiFile = new TiFile(file.getFile(), file.getFile().getPath(), true);
    	        
    	        map.put("document", tiFile);
    	        fireEvent("retrieveddocument", new KrollDict(map) );
    		}
    	}.start();
    }

    
    Object extractProperty (Object obj, String getter)
    {
    	StringBuilder getterMethod = new StringBuilder(getter);	
    	if (!getter.startsWith("is"))
    	{
    		getterMethod.setCharAt(0, Character.toTitleCase(getterMethod.charAt(0)));
    		getterMethod = new StringBuilder("get" + getterMethod);
    	}
    	
		java.lang.reflect.Method method;
		try 
		{
			method = obj.getClass().getMethod(getterMethod.toString());
			
			try 
			{
				Object retObj = method.invoke(obj);
				if (retObj != null)
				{
					if (retObj instanceof GregorianCalendar)
						retObj = ((GregorianCalendar)retObj).getTime();
				}
				return retObj;
			}
			catch (IllegalArgumentException e) 
			{
			}
			catch (IllegalAccessException e) 
			{
			}
			catch (InvocationTargetException e) 
			{
			}
		}
		catch (SecurityException e) 
		{
		} 
		catch (NoSuchMethodException e) 
		{
		}
		
		return null;
    }
}
