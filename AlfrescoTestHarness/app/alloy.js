
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
	  	 		
  	 	var modified = new String + doc.modifiedAt;
  	 	modified = modified.substr(0,21);
  	 	
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
		
		//Move the file into the app's temporary folder, as it needs to be within the app's folders to be openable as an Intent.
		//The new temporary file will get deleted as the app shuts down.
		var file = Ti.Filesystem.getFile("file:/" + contentFile.getPath());
		var newFile = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, contentFile.getName());
		newFile.write(file.read());
		file.deleteFile();
	
		if (Ti.Platform.name == 'iPhone OS')
		{
			//Using DocumentViewer available from SmartAccess at https://marketplace.appcelerator.com/apps/3820?897323448
			//This is due to the fact that OpenURL() functionality does not work under iOS 6> for local files, and the Appcelerator DocumentViewer
			//will currently only open resource documents, not file system based documents.
			var documentviewer = require('es.smartaccess.documentviewer');
			var documentViewerProxy = require('es.smartaccess.documentviewer');		

			documentViewer = documentViewerProxy.createDocumentViewer({url: newFile.getNativePath()});
			documentViewer.show();
		}
		else
		if (Ti.Platform.name == 'android')
		{
			Ti.Android.currentActivity.startActivity(Ti.Android.createIntent( { action: Ti.Android.ACTION_VIEW, type: contentFile.getMIMEType(), data: newFile.getNativePath() } ));
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
}


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
}


Alloy.Globals.activitiesModelListener = function(service, section)
{
	service.addEventListener('activitynode',function(e)
	{
		var activity = e.activity;
		var title = activity.type;
		var siteName = activity.siteShortName;
		
		if (siteName.length == 0)
			name = "No site name present in this field";
			
  	 	Ti.API.info("ACTIVITY: title = " + title + ", type = " + activity.type + ", created by = " + activity.createdBy);
  	 	
  	 	var creationDate = new String + activity.createdAt;
  	 	creationDate = creationDate.substr(0,21);
  	 	
  	 	var mainDataSet = [];
  	 	var data = {info: {text: title}, es_info: {text: creationDate + " by " + activity.createdBy}, pic: {image: 'default_entry_icon.png'}, 
  	 				 properties: {data: activity.data, title: title, siteShortName: siteName, identifier: activity.identifier, createdAt: activity.createdAt, createdBy: activity.createdBy, type: activity.type} };
        		
  	 	mainDataSet.push(data);
  	 	section.appendItems(mainDataSet);
	});
}


Alloy.Globals.controllerNavigation = function(view, service, parentFolders, onFolder, onDocument)
{
	service.addEventListener('retrievedpermissions', function(e)
	{
		Alloy.Globals.recursePropertiesAndAlert ("Permissions", e.permissions);
	});
	
	view.folderList.addEventListener('itemclick', function(e)
	{
		var mainSection = e.section;
	    var item = e.section.getItemAt(e.itemIndex);
	    var name = item.properties.name;
	    
	    if (item.properties.folder > 0)
		{
	        var folder;
	        if (item.properties.folder == 2)	//'Up' folder item press.
	        {
	        	folder = parentFolders.pop();
	        }
	        else
	        {
	        	Alloy.Globals.recursePropertiesAndAlert ("Folder properties", item.properties.data);
	        	
	        	service.retrievePermissionsOfNode(item.properties.folderobject);       	
	        	
	        	Alloy.Globals.retrieveCommentsAndAlert(item.properties.folderobject);
	        	
	        	parentFolders.push(service.getCurrentFolder());     	
	        	folder = item.properties.folderobject;
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
	    else
	    {
	    	Alloy.Globals.recursePropertiesAndAlert ("Document properties", item.properties.docobject);
	    	
	    	service.retrievePermissionsOfNode(item.properties.docobject);
    	
    		Alloy.Globals.retrieveCommentsAndAlert(item.properties.docobject);
    	
	    	onDocument(item.properties.docobject);	    	
	   	}
	});
}

Alloy.Globals.recursePropertiesAndAlert = function recurseProperties (title, properties)
{
	if (Alloy.Globals.showProperties)
	{
		var alertString = title + ":\r\n\r\n";
		
		Alloy.Globals.recurseProperties(properties, "", function(name,value)
	 	{
	 		alertString += name + " = " + value + "\r\n\r\n";
	 	});
	 	
	 	alert (alertString);
	}
}

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
			
			//Filter out JS internal properties
			if (propertyName.toUpperCase().indexOf("BUBBLE") >= 0)	
				continue;
				
			var subName;
			
			if (propertiesName.length > 0)
				subName = propertiesName + "." + propertyName;
			else
				subName = propertyName;
					
			callForEachProperty(subName, propertyValue);
		}
	}
}


Alloy.Globals.retrieveCommentsAndAlert = function(docobject)
{
	if (Alloy.Globals.showProperties)
	{
		var commentService = Alloy.Globals.SDKModule.createCommentService();
		
		commentService.initWithSession(Alloy.Globals.repositorySession);
		
		commentService.retrieveCommentsForNode(docobject);
		commentService.addEventListener('commentnode', function(e)
		{
			Alloy.Globals.recursePropertiesAndAlert ("Comment", e.comment);
		});
	}
}
