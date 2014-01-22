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

var documentFolderService;
var parentFolders = new Array();
var siteService = null;


Ti.App.addEventListener('cleartabs', function()
{
	if (siteService != null)
	{
		$.mySites.deleteItemsAt(0,$.mySites.getItems().length);
		$.allSites.deleteItemsAt(0,$.allSites.getItems().length);
		$.favSites.deleteItemsAt(0,$.favSites.getItems().length);
		$.repo.deleteItemsAt(0,$.repo.getItems().length);
	}
});


Ti.App.addEventListener('sitespopulate',function()
{
	if (Alloy.Globals.AlfrescoSDKVersion >= 1.0)
	{
		if (Alloy.Globals.repositorySession != null)
		{
			if (siteService == null)
			{
				siteService = Alloy.Globals.SDKModule.createSiteService();
				siteService.addEventListener('error', function(e) { alert(e.errorstring); });
				siteService.initialiseWithSession(Alloy.Globals.repositorySession);
				
				Alloy.Globals.sitesModelListener(siteService, $.mySites, 'mysitesnode');
				Alloy.Globals.sitesModelListener(siteService, $.allSites, 'allsitesnode');
				Alloy.Globals.sitesModelListener(siteService, $.favSites, 'favsitesnode');
				
				documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
				documentFolderService.addEventListener('error', function(e) { alert(e.errorstring); });
				documentFolderService.initialiseWithSession(Alloy.Globals.repositorySession);
				Alloy.Globals.modelListeners(documentFolderService, $.repo);
				 
				siteService.addEventListener('siteupdated', function(e)
				{
					$.mySites.deleteItemsAt(0,$.mySites.getItems().length);
					$.allSites.deleteItemsAt(0,$.allSites.getItems().length);
					$.favSites.deleteItemsAt(0,$.favSites.getItems().length);
					$.repo.deleteItemsAt(0,$.repo.getItems().length);		
								
					siteService.retrieveSites();
					siteService.retrieveAllSites();
					siteService.retrieveFavoriteSites();
				});
						
				$.siteList.addEventListener('itemclick', function(e)
				{
		  			var item = e.section.getItemAt(e.itemIndex);
					var name = item.properties.name;
					var site = item.properties.siteObject;
				    var ops =  {  cancel: 3,
								  options: ['View site', 
								  			(site.isFavorite ? 'Unfavourite' : 'Favourite') + ' site',
											(site.isMember ? 'Leave' : 'Join') + ' site', 
											'Cancel'],
								  selectedIndex: 0,
								  destructive: 0,
								  title: 'Site Actions'
								};
								
					Alloy.Globals.currentNode = item.properties.data;
					
				    var dlg = Ti.UI.createOptionDialog(ops);
				    
				  	dlg.addEventListener('click', function(ev)
				  	{
				  		if (ev.index == 0)
				  		{							
							Alloy.Globals.nodeJustProperties = true;
				    		
							siteService.retrieveDocumentLibraryFolderForSite(name);
						}
						else
						if (ev.index == 1)
					    {
					    	if (site.isFavorite)
					    	{
					    		siteService.removeFavoriteSite(site);
					    	}
					    	else
					    	{
					    		siteService.addFavoriteSite(site);
					    	}
						}
						else
						if (ev.index == 2)
					    {
					    	if (site.isMember)
					    	{
					    		siteService.leaveSite(site);
					    	}
					    	else
					    	{
					    		siteService.joinSite(site);
					    	}
					    }
					});
				  
					dlg.show();
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
			
			
			$.mySites.deleteItemsAt(0,$.mySites.getItems().length);
			$.allSites.deleteItemsAt(0,$.allSites.getItems().length);
			$.favSites.deleteItemsAt(0,$.favSites.getItems().length);
			$.repo.deleteItemsAt(0,$.repo.getItems().length);		
						
			siteService.retrieveSites();
			siteService.retrieveAllSites();
			siteService.retrieveFavoriteSites();
		}
	}
}); 
