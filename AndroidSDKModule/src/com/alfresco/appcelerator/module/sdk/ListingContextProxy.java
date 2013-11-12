package com.alfresco.appcelerator.module.sdk;

import org.alfresco.mobile.android.api.model.ListingContext;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

public class ListingContextProxy extends KrollProxy
{
	public ListingContext listingContext;
	
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
}
