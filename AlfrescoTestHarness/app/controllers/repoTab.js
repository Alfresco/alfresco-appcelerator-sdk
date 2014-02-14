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
var documentFolderService = null;
var parentFolders = new Array();
var allNodeTypes = true;
var listingContext;
var skipCount = 0;
var hasMoreItems = false;


Ti.App.addEventListener('cleartabs', function()
{
	if (documentFolderService != null)
	{
		parentFolders = new Array();
		mainSection.deleteItemsAt(0, mainSection.getItems().length);
	}
});

function viewButtonChange()
{
	allNodeTypes = !allNodeTypes;
}

Ti.App.addEventListener('repopopulate', function()
{
	if (Alloy.Globals.repositorySession != null)
	{
		if (documentFolderService == null)
		{
			listingContext = Alloy.Globals.SDKModule.createListingContext();
			listingContext.initialiseWithMaxItemsAndSkipCount(20, 0);
														 
			documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
			
			documentFolderService.initialiseWithSession(Alloy.Globals.repositorySession);
			
			documentFolderService.addEventListener('error', function(e) { alert(e.errorstring); });
			
			
			//Set up the list's on-click functionality. 
			Alloy.Globals.controllerNavigation($, documentFolderService, parentFolders,
												function(folder)
												{
													if (allNodeTypes)
													{
														documentFolderService.setFolder(folder);
												        documentFolderService.retrieveChildrenInFolderWithListingContext(listingContext);
												        //Will result in an event fired to re-populate.
												   	}
												   	else
												   	{
												   		documentFolderService.setFolder(folder);
												   		documentFolderService.retrieveDocumentsInFolder(folder);
												   	}
											    },    
											    function(document)
											    {
											    	documentFolderService.saveDocument (document);
											    	//Will result in an event fired to preview the saved file.
											    });
																				
			Alloy.Globals.modelListeners(documentFolderService, mainSection);
			
			documentFolderService.addEventListener('pagingresult', function(e)
			{
				hasMoreItems = e.hasmoreitems;
				
				if (hasMoreItems)
				{
					var mainDataSet = [];
			  	 	var data = {info: {text: "(" + e.totalitems + " total items)"}, es_info: {text: "Folder contains more items not shown"}, pic: {image: 'default_entry_icon.png'},  properties: {folder: -1, name: null, folderobject: null} };		
			  	 	mainDataSet.push(data);
			  	 	mainSection.appendItems(mainDataSet);
				}
			});
			
			documentFolderService.addEventListener('retrievedfolder',function(e)
			{
				$.folderLabel.text = " " + documentFolderService.getCurrentFolder().getName();
				
				Alloy.Globals.showSpinner(true);				
				documentFolderService.retrieveChildrenInFolderWithListingContext(listingContext);
			});
			
			documentFolderService.addEventListener('endenumeration',function(e)
			{
				Alloy.Globals.showSpinner(false);
			});
		}	
		
		
		parentFolders = new Array();
		mainSection.deleteItemsAt(0, mainSection.getItems().length);
	
		documentFolderService.retrieveRootFolder();	
	}
});
