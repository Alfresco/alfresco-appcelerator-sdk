Ti.App.addEventListener('populate',
						function()
						{
							if (Alloy.Globals.AlfrescoSDKVersion < 1.0)
							{
								$.info.text = "Not available in this SDK version";
							}
							else
							{
								$.info.text = "Loaded";
								
								if (Alloy.Globals.repositorySession != null)
								{
									var siteService = Alloy.Globals.SDKModule.createSiteService();
									siteService.initWithSession(Alloy.Globals.repositorySession);
									
									siteService.retrieveSites();
									Alloy.Globals.modelListeners(siteService, $.mysites);
									
									siteService.retrieveAllSites();
									Alloy.Globals.modelListeners(siteService, $.allsites);
									
									siteService.retrieveFavoriteSites();
									Alloy.Globals.modelListeners(siteService, $.favsites);
								}
							}
						}); 

