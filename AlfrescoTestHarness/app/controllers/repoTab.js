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
	if (Alloy.Globals.repositorySession != null  &&  $.mainSection.getItems().length == 0)
	{ 
		documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
		
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
});
										

function getFolder(repoSesh)
{	
	documentFolderService.initWithSession(repoSesh);
	documentFolderService.retrieveRootFolder();

	documentFolderService.addEventListener('retrievedfolder',function(e)
	{
		$.folderLabel.text = " " + documentFolderService.getCurrentFolder().getName();
		
		documentFolderService.retrieveChildrenInFolder();
		
		Alloy.Globals.modelListeners(documentFolderService, mainSection);
	});	
}
