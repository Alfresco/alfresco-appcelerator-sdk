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
			Alloy.Globals.activitiesModelListener(activityService, $.activities);
						 
			$.activityList.addEventListener('itemclick', function(e)
			{
				var item = e.section.getItemAt(e.itemIndex);
				var mainDataSet = [];
				
				$.properties.deleteItemsAt(0,$.properties.getItems().length);
		  	 	
		  	 	Alloy.Globals.recurseProperties (item.properties, "", function(name,value)
		  	 	{
				   	data = {info: {text: name + ":"}, es_info: {text: value}, pic: {image: 'default_entry_icon.png'}};
		  	 		mainDataSet.push(data);
				});
		  	 	
		  	 	$.properties.appendItems(mainDataSet);
			});
		}
	}
}); 


