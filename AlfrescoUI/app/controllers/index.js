$.index.open();

var iOSSDKModule = require('com.alfresco.appcelerator.module.ios.sdk');	
var mainSection;
var documentFolderService;
var parentFolders = new Array();

//Create a ListView ready for nodes.
createNodeList();

//Connect to repo and fill the Node List with nodes from the root of the repository
connect();


function createNodeList()
{
	// Create a custom template that displays an image on the left, 
	// then a title next to it with a subtitle below it.
	var myTemplate = {
	    childTemplates: [
	        {                            // Image justified left
	            type: 'Ti.UI.ImageView', // Use an image view for the image
	            bindId: 'pic',           // Maps to a custom pic property of the item data
	            properties: {            // Sets the image view  properties
	                width: '35dp', height: '35dp', left: 5
	            }
	        },
	        {                            // Title 
	            type: 'Ti.UI.Label',     // Use a label for the title 
	            bindId: 'info',          // Maps to a custom info property of the item data
	            properties: {            // Sets the label properties
	                color: 'black',
	                font: { fontFamily:'Arial', fontSize: '18dp', fontWeight:'bold' },
	                left: '60dp', top: 0,
	            }
	        },
	        {                            // Subtitle
	            type: 'Ti.UI.Label',     // Use a label for the subtitle
	            bindId: 'es_info',       // Maps to a custom es_info property of the item data
	            properties: {            // Sets the label properties
	                color: 'gray',
	                font: { fontFamily:'Arial', fontSize: '11dp' },
	                left: '60dp', top: '25dp'
	            }
	        }
	    ]
	};
		
	var leftpane = Ti.UI.createListView( {templates: { 'template': myTemplate }, defaultItemTemplate: 'template'} );	
	
	mainSection = Ti.UI.createListSection({ headerTitle: 'Repository'});
	
	var sections = [];
	sections.push(mainSection);
	leftpane.sections = sections;
	
	$.index.add(leftpane);
	
	leftpane.addEventListener('itemclick', function(e)
	{
	    var item = e.section.getItemAt(e.itemIndex);
	    var name = item.properties.name;
	    
	    if (item.properties.folder > 0)
		{
	        //alert("Folder clicked: " + name);
	        
	        var folder;
	        if (item.properties.folder == 2)	//'Up' folder item press.
	        {
	        	folder = parentFolders.pop();
	        }
	        else
	        {
	        	parentFolders.push(documentFolderService.getCurrentFolder());     	
	        	folder = item.properties.folderobject;
	        }        
	        
	        Ti.API.info("Folder name from object: " + folder.getFolderName());
	        
	        //Empty list, and add 'Back' item if we're not at root folder.
	        mainSection.deleteItemsAt(0,mainSection.getItems().length);	  
	        if (parentFolders.length > 0)
	        {      
		        var mainDataSet = [];
		  	 	var data = {info: {text: "Back"}, es_info: {text: "Previous folder"}, pic: {image: 'wm_back.png'},  properties: {folder: 2, name: null, folderobject: null} };		
		  	 	mainDataSet.push(data);
		  	 	mainSection.appendItems(mainDataSet);
		  	}
		  	 	 	
	        documentFolderService.setFolder(folder);
	        documentFolderService.retrieveChildrenInFolder();	//Events will be fired for 'foldernode's and 'documentnode's.
	    }    
	    else
	    {
	    	var docobject = item.properties.docobject;
	    	
	    	documentFolderService.saveDocument (docobject);		//Event will be fired when 'retrieveddocument'	    	
	   	}
	});
}


function connect()
{
	var repositorySession = iOSSDKModule.createRepositorySession({
																	serverUrl: "http://localhost:8080/alfresco",
																	serverUsername: "admin",
																	serverPassword: "password",
																});
	repositorySession.connect();
	
	repositorySession.addEventListener('paramerror',function(e)
	{
	  	Ti.API.info("Param error code: " + e.errorcode);
	});
	
	repositorySession.addEventListener('error',function(e)
	{
	  	alert("Cannot connect to server, error code: " + e.errorcode);
	});
	
	repositorySession.addEventListener('success',function(e)
	{
	  	Ti.API.info("Connected to server: " + e.servername);
	  	
		getFolder(repositorySession);
	});    
}


function getFolder(repoSesh)
{
	documentFolderService = iOSSDKModule.createDocumentFolderService();
	
	documentFolderService.initWithSession(repoSesh);

	documentFolderService.retrieveRootFolder();

	documentFolderService.addEventListener('retrievedfolder',function(e)
	{
		//alert ("Folder is " + e.folder);
		
		documentFolderService.retrieveChildrenInFolder();
	
	  	documentFolderService.addEventListener('documentnode',function(e)
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
	  	
	  	documentFolderService.addEventListener('foldernode',function(e)
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
	  	  	
	  	documentFolderService.addEventListener('retrieveddocument',function(e)
		{
			var file = e.document;
			
			var readContents;
			var readFile = Titanium.Filesystem.getFile(file.path);        
			 
			if (readFile.exists())
			{
			     readContents = readFile.read();
			     Ti.API.info('File Exists');  
			}
			 
			var doc = readContents.text;
			alert (doc);
   		});
   		
   		documentFolderService.addEventListener('progresseddocument',function(e)
		{
			var bytes = e.bytes;
			var total = e.total;
   		});
}); 
}
