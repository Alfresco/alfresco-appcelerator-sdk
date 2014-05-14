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

var mainSection = $.mainSection;
var documentFolderService;
var searchService;
var listingContext;
var parentFolders = new Array();
var skipCount = 0;
var hasMoreItems = false;


Ti.App.addEventListener('searchinit',function()
{
	if (Alloy.Globals.AlfrescoSDKVersion >= 1.0)
	{
		mainSection.deleteItemsAt(0, mainSection.getItems().length);
		listingContext = Alloy.Globals.SDKModule.createListingContext();
		hasMoreItems = false;
		skipCount = 0;
		listingContext.initialiseWithMaxItemsAndSkipCount (10, skipCount);
		$.searchButton.title = "Get first ten nodes";
		
		
		if (Alloy.Globals.repositorySession != null  &&  searchService == null)
		{ 
			documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
			documentFolderService.initialiseWithSession(Alloy.Globals.repositorySession);
		
			searchService = Alloy.Globals.SDKModule.createSearchService();
			searchService.addEventListener('error', function(e) { Alloy.Globals.showSpinner(false); alert(e.errorstring); });
			
			searchService.initialiseWithSession(Alloy.Globals.repositorySession);
			
			listingContext = Alloy.Globals.SDKModule.createListingContext();
			
			//Set up the list's on-click functionality. 
			Alloy.Globals.controllerNavigation($, documentFolderService, parentFolders,
												function(folder)
												{
													documentFolderService.setFolder(folder);
											        documentFolderService.retrieveChildrenInFolder();
											        //Will result in an event fired to re-populate.
											    },    
											    function(document)
											    {
											    	documentFolderService.saveDocument (document);
											    	//Will result in an event fired to preview the saved file.
											    },
											    false);	
	
			Alloy.Globals.modelListeners(searchService, mainSection);
			
			documentFolderService.addEventListener('retrieveddocument',function(e)
			{
				var contentFile = e.contentfile;
				
				Alloy.Globals.showSpinner(false);
				
				if (Ti.Platform.name == 'iPhone OS')
				{
					Ti.UI.iOS.createDocumentViewer({url:contentFile.getPath()}).show();
				}
				else
				if (Ti.Platform.name == 'android')
				{
					Ti.Android.currentActivity.startActivity(Ti.Android.createIntent( { action: Ti.Android.ACTION_VIEW, type: contentFile.getMIMEType(), data: contentFile.getPath() } ));
				}
			});
			
			searchService.addEventListener('pagingresult', function(e)
			{
				//alert("Has more? " + e.hasmoreitems + ", total is " + e.totalitems);

				hasMoreItems = e.hasmoreitems;
				
				if (hasMoreItems)
					$.searchButton.title = "Next ten...";
				else
					$.searchButton.title = "Get first ten nodes";
			});
		}
	}
});


Ti.App.addEventListener('cleartabs', function()
{
	parentFolders = new Array();
	mainSection.deleteItemsAt(0, mainSection.getItems().length);
});


function searchButtonClick()
{
	if (Alloy.Globals.AlfrescoSDKVersion >= 1.0)
	{
		if (hasMoreItems)
		{
			skipCount += 10;
		}
		else
		{
			skipCount = 0;
		}
		
		listingContext.initialiseWithMaxItemsAndSkipCount (10, skipCount);
		
		var searchTerm = "SELECT * FROM cmis:document WHERE cmis:name LIKE '" + $.searchEdit.value + "%'";
	
		parentFolders = new Array();
		mainSection.deleteItemsAt(0, mainSection.getItems().length);
						
		searchService.searchWithStatementAndListingContext(searchTerm, listingContext);
	}			
}					
