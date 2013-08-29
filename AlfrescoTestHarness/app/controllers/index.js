Alloy.Globals.AlfrescoSDKVersion=1.0;	//Restricts functionality to this SDK version.
Alloy.Globals.SDKModule = require('com.alfresco.appcelerator.module.sdk');
Alloy.Globals.tabGroup = $.index;

$.index.open();

$.index.addEventListener('focus',function(e)
{
	if (e.index == 1)
 		Ti.App.fireEvent('repopopulate');
 	else
    if (e.index == 2)
 		Ti.App.fireEvent('sitespopulate');
 	if (e.index == 3)
 		Ti.App.fireEvent('activitiespopulate');
 	if (e.index == 4)
 		Ti.App.fireEvent('searchinit');
});

