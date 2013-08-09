var mainSection = $.mainSection;
var documentFolderService;
var parentFolders = new Array();

Ti.App.addEventListener('populate', function()
									{
										if (Alloy.Globals.repositorySession != null)
										{
											parentFolders = new Array();
											mainSection.deleteItemsAt(0, mainSection.getItems().length);
											 
											addClickListener();	
											
											getFolder(Alloy.Globals.repositorySession);
										}			
									});
										
	
	
function addClickListener()
{
	$.folderList.addEventListener('itemclick', function(e)
	{
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
	        	parentFolders.push(documentFolderService.getCurrentFolder());     	
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
		  	 	 	
		  	$.folderLabel.text = " " + folder.getFolderName();
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


function getFolder(repoSesh)
{
	documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();	
	documentFolderService.initWithSession(repoSesh);
	documentFolderService.retrieveRootFolder();

	documentFolderService.addEventListener('retrievedfolder',function(e)
	{
		$.folderLabel.text = " " + documentFolderService.getCurrentFolder().getFolderName();
		
		documentFolderService.retrieveChildrenInFolder();
		
		Alloy.Globals.createServiceListeners(documentFolderService, mainSection);
	});	
}

