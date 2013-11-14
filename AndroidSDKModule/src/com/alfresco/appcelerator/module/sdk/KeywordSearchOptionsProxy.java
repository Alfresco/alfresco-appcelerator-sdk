package com.alfresco.appcelerator.module.sdk;

import org.alfresco.mobile.android.api.model.KeywordSearchOptions;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class KeywordSearchOptionsProxy extends KrollProxy
{
	public KeywordSearchOptions searchOptions;
	
	KeywordSearchOptionsProxy()
	{
		super();
	}
	
	@Kroll.method
	void initialise (Object[] noargs)
	{
		searchOptions = new KeywordSearchOptions();
	}

	/**
	 @param boolean exactMatch
	 @param boolean includeContent - searches also the content of files
	 */
	@Kroll.method
	void initialiseWithExactMatch (Object[] args)
	{
		searchOptions = new KeywordSearchOptions (null, true, (boolean)args[1], (boolean)args[0]);
	}


	/**
	 @param Folder folder - the node to be searched
	 @param boolean includeDescendants - search sub-folders as well
	 */
	@Kroll.method
	void initialiseWithFolder (Object[] args)
	{
		FolderProxy folderProxy = (FolderProxy)args[0];
		
		searchOptions = new KeywordSearchOptions (folderProxy.getFolder(), (boolean)args[1], false, false);
	}


	/**
	 @param boolean exactMatch
	 @param boolean includeContent - searches also the content of files
	 @param Folder folder - the node to be searched
	 @param boolean includeDescendants - search sub-folders as well
	 */
	@Kroll.method
	void initialiseWithExactMatchAndFolder (Object[] args)
	{
		FolderProxy folderProxy = (FolderProxy)args[2];
		
		searchOptions = new KeywordSearchOptions (folderProxy.getFolder(), (boolean)args[3], (boolean)args[1], (boolean)args[0]);
	}
}
