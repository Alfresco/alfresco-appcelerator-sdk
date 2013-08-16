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
  	 	Ti.API.info("DOCUMENT: name = " + e.name + ", title = " + e.title + ", summary = " + e.summary + ", MIME type = " + e.contentMimeType);	
  	 	
  	 	var icon = "mime_txt.png";
  	 	if (e.contentMimeType.indexOf("text/") !== -1)
  	 	{
  	 		if (e.contentMimeType.indexOf("/plain") !== -1)
  	 			icon = "mime_txt.png";
  	 		else
  	 			icon = "mime_doc.png";
  	 	}
  	 	else	
  	 	if (e.contentMimeType.indexOf("application/") !== -1)
  	 	{
  	 		if (e.contentMimeType.indexOf("/msword") !== -1  || 
  	 			e.contentMimeType.indexOf("/vnd.openxmlformats-officedocument.wordprocessingml") !== -1)
  	 		{
  	 			icon = "mime_doc.png";
  	 		}
  	 		else
  	 		if (e.contentMimeType.indexOf("/vnd.openxmlformats-officedocument.spreadsheetml") !== -1)
  	 		{
  	 			//Spreadsheet
  	 		}
  	 	}
  	 	else
  	 	if (e.contentMimeType.indexOf("image/") !== -1)
  	 		icon="mime_img.png";
  	 		
  	 	var modified = new String + e.modifiedAt;
  	 	modified = modified.substr(0,21);
  	 	
  	 	var mainDataSet = [];
  	 	var data = {info: {text: e.name}, es_info: {text: modified}, pic: {image: icon},  properties: {folder: 0, name: e.name, docobject: e.document} };	 	  	 		
  	 	mainDataSet.push(data);
  	 	mainSection.appendItems(mainDataSet);	
  	});
  	
  	service.addEventListener('foldernode',function(e)
  	{
  		var folder = e.folder;
  		var folderName = folder.getFolderName();
  		
  	 	Ti.API.info("FOLDER: name = " + e.name + ", title = " + e.title + ", summary = " + e.summary + ". Folder name from object: "+ folderName);
  	 	
  	 	var modified = new String + e.modifiedAt;
  	 	modified = modified.substr(0,21);
  	 	
  	 	var mainDataSet = [];
  	 	var data = {info: {text: e.name}, es_info: {text: modified}, pic: {image: 'folder@2x.png'},  properties: {folder: 1, name: e.name, folderobject: e.folder} };
        		
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
  	 	Ti.API.info(sitetype.toUpperCase() + ": name = " + e.shortName + ", title = " + e.title + ", summary = " + e.summary);
  	 	
  	 	var mainDataSet = [];
  	 	var data = {info: {text: e.shortName}, es_info: {text: e.title}, pic: {image: 'folder@2x.png'},  properties: {folder: 1, name: e.shortName, folderobject: null} };
        		
  	 	mainDataSet.push(data);
  	 	section.appendItems(mainDataSet);
	});
}


Alloy.Globals.controllerNavigation = function(view, service, parentFolders, onFolder, onDocument)
{
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
		  	 	 	
		  	view.folderLabel.text = " " + folder.getFolderName();
		  	
		  	onFolder(folder);
	    }    
	    else
	    {
	    	onDocument(item.properties.docobject);	    	
	   	}
	});
}

