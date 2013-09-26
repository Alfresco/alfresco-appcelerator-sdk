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

Ti.App.addEventListener('searchinit',function()
{
	if (Alloy.Globals.repositorySession != null)
	{ 
		documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
		documentFolderService.initialiseWithSession(Alloy.Globals.repositorySession);
	
		searchService = Alloy.Globals.SDKModule.createSearchService();
		searchService.addEventListener('error', function(e) { alert(e.errorstring); });
		
		searchService.initialiseWithSession(Alloy.Globals.repositorySession);
		
		listingContext = Alloy.Globals.SDKModule.createListingContext();
	}
});


Ti.App.addEventListener('cleartabs', function()
{
	parentFolders = new Array();
	mainSection.deleteItemsAt(0, mainSection.getItems().length);
});


function searchButtonClick()
{
	listingContext.initialiseWithMaxItemsAndSkipCount(5, skipCount);
	//skipCount += 5;
	
	var searchTerm = "SELECT * FROM cmis:document WHERE cmis:name LIKE '%" + $.searchEdit.value + "%'";

	parentFolders = new Array();
	mainSection.deleteItemsAt(0, mainSection.getItems().length);
		
	if (Alloy.Globals.repositorySession != null)
	{ 
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
										    });	

		Alloy.Globals.modelListeners(searchService, mainSection);
				
		searchService.searchWithStatement(searchTerm);
		//searchService.searchWithStatementAndListingContext(searchTerm, listingContext);
	}			
}					
