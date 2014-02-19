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
var searchService;
var listingContext;
var skipCount = 0;
var hasMoreItems = false;
var persons = {};

Ti.App.addEventListener('personsearchinit',function()
{
	if (Alloy.Globals.AlfrescoSDKVersion >= 1.2)
	{
		mainSection.deleteItemsAt(0, mainSection.getItems().length);
		listingContext = Alloy.Globals.SDKModule.createListingContext();
		hasMoreItems = false;
		skipCount = 0;
		listingContext.initialiseWithMaxItemsAndSkipCount (10, skipCount);
		$.searchButton.title = "Get first ten people";
		
		if (Alloy.Globals.repositorySession != null  &&  searchService == null)
		{ 
			searchService = Alloy.Globals.SDKModule.createPersonService();
			searchService.addEventListener('error', function(e) { alert(e.errorstring); });
			
			searchService.initialiseWithSession(Alloy.Globals.repositorySession);
			
			listingContext = Alloy.Globals.SDKModule.createListingContext();
			
			searchService.addEventListener('personnode', function(e) 
			{
				var person = e.person;
				var propertiesDataSet = [];
	  	 		propertiesDataSet.push({info: {text: person.fullName}, es_info: {text: person.email.length > 0 ? person.email : "No email address"}, pic: {image: "default_entry_icon.png"}, data: person});
		  	 	$.mainSection.appendItems(propertiesDataSet);
		  	 	
		  	 	if (person.identifier != 'System')
		 		{
		 			persons[person.identifier] = $.mainSection.getItems().length-1;
		 			
		 			//alert(JSON.stringify(persons));
		 			
		 			searchService.retrieveAvatarForPerson(person);
		 		}
			});
				
			searchService.addEventListener('retrievedavatar', function(e)
			{
				var id = e.personid;
				var contentFile = e.contentfile;			
				var personIdx = persons[id];
				
				Ti.API.info("ID: " + id + ", Image: " + contentFile.getPath());
				
				var item = $.mainSection.getItemAt(personIdx);
				item.pic.image = contentFile.getPath();
				$.mainSection.updateItemAt(personIdx, item);	
			});
			
			$.folderList.addEventListener('itemclick', function(e)
			{
				Alloy.Globals.currentNode = $.mainSection.getItemAt(e.itemIndex).data;
				Alloy.Globals.nodeJustProperties = true;
				
				alert("Go to the Properties tab to see this objects full properties.");
			});
			
			searchService.addEventListener('pagingresult', function(e)
			{
				hasMoreItems = e.hasmoreitems;
				
				if (hasMoreItems)
					$.searchButton.title = "Next ten people...";
				else
					$.searchButton.title = "Get first ten people";
			});
		}
	}
});


Ti.App.addEventListener('cleartabs', function()
{
	mainSection.deleteItemsAt(0, mainSection.getItems().length);
});


function searchButtonClick()
{
	if (Alloy.Globals.AlfrescoSDKVersion >= 1.2)
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
		
		mainSection.deleteItemsAt(0, mainSection.getItems().length);
						
		searchService.searchWithListingContext($.searchEdit.value, listingContext);
	}			
}					
