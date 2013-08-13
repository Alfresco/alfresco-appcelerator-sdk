var mainSection = $.mainSection;
var documentFolderService;
var parentFolders = new Array();
 
Ti.App.addEventListener('populate', function()
									{
										if (Alloy.Globals.repositorySession != null)
										{ 
											parentFolders = new Array();
											mainSection.deleteItemsAt(0, mainSection.getItems().length);
											
											documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
											
											//Set up the list's on-click functionality. 
											Alloy.Globals.controllerNavigation($, documentFolderService, parentFolders,
																				function(folder)
																				{
																					documentFolderService.setFolder(folder);
																			        documentFolderService.retrieveChildrenInFolder();
																			        //Will result in an event fired to re-populate.
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
		$.folderLabel.text = " " + documentFolderService.getCurrentFolder().getFolderName();
		
		documentFolderService.retrieveChildrenInFolder();
		
		Alloy.Globals.modelListeners(documentFolderService, mainSection);
	});	
}
