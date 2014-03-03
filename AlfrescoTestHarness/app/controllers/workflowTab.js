/*
 ******************************************************************************
 * Copyright (C) 2005-2014 Alfresco Software Limited.
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
var workflowService = null;
var enums = 3;
var workflowMembers = "";
var lc1;
var lc2;

Ti.App.addEventListener('cleartabs', function()
{
	if (workflowService != null)
	{
		$.tasks.deleteItemsAt(0,$.tasks.getItems().length);
		$.processes.deleteItemsAt(0,$.processes.getItems().length);
		$.processDefinitions.deleteItemsAt(0,$.processDefinitions.getItems().length);
		$.repo.deleteItemsAt(0,$.repo.getItems().length);
	}
});


Ti.App.addEventListener('workflowpopulate',function()
{
	if (Alloy.Globals.AlfrescoSDKVersion >= 1.2)
	{
		if (Alloy.Globals.repositorySession != null)
		{
			if (workflowService == null)
			{
				workflowService = Alloy.Globals.SDKModule.createWorkflowService();
				workflowService.addEventListener('error', function(e) { alert(e.errorstring); });
				workflowService.initialiseWithSession(Alloy.Globals.repositorySession);
				
				documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
				documentFolderService.addEventListener('error', function(e) { alert(e.errorstring); });
				documentFolderService.initialiseWithSession(Alloy.Globals.repositorySession);
				
				Alloy.Globals.modelListeners (workflowService, $.repo);
				
				lc1 = Alloy.Globals.SDKModule.createListingContext();
				lc1.initialiseWithMaxItemsAndSkipCount(20, 0);
				lc2 = Alloy.Globals.SDKModule.createListingContext();
				lc2.initialiseWithMaxItemsAndSkipCount(20, 0);
				
				workflowService.addEventListener('tasknode', function(e)
				{
					var task = e.task;
					var taskDataSet = [];
		  	 		taskDataSet.push({info: {text: task.name}, es_info: {text: task.startedAt}, pic: {image: "mime_txt.png"}, data: task});
			  	 	$.tasks.appendItems(taskDataSet);
				});
				
				workflowService.addEventListener('processnode', function(e)
				{
					var process = e.process;
					var dataSet = [];
		  	 		dataSet.push({info: {text: process.identifier}, es_info: {text: process.startedAt}, pic: {image: "mime_txt.png"}, data: process});
			  	 	$.processes.appendItems(dataSet);
				});
				
				workflowService.addEventListener('processdefinitionnode', function(e)
				{
					var processdef = e.processdefinition;
					var dataSet = [];
		  	 		dataSet.push({info: {text: processdef.identifier}, es_info: {text: "Version " + processdef.version}, pic: {image: "mime_txt.png"}, data: processdef});
			  	 	$.processDefinitions.appendItems(dataSet);
				});
				
				workflowService.addEventListener('endenumeration',function(e)
				{
					--enums;
					
					if (enums <= 0)
						Alloy.Globals.showSpinner(false);
				});
				
				$.folderList.addEventListener('itemclick', function(e)
				{
					Alloy.Globals.nodeJustProperties = false;			
					Alloy.Globals.currentNode = e.docobject;
						
					alert("Go to the Properties tab to see this objects full properties.");
				});
				
				$.workflowList.addEventListener('itemclick', function(e)
				{
					if (e.section == $.processes || e.section == $.processDefinitions)
					{
						alert("Go to the Properties tab to see this objects full properties.");
					}
					else
					{
			  			var task = e.section.getItemAt(e.itemIndex).data;
						
						Alloy.Globals.nodeJustProperties = true;			
						Alloy.Globals.currentNode = task;
						
						var ops =	{	cancel: 1,
								  		options: ['View attachments', 'Cancel'],
								  		selectedIndex: 0,
								  		destructive: 0,
								  		title: 'Task Actions'
									};
					    var dlg = Ti.UI.createOptionDialog(ops);
					    
					  	dlg.addEventListener('click', function(ev)
					  	{
					  		if (ev.index == 0)
					  		{
					  			enums = 1;
					  			Alloy.Globals.showSpinner(true);
					  			$.repo.deleteItemsAt(0,$.repo.getItems().length);
					  			workflowService.retrieveAttachmentsForTask(task);
							}
						});
					  
						dlg.show();
					}
				});
			}	
				
			$.tasks.deleteItemsAt(0,$.tasks.getItems().length);
			$.processes.deleteItemsAt(0,$.processes.getItems().length);
			$.processDefinitions.deleteItemsAt(0,$.processDefinitions.getItems().length);
			$.repo.deleteItemsAt(0,$.repo.getItems().length);		
				
			Alloy.Globals.showSpinner(true);
			enums = 3;
			workflowService.retrieveAllTasks();
			workflowService.retrieveProcessesWithListingContext(lc1);
			workflowService.retrieveProcessDefinitionsWithListingContext(lc2);
		}
	}
}); 
