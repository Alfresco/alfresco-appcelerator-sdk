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

var activityService = null;

Ti.App.addEventListener('cleartabs', function()
{
	if (activityService != null)
		$.activities.deleteItemsAt(0,$.activities.getItems().length);
});


Ti.App.addEventListener('activitiespopulate',function()
{	
	if (Alloy.Globals.AlfrescoSDKVersion >= 1.0)
	{
		if (Alloy.Globals.repositorySession != null)
		{
			if (activityService == null)
			{
				activityService = Alloy.Globals.SDKModule.createActivityService();
				activityService.addEventListener('error', function(e) { alert(e.errorstring); });
			
				activityService.initialiseWithSession(Alloy.Globals.repositorySession);
				
				Alloy.Globals.activitiesModelListener(activityService, $.activities);
				
				$.activityList.addEventListener('itemclick', function(e)
				{
					var item = e.section.getItemAt(e.itemIndex);
					
					Alloy.Globals.currentNode = item.properties;
		    		Alloy.Globals.nodeJustProperties = true;
				});
			}
						
			activityService.retrieveActivityStream();
		}
	}
}); 


