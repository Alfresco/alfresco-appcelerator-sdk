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



/*
 createServiceListeners
 
 Adds listeners for the specific service that will populate the list specified as the SDK fires events back for nodes.
 
 service		The Alfresco service being enumerated.
 mainSection	The ListView section to populate.
  
 */
Alloy.Globals.modelListeners = function(service, mainSection)  
{
	service.addEventListener('documentnode',function(e)
  	{
  		var doc = e.document;
  		
  	 	Ti.API.info("DOCUMENT: name = " + doc.name + ", title = " + doc.title + ", summary = " + doc.summary + ", MIME type = " + doc.contentMimeType);	
  	 	
  	 	var icon = "mime_txt.png";
  	 	
  	 	if (doc.contentMimeType != null)
  	 	{
	  	 	if (doc.contentMimeType.indexOf("text/") !== -1)
	  	 	{
	  	 		if (doc.contentMimeType.indexOf("/plain") !== -1)
	  	 			icon = "mime_txt.png";
	  	 		else
	  	 			icon = "mime_doc.png";
	  	 	}
	  	 	else	
	  	 	if (doc.contentMimeType.indexOf("application/") !== -1)
	  	 	{
	  	 		if (doc.contentMimeType.indexOf("/msword") !== -1  || 
	  	 			doc.contentMimeType.indexOf("/vnd.openxmlformats-officedocument.wordprocessingml") !== -1)
	  	 		{
	  	 			icon = "mime_doc.png";
	  	 		}
	  	 		else
	  	 		if (doc.contentMimeType.indexOf("/vnd.openxmlformats-officedocument.spreadsheetml") !== -1)
	  	 		{
	  	 			//Spreadsheet
	  	 		}
	  	 	}
	  	 	else
	  	 	if (doc.contentMimeType.indexOf("image/") !== -1)
	  	 		icon="mime_img.png";
	  	}
	  	 		
	  	var version = doc.versionLabel;  	 		
  	 	var modified = new String + doc.modifiedAt;
  	 	modified = modified.substr(0,21) + ", v" + doc.versionLabel;
  	 	
  	 	var truncText = doc.name;
  	 	var len  = truncText.length;
  	 	
  	 	if (len > 22)
  	 		truncText = doc.name.substr(0, 22) + "...";
  	 		
  	 	var mainDataSet = [];
  	 	var data = {info: {text: truncText}, es_info: {text: modified}, pic: {image: icon},  properties: {data: doc, folder: 0, name: doc.name, docobject: doc} };	 	  	 		
  	 	mainDataSet.push(data);
  	 	mainSection.appendItems(mainDataSet);	
  	});
  	
  	service.addEventListener('foldernode',function(e)
  	{
  		var folder = e.folder;
  		var folderName = folder.getName();
  		
  	 	Ti.API.info("FOLDER: name = " + folder.name + ", title = " + folder.title + ", summary = " + folder.summary + ". Folder name from object: "+ folderName);
  	 	
  	 	var modified = new String + folder.modifiedAt;
  	 	modified = modified.substr(0,21);
  	 	
  	 	var mainDataSet = [];
  	 	var data = {info: {text: folder.name}, es_info: {text: modified}, pic: {image: 'folder@2x.png'},  properties: {data: folder, folder: 1, name: folder.name, folderobject: folder} };
        		
  	 	mainDataSet.push(data);
  	 	mainSection.appendItems(mainDataSet);
  	});
  	  	
  	service.addEventListener('retrieveddocument',function(e)
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
	
	service.addEventListener('progresseddocument',function(e)
	{
		var bytes = e.bytes;
		var total = e.total;
	});
	
	service.addEventListener('error',function(e)
	{
	  	alert("Operation failed (" + e.errorcode + "): " + e.errorstring);
	});
};


Alloy.Globals.sitesModelListener = function(service, section, sitetype)
{
	service.addEventListener(sitetype,function(e)
	{
		var site = e.site;
		
  	 	Ti.API.info(sitetype.toUpperCase() + ": name = " + site.shortName + ", title = " + site.title + ", summary = " + site.summary);
  	 	
  	 	var mainDataSet = [];
  	 	var data = {info: {text: site.shortName}, es_info: {text: site.title}, pic: {image: 'folder@2x.png'},  properties: {data: site, name: site.shortName, siteObject: site} };
        		
  	 	mainDataSet.push(data);
  	 	section.appendItems(mainDataSet);
	});
};


Alloy.Globals.activitiesModelListener = function(service, section)
{
	service.addEventListener('activitynode',function(e)
	{
		var activity = e.activity;
		var title = activity.type;
		var extra = (activity.data.nodeRef ? "Node: " + activity.data.title + ". " : "") +
					(activity.siteShortName.length > 0 ? "Site: " + activity.siteShortName + ". " : "") +
					"User: " + activity.createdBy + ". " +
  	 				(activity.data.role ? "Role: " + activity.data.role : "");	
  	 	var mainDataSet = [];
  	 	var data = {info: {text: title}, es_info: {text: extra}, pic: {image: 'default_entry_icon.png'}, 
  	 				 properties: {data: activity.data, title: title, siteShortName: activity.siteShortName, identifier: activity.identifier, createdAt: activity.createdAt, createdBy: activity.createdBy, type: activity.type} };
        		
  	 	mainDataSet.push(data);
  	 	section.appendItems(mainDataSet);
	});
};

var createdFolder;
var itemClicked;

Alloy.Globals.controllerNavigation = function(view, service, parentFolders, onFolder, onDocument, navigable)
{
	service.addEventListener('deletednode', function(e)
	{
		if (navigable)
		{
			//Empty the list and add 'Back' item if we're not at root folder.
		    itemClicked.section.deleteItemsAt(0,itemClicked.section.getItems().length);
		    if (parentFolders.length > 0)
		    {      
		        var mainDataSet = [];
		  	 	var data = {info: {text: "Back"}, es_info: {text: "Previous folder"}, pic: {image: 'wm_back.png'},  properties: {folder: 2, name: null, folderobject: null} };		
		  	 	mainDataSet.push(data);
		  	 	itemClicked.section.appendItems(mainDataSet);
		  	}
		  	
			onFolder(service.getCurrentFolder());	//Refresh the folder contents.
		}	
	});
	
	
	service.addEventListener('newdocumentnode', function(e)
	{
		viewNode(itemClicked);
	});
	

	var file = Alloy.Globals.SDKModule.createContentFile();
	
	file.addEventListener('initialisedfile', function(e)
	{
		service.createDocumentWithName('test.txt', createdFolder, file, {'cm:title' : 'test text file'});	
	});
	
	
	service.addEventListener('newfoldernode', function(e)
	{
		createdFolder = e.folder;
		file.initialiseWithPlainText('The quick brown fox jumped over the lazy dog');	
	});
	
	service.addEventListener('removedfavorite', function(e) { alert("Favourite removed"); });
	service.addEventListener('addedfavorite', function(e) { alert("Favourite added"); });
	service.addEventListener('retrievedisfavorite', function(e)
	{
		if (e.favorite == 1)
			service.removeFavorite(e.node);
		else
			service.addFavorite(e.node);
	});
	
	
	var commentService = Alloy.Globals.SDKModule.createCommentService();
	commentService.initialiseWithSession(Alloy.Globals.repositorySession);
	commentService.addEventListener('error',function(e)	{ alert("Operation failed (" + e.errorcode + "): " + e.errorstring); });

	var taggingService = Alloy.Globals.SDKModule.createTaggingService();
	taggingService.initialiseWithSession(Alloy.Globals.repositorySession);
	taggingService.addEventListener('error',function(e)	{ alert("Operation failed (" + e.errorcode + "): " + e.errorstring); });

	var liked = 0;
	var ratingService = Alloy.Globals.SDKModule.createRatingService();
	ratingService.initialiseWithSession(Alloy.Globals.repositorySession);
	ratingService.addEventListener('error',function(e) { alert("Operation failed (" + e.errorcode + "): " + e.errorstring); });
	ratingService.addEventListener('retrievedisliked',function(e) { liked = e.isliked; });
	
	ratingService.addEventListener('likednode', function(e) { alert("Node Liked"); });
	ratingService.addEventListener('unlikednode', function(e) { alert("Node Unliked"); });
	ratingService.addEventListener('retrievedisliked', function(e)
	{
		if (e.isliked == 1)
			ratingService.unlikeNode(e.node);
		else
			ratingService.likeNode(e.node);
	});
			    			    	
	view.folderList.addEventListener('itemclick', function(e)
	{
		var mainSection = e.section;
	    var item = e.section.getItemAt(e.itemIndex);
	    var name = item.properties.name;
	    var isFolder = (item.properties.folder > 0);
	    var node;
	    
		itemClicked = e;
	    
	    if (isFolder)
	    	Alloy.Globals.currentNode = node = item.properties.folderobject;
		else
			Alloy.Globals.currentNode = node = item.properties.docobject;
		
		Alloy.Globals.nodeJustProperties = false;
		
		if (item.properties.folder == 2  ||  				//'Up' folder item press.
	    	Alloy.Globals.AlfrescoSDKVersion < 1.1)
	    {
	    	viewNode(e);
	    }
	    else if (item.properties.folder >= 0)
	    {
		    var ops;
		    
		    if (isFolder)
		    {
		    	ops = { cancel: 6,
						options: ['View folder', 'Delete folder', 'Add comment', 'Add tags', 'Like/Unlike folder', 'Create nodes', 'Cancel'],
						selectedIndex: 0,
						destructive: 0,
						title: 'Folder Actions'
					  };
			}
			else
			{
				ops = { cancel: 6,
						options: ['View document', 'Delete document', 'Add comment', 'Add tags', 'Like/Unlike document', 'Favourite/Unfavourite', 'Cancel'],
						selectedIndex: 0,
						destructive: 0,
						title: 'Document Actions'
					  };
			}
						
			var dlg = Ti.UI.createOptionDialog(ops);
		    
		  	dlg.addEventListener('click', function(ev)
		  	{
		  		if (ev.index == 0)
		  			viewNode(e);
				else
				if (ev.index == 1)
			    {
			    	service.deleteNode(node);
			    	alert("Node deleted");
			    	
			    	Alloy.Globals.currentNode = null;
			    }	
				else
				if (ev.index == 2)
				{
			    	commentService.addCommentToNode(node, "New comment", "New comment title");
			    	alert("Added comment 'New comment' to node");
			    }
			    else
			    if (ev.index == 3)
			    {
			    	taggingService.addTags(['one', 'two', 'three'], node);
			    	alert("Added tags 'one', 'two', 'three' to node");
			    }
			    else
			    if (ev.index == 4)
			    {
			    	ratingService.isNodeLiked(node);
			    }
				else
				{
					if (isFolder)
					{
						if (ev.index == 5)
					    {
					    	if (!navigable)
					    		alert("Cannot create nodes in this view");
					    	else
					    	{
						    	var foldername = 'New ' + (new Date()).getTime();
						    	
								alert("Creating new folder '" + foldername + "' and document...");
								
								service.createFolderWithName(foldername, item.properties.folderobject, {'cm:title' : 'A new test folder'});
							}  
					    }
					} 
					else
					{
						if (ev.index == 5)
						{
							service.isFavorite(node);
						}
					}
				} 
			});
		  
			dlg.show();
		}
	});    
	
	
	function viewNode(e)
	{
		var mainSection = e.section;
	    var item = e.section.getItemAt(e.itemIndex);
	    var name = item.properties.name;
	    
	    Alloy.Globals.showSpinner(true);
	    
		if (item.properties.folder > 0)
		{
	        var folder;
	        if (item.properties.folder == 2)	//'Up' folder item press.
	        {
	        	folder = parentFolders.pop();
	        }
	        else
	        {
	        	folder = item.properties.folderobject;
	        	
	        	Alloy.Globals.currentNode = folder;	 
				Alloy.Globals.nodeJustProperties = false;
				
	        	parentFolders.push(service.getCurrentFolder());     	
	        }        
	        
	        //Empty the list and add 'Back' item if we're not at root folder.
	        mainSection.deleteItemsAt(0,mainSection.getItems().length);
	        if (parentFolders.length > 0)
	        {      
		        var mainDataSet = [];
		  	 	var data = {info: {text: "Back"}, es_info: {text: "Previous folder"}, pic: {image: 'wm_back.png'},  properties: {folder: 2, name: null, folderobject: null} };		
		  	 	mainDataSet.push(data);
		  	 	mainSection.appendItems(mainDataSet);
		  	}
		  	 	 	
		  	view.folderLabel.text = " " + folder.getName();
		  	
		  	onFolder(folder);
	    }    
	    else if (item.properties.folder == 0)	//Document.
	    {
	    	var doc = item.properties.docobject;
	    	
	    	Alloy.Globals.currentNode = doc;
	    	Alloy.Globals.nodeJustProperties = false;
			
	    	onDocument(doc);	    	
	   	}
	}
};


Alloy.Globals.recursePropertiesAndAlert = function recurseProperties (title, properties)
{
	var alertString = title + ":\r\n\r\n";
	
	Alloy.Globals.recurseProperties(properties, "", function(name,value)
 	{
 		alertString += name + " = " + value + "\r\n\r\n";
 	});
 	
 	alert (alertString);
};

Alloy.Globals.recurseProperties = function recurseProperties (properties, propertiesName, callForEachProperty)
{
	for(var propertyName in properties) 
	{
		var propertyValue = properties[propertyName];
		
		if (propertyValue != null  &&  propertyValue.constructor == Object)
			recurseProperties (propertyValue, propertyName, callForEachProperty);
		else
		{
			var valueAsString = new String;
			valueAsString += propertyValue;
			
			//Filter out JS and Appcelerator internal properties
			if (propertyName.toUpperCase().indexOf("BUBBLE") >= 0  || 
			    propertyName.indexOf("_hasJavaListener") >= 0  ||
			    propertyName.indexOf("apiName") >= 0)
			{	
				continue;
			}
				
			var subName;
			
			if (propertiesName.length > 0)
				subName = propertiesName + "." + propertyName;
			else
				subName = propertyName;
					
			callForEachProperty(subName, propertyValue);
		}
	}
};
