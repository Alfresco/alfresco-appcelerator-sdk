Ti.App.addEventListener('populate',
						function()
						{
							if (Alloy.Globals.AlfrescoSDKVersion < 1.0)
							{
								$.info.text = "Not available in this SDK version";
							}
							else
							{
								if (Alloy.Globals.repositorySession != null)
								{
									
								}
							}
						});

