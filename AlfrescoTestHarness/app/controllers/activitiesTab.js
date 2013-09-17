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
			
			var personService = Alloy.Globals.SDKModule.createPersonService();		 
			personService.initWithSession(Alloy.Globals.repositorySession);		
					
			$.activityList.addEventListener('itemclick', function(e)
			{
				var item = e.section.getItemAt(e.itemIndex);
				var mainDataSet = [];
				var activityCreatorIndex;
				
				$.properties.deleteItemsAt(0,$.properties.getItems().length);			
				activityCreatorImage = "";	
								
				personService.addEventListener('personnode', personnodeFunc = function(e)
				{
					var person = e.person;
					Ti.API.info("Person: " + person.fullName);
					
					personService.retrieveAvatarForPerson(person);
					personService.addEventListener('retrievedavatar', retrievedavatarFunc = function(e)
					{
						var contentFile = e.contentfile;			
						Ti.API.info("Image: " + contentFile.getPath());
						
						var item = $.properties.getItemAt(activityCreatorIndex);
						item.pic.image = contentFile.getPath();
						$.properties.updateItemAt(activityCreatorIndex, item); 
						
						personService.removeEventListener('personnode', personnodeFunc);
						personService.removeEventListener('retrievedavatar', retrievedavatarFunc);
			 		});
				});			
				
				Alloy.Globals.recurseProperties (item.properties, "", function(name,value)
		  	 	{
		  	 		data = {info: {text: name + ":"}, es_info: {text: value}, pic: {image: "default_entry_icon.png"}};
		  	 		mainDataSet.push(data);
		  	 		
		  	 		if (name=='createdBy')
		  	 		{
		  	 			Ti.API.info("Person id: " + value);	  	 			
		  	 			personService.retrievePersonWithIdentifier(value);
		  	 			activityCreatorIndex = mainDataSet.length;
		  	 		}
				});
	 		
		  	 	$.properties.appendItems(mainDataSet);
			});
		}
	}
}); 


