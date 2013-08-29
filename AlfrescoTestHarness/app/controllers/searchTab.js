var mainSection = $.mainSection;
var documentFolderService;
var searchService;
var listingContext;
var parentFolders = new Array();
var skipCount = 0;

Ti.App.addEventListener('searchinit',function()
{
	if (Alloy.Globals.repositorySession != null)
	{ 
		documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
		documentFolderService.initWithSession(Alloy.Globals.repositorySession);
	
		searchService = Alloy.Globals.SDKModule.createSearchService();
		searchService.initWithSession(Alloy.Globals.repositorySession);
		
		listingContext = Alloy.Globals.SDKModule.createListingContext();
	}
});


Ti.App.addEventListener('cleartabs', function()
{
	parentFolders = new Array();
	mainSection.deleteItemsAt(0, mainSection.getItems().length);
});


function searchButtonClick()
{
	listingContext.initWithMaxItemsAndSkipCount(5, skipCount);
	//skipCount += 5;
	
	var searchTerm = "SELECT * FROM cmis:document WHERE cmis:name LIKE '%" + $.searchEdit.value + "%'";

	parentFolders = new Array();
	mainSection.deleteItemsAt(0, mainSection.getItems().length);
		
	if (Alloy.Globals.repositorySession != null)
	{ 
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

		Alloy.Globals.modelListeners(searchService, mainSection);
				
		searchService.searchWithStatementAndListingContext(searchTerm, listingContext);
	}			
}					
