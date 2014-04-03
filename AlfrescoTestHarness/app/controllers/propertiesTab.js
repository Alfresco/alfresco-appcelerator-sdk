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

var creatorIndex;
var documentFolderService = null;
var commentService;
var taggingService;
var personService;
var ratingService;
var permissionsDataSet = [];
var commentsDataSet = [];
var tagsDataSet = [];
var ratingsDataSet  = [];
var lastNode = null;
var parentFolders = new Array();
var person;

Ti.App.addEventListener('cleartabs', function()
{
	if (Alloy.Globals.currentNode != null)
	{
		$.properties.deleteItemsAt(0,$.properties.getItems().length);
		$.permissions.deleteItemsAt(0,$.permissions.getItems().length);
		$.comments.deleteItemsAt(0,$.comments.getItems().length);
		$.ratings.deleteItemsAt(0,$.ratings.getItems().length);
		$.tags.deleteItemsAt(0,$.tags.getItems().length);
		$.folderList.deleteItemsAt(0,$.folderList.getItems().length);
		propertiesDataSet = [];
		permissionsDataSet = [];	
		commentsDataSet = [];
		tagsDataSet = [];
		ratingsDataSet  = [];
	}
});


Ti.App.addEventListener('propspopulate',function()
{
	if (Alloy.Globals.AlfrescoSDKVersion >= 1.0)
	{
		if (Alloy.Globals.currentNode == null)
			return;
		
		if (lastNode != null  &&  lastNode == Alloy.Globals.currentNode)
			return;
		
		init();
			
		lastNode = Alloy.Globals.currentNode;
		
		var node = lastNode;	
		
		$.properties.deleteItemsAt(0,$.properties.getItems().length);
		$.permissions.deleteItemsAt(0,$.permissions.getItems().length);
		$.comments.deleteItemsAt(0,$.comments.getItems().length);
		$.tags.deleteItemsAt(0,$.tags.getItems().length);
		$.folderList.deleteItemsAt(0,$.folderList.getItems().length);
		$.ratings.deleteItemsAt(0,$.ratings.getItems().length);
		propertiesDataSet = [];
		permissionsDataSet = [];	
		commentsDataSet = [];
		tagsDataSet = [];
		ratingsDataSet  = [];
				
		Alloy.Globals.recurseProperties (node, "", function(name,value)
		{
			var propertiesDataSet = [];
	  	 	propertiesDataSet.push({info: {text: name + ":"}, es_info: {text: value}, pic: {image: "default_entry_icon.png"}});
	  	 	$.properties.appendItems(propertiesDataSet);
	  	 	
	  	 	if (name == 'createdBy'  &&  value  &&  value.length > 0  &&  value != 'System')
	 		{
	 			Ti.API.info("Person id: " + value);	  	 			
	 			personService.retrievePersonWithIdentifier(value);
	 			creatorIndex = $.properties.getItems().length-1;
	 		}
		});
	   	    	
	   	if (Alloy.Globals.nodeJustProperties == false)
	   	{
			documentFolderService.retrievePermissionsOfNode(node);	
			commentService.retrieveCommentsForNode(node);
			taggingService.retrieveTagsForNode(node);
			ratingService.isNodeLiked(node);
			ratingService.retrieveLikeCountForNode(node);
				
			if (node.isDocument)
				versionService.retrieveAllVersionsOfDocument(node);
			else
			{
				var versionsDataSet = [];
				versionsDataSet.push({info: {text: "Not applicable"}, es_info: {text: ""}, pic: {image: ""}});
				$.folderList.appendItems(versionsDataSet);
			}
		}
		else
		{
			permissionsDataSet.push({info: {text: "Not applicable"}, es_info: {text: ""}, pic: {image: ""}});
			$.permissions.appendItems(permissionsDataSet);
			
			commentsDataSet.push({info: {text: "Not applicable"}, es_info: {text: ""}, pic: {image: ""}});
			$.comments.appendItems(commentsDataSet);
			
			tagsDataSet.push({info: {text: "Not applicable"}, es_info: {text: ""}, pic: {image: ""}});
			$.tags.appendItems(tagsDataSet);
			
			var versionsDataSet = [];
			versionsDataSet.push({info: {text: "Not applicable"}, es_info: {text: ""}, pic: {image: ""}});
			$.folderList.appendItems(versionsDataSet);
			
			ratingsDataSet.push({info: {text: "Not applicable"}, es_info: {text: ""}, pic: {image: ""}});
			$.ratings.appendItems(ratingsDataSet);
		}
	}
}); 


