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
		searchOptions = new KeywordSearchOptions (null, true, (Boolean)args[1], (Boolean)args[0]);
	}


	/**
	 @param Folder folder - the node to be searched
	 @param boolean includeDescendants - search sub-folders as well
	 */
	@Kroll.method
	void initialiseWithFolder (Object[] args)
	{
		FolderProxy folderProxy = (FolderProxy)args[0];
		
		searchOptions = new KeywordSearchOptions (folderProxy.getFolder(), (Boolean)args[1], false, false);
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
		
		searchOptions = new KeywordSearchOptions (folderProxy.getFolder(), (Boolean)args[3], (Boolean)args[1], (Boolean)args[0]);
	}
}
