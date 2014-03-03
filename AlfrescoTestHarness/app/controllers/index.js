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
 * 
 * This app uses the free icon set 'IconBeast', available at www.iconbeast.com
 *****************************************************************************
 */

Alloy.Globals.AlfrescoSDKVersion=1.2;	//Restricts functionality to this SDK version.
Alloy.Globals.SDKModule = require('com.alfresco.appcelerator.module.sdk');
Alloy.Globals.tabGroup = $.index;
Alloy.Globals.currentNode = null;
Alloy.Globals.nodeJustProperties = false;

$.index.open();

$.index.addEventListener('focus',function(e)
{
	if (e.index == 1)
 		Ti.App.fireEvent('repopopulate');
	else
    if (e.index == 2)
 		Ti.App.fireEvent('workflowpopulate');
	else
 	if (e.index == 3)
 		Ti.App.fireEvent('sitespopulate');
	else
 	if (e.index == 4)
 		Ti.App.fireEvent('activitiespopulate');
	else
 	if (e.index == 5)
 		Ti.App.fireEvent('searchinit');
	else
 	if (e.index == 6)
 		Ti.App.fireEvent('personsearchinit');
	else
 	if (e.index == 7)
 		Ti.App.fireEvent('propspopulate');
});



var style;

if (Ti.Platform.name === 'iPhone OS')
{
	Alloy.Globals.activityIndicator = Ti.UI.createWindow({fullscreen:'true', width:Ti.UI.FILL, height:Ti.UI.FILL, backgroundColor:'white', navBarHidden:'true'});
	style = Ti.UI.iPhone.ActivityIndicatorStyle.LIGHT;
}
else
{
	Alloy.Globals.activityIndicator = Ti.UI.createWindow({fullscreen:'false', width:Ti.UI.FILL, height:Ti.UI.FILL, backgroundColor:'white', navBarHidden:'true'});
	style = Ti.UI.ActivityIndicatorStyle.PLAIN;
}
	
var indicator = Ti.UI.createActivityIndicator({
  color: 'white',
  backgroundColor:'black',
  font: {fontFamily:'Helvetica Neue', fontSize:24, fontWeight:'bold'},
  message: 'Loading...',
  style:style,
  height:'25%',
  width:'75%'
});

indicator.show();
Alloy.Globals.activityIndicator.add (indicator);
Alloy.Globals.activityIndicator.opacity=0.8;

		
Alloy.Globals.showSpinner = function(show)
{
	if (show)
		Alloy.Globals.activityIndicator.open();
	else
		Alloy.Globals.activityIndicator.close();
};
