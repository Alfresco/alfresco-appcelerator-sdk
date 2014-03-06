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

import org.alfresco.mobile.android.api.model.ListingContext;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class ListingContextProxy extends KrollProxy
{
	public ListingContext listingContext;
	
	public ListingContextProxy()
	{
		super();
	}
	
	
	@Kroll.method
	void initialise(Object[] noargs)
	{
		listingContext = new ListingContext("", ListingContext.DEFAULT_MAX_ITEMS, 0, false);
	}


	/**
	 Initialise with maximum number of items to deliver at one time
	 @param int maxItems
	*/
	@Kroll.method
	void initialiseWithMaxItems(Object[] arg)
	{
		listingContext = new ListingContext("", (Integer)arg[0], 0, false);
	}


	/**
	 Initialise with maximum number of items, and skip count
	 @param int maxItems
	 @param int skipCount
	*/
	@Kroll.method
	void initialiseWithMaxItemsAndSkipCount(Object[] args)
	{
		listingContext = new ListingContext("", (Integer)args[0], (Integer)args[1], false);
	}
	
	
	/**
	 Initialise with sort property
	 @param string sortProperty
	 @param int sortAscending (0 = false, 1 = true)
	*/
	@Kroll.method
	void initialiseWithSortProperty(Object[] args)
	{
		listingContext = new ListingContext((String)args[0], ListingContext.DEFAULT_MAX_ITEMS, 0, ((Integer)args[1] > 0) );
	}


	/**
	 Initialise with all parameters
	 @param int maxItems
	 @param int skipCount
	 @param string sortProperty
	 @param int sortAscending (0 = false, 1 = true)
	*/
	@Kroll.method
	void initialiseWithAllParams(Object[] args)
	{
		listingContext = new ListingContext((String)args[2], (Integer)args[0], (Integer)args[1], ((Integer)args[3] > 0) );
	}
	
	
	@Kroll.method
	void setFilter(Object[] arg)
	{
		listingContext.setFilter (((ListingFilterProxy)arg[0]).listingFilter);
	}
}