function init()
{
	if (documentFolderService == null)
	{
		documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
		documentFolderService.addEventListener('error', function(e) { Alloy.Globals.showSpinner(false); alert("documentFolderService:\r\n" + e.errorstring); });
		documentFolderService.addEventListener('retrievedpermissions', function(e)
		{
			Alloy.Globals.recurseProperties (e.permissions, "", function(name,value)
		 	{
		 		permissionsDataSet.push({info: {text: name + ":"}, es_info: {text: value}, pic: {image: "default_entry_icon.png"}});
			});
			
			$.permissions.appendItems(permissionsDataSet);
		});  
		
		commentService = Alloy.Globals.SDKModule.createCommentService();
		commentService.addEventListener('error', function(e) { Alloy.Globals.showSpinner(false); alert("commentService:\r\n" + e.errorstring); });
		commentService.addEventListener('endenumeration', function(e)
		{
			$.comments.appendItems(commentsDataSet);
		});
		commentService.addEventListener('commentnode', function(e)
		{
		 	commentsDataSet.push({info: {text: e.comment.name}, es_info: {text: e.comment.content}, pic: {image: "default_entry_icon.png"}});
		});	
			
		taggingService = Alloy.Globals.SDKModule.createTaggingService();
		taggingService.addEventListener('error', function(e) { Alloy.Globals.showSpinner(false); alert("taggingService:\r\n" + e.errorstring); });
		taggingService.addEventListener('endenumeration', function(e)
		{
			$.tags.appendItems(tagsDataSet);
		});
		taggingService.addEventListener('tagnode', function(e)
		{
		 	tagsDataSet.push({info: {text: e.tag.identifier ? e.tag.identifier : e.tag.value}, es_info: {text: e.tag.value}, pic: {image: "default_entry_icon.png"}});
		});
		
		personService = Alloy.Globals.SDKModule.createPersonService();
		personService.addEventListener('error', function(e) { Alloy.Globals.showSpinner(false); alert("personService:\r\n" + e.errorstring); });		
		personService.addEventListener('endenumeration', function(e)
		{
		});
		personService.addEventListener('personnode', function(e)
		{
			person = e.person;
			Ti.API.info("Person: " + person.fullName);
			
			personService.retrieveAvatarForPerson(person);
		});	
		personService.addEventListener('retrievedavatar', function(e)
		{
			var contentFile = e.contentfile;			
			Ti.API.info("Image: " + contentFile.getPath());
			
			var item = $.properties.getItemAt(creatorIndex);
			item.pic.image = contentFile.getPath();
			$.properties.updateItemAt(creatorIndex, item); 
		});
		
		versionService = Alloy.Globals.SDKModule.createVersionService();
		Alloy.Globals.modelListeners(versionService,$.folderList);
		$.propList.addEventListener('itemclick', function(e)
		{
			if (e.itemIndex == creatorIndex)	//createdBy item?
			{
				Alloy.Globals.recursePropertiesAndAlert("Person Properties", person);
			}
			else
			if (e.section == $.folderList)
			{
				//Alloy.Globals.currentNode = e.section.getItemAt(e.itemIndex).properties.docobject;
				//Alloy.Globals.nodeJustProperties = false;
				//Ti.App.fireEvent('propspopulate');
			}
		});
		versionService.addEventListener('error', function(e) { Alloy.Globals.showSpinner(false); alert("versionService:\r\n" + e.errorstring); });
		versionService.addEventListener('endenumeration', function(e)
		{
		});	

		ratingService = Alloy.Globals.SDKModule.createRatingService();		
		ratingService.addEventListener('error', function(e) { Alloy.Globals.showSpinner(false); alert("ratingService:\r\n" + e.errorstring); });
		ratingService.addEventListener('retrievedisliked',function(e) 
		{
			ratingsDataSet = [];
			ratingsDataSet.push({info: {text: "Liked by this user?"}, es_info: {text: e.isliked==1 ? "Yes" : "No"}, pic: {image: "default_entry_icon.png"}});
			$.ratings.appendItems(ratingsDataSet);
		});
		ratingService.addEventListener('retrievedlikecount',function(e) 
		{
			ratingsDataSet = [];
			ratingsDataSet.push({info: {text: "Overall like count"}, es_info: {text: e.count }, pic: {image: "default_entry_icon.png"}});
			$.ratings.appendItems(ratingsDataSet);
		});
		
		documentFolderService.initialiseWithSession(Alloy.Globals.repositorySession);
		personService.initialiseWithSession(Alloy.Globals.repositorySession);
		commentService.initialiseWithSession(Alloy.Globals.repositorySession);
		taggingService.initialiseWithSession(Alloy.Globals.repositorySession);
		versionService.initialiseWithSession(Alloy.Globals.repositorySession);
		ratingService.initialiseWithSession(Alloy.Globals.repositorySession);
	}
}