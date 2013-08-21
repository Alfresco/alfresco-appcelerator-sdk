var activityService;

Ti.App.addEventListener('cleartabs', function()
{
	$.activities.deleteItemsAt(0,$.activities.getItems().length);
	$.properties.deleteItemsAt(0,$.properties.getItems().length);
});


Ti.App.addEventListener('activitiespopulate',function()
{
	if (Alloy.Globals.AlfrescoSDKVersion >= 1.0)
	{
		if (Alloy.Globals.repositorySession != null  &&  $.activities.getItems().length == 0)
		{
			var activityService = Alloy.Globals.SDKModule.createActivityService();
			activityService.initWithSession(Alloy.Globals.repositorySession);
			
			activityService.retrieveActivityStream();
			Alloy.Globals.activitiesModelListener(activityService, $.activities, 'activitynode');
						 
			$.activityList.addEventListener('itemclick', function(e)
			{
				var item = e.section.getItemAt(e.itemIndex);
				var mainDataSet = [];
				
				$.properties.deleteItemsAt(0,$.properties.getItems().length);
				
		  	 	var data = {info: {text: "data.title:"}, es_info: {text: item.properties.title}, pic: {image: 'default_entry_icon.png'}};		
		  	 	mainDataSet.push(data);

				data = {info: {text: "siteShortName:"}, es_info: {text: item.properties.siteShortName}, pic: {image: 'default_entry_icon.png'}};		
		  	 	mainDataSet.push(data);
		  	 
		  	 	data = {info: {text: "createdAt:"}, es_info: {text: item.properties.createdAt}, pic: {image: 'default_entry_icon.png'}};
		  	 	mainDataSet.push(data);
		  	 	
		  	 	data = {info: {text: "createdBy:"}, es_info: {text: item.properties.createdBy}, pic: {image: 'default_entry_icon.png'}};
		  	 	mainDataSet.push(data);
		  	 	
		  	 	data = {info: {text: "type:"}, es_info: {text: item.properties.type}, pic: {image: 'default_entry_icon.png'}};
		  	 	mainDataSet.push(data);
		  	 	
		  	 	data = {info: {text: "identifier:"}, es_info: {text: item.properties.identifier}, pic: {image: 'default_entry_icon.png'}};
		  	 	mainDataSet.push(data);
		  	 	
		  	 	$.properties.appendItems(mainDataSet);
			});
		}
	}
}); 
