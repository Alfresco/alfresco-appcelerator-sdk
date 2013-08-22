var documentFolderService;
var parentFolders = new Array();


Ti.App.addEventListener('cleartabs', function()
{
	$.mySites.deleteItemsAt(0,$.mySites.getItems().length);
	$.allSites.deleteItemsAt(0,$.allSites.getItems().length);
	$.favSites.deleteItemsAt(0,$.favSites.getItems().length);
	$.repo.deleteItemsAt(0,$.repo.getItems().length);
});


Ti.App.addEventListener('sitespopulate',function()
{
	if (Alloy.Globals.AlfrescoSDKVersion >= 1.0)
	{
		if (Alloy.Globals.repositorySession != null  &&  $.allSites.getItems().length == 0)
		{
			var siteService = Alloy.Globals.SDKModule.createSiteService();
			siteService.initWithSession(Alloy.Globals.repositorySession);
			
			siteService.retrieveSites();
			Alloy.Globals.sitesModelListener(siteService, $.mySites, 'mysitesnode');
			
			siteService.retrieveAllSites();
			Alloy.Globals.sitesModelListener(siteService, $.allSites, 'allsitesnode');
			
			siteService.retrieveFavoriteSites();
			Alloy.Globals.sitesModelListener(siteService, $.favSites, 'favsitesnode');
			
			documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
			documentFolderService.initWithSession(Alloy.Globals.repositorySession);
			Alloy.Globals.modelListeners(documentFolderService, $.repo);
			 
			$.siteList.addEventListener('itemclick', function(e)
			{
				var item = e.section.getItemAt(e.itemIndex);
				var name = item.properties.name;
				
				Alloy.Globals.recursePropertiesAndAlert (item.properties.data);
				
			    siteService.retrieveDocumentLibraryFolderForSite(name);
			});
			
			siteService.addEventListener('retrievedDocumentFolder', function(e)
		    {
		    	$.repo.deleteItemsAt(0,$.repo.getItems().length);
		    	
				documentFolderService.setFolder(e.folder);
				documentFolderService.retrieveChildrenInFolder();
		    });
		    
		    //Set up the repo list's on-click functionality. 
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
		}
	}
}); 
