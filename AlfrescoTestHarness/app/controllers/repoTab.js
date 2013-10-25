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
var parentFolders = new Array();
var allNodeTypes = true;


Ti.App.addEventListener('cleartabs', function()
{
	parentFolders = new Array();
	mainSection.deleteItemsAt(0, mainSection.getItems().length);
});

function viewButtonChange()
{
	allNodeTypes = !allNodeTypes;
}

Ti.App.addEventListener('repopopulate', function()
{
	if (Alloy.Globals.repositorySession != null)
	{
		if ($.mainSection.getItems().length == 0)
		{ 
			documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
			documentFolderService.addEventListener('error', function(e) { alert(e.errorstring); });
			
			//Set up the list's on-click functionality. 
			Alloy.Globals.controllerNavigation($, documentFolderService, parentFolders,
												function(folder)
												{
													if (allNodeTypes)
													{
														documentFolderService.setFolder(folder);
												        documentFolderService.retrieveChildrenInFolder();
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
																				
			getFolder(Alloy.Globals.repositorySession);
		}			
	}
});
										

function getFolder(repoSesh)
{	
	documentFolderService.initialiseWithSession(repoSesh);
	documentFolderService.retrieveRootFolder();

	documentFolderService.addEventListener('retrievedfolder',function(e)
	{
		$.folderLabel.text = " " + documentFolderService.getCurrentFolder().getName();
		
		documentFolderService.retrieveChildrenInFolder();
		
		Alloy.Globals.modelListeners(documentFolderService, mainSection);
	});	
}
