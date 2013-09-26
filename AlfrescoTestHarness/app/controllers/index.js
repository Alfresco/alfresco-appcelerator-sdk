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

Alloy.Globals.AlfrescoSDKVersion=1.0;	//Restricts functionality to this SDK version.
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
 		Ti.App.fireEvent('sitespopulate');
 	if (e.index == 3)
 		Ti.App.fireEvent('activitiespopulate');
 	if (e.index == 4)
 		Ti.App.fireEvent('searchinit');
 	else
 	if (e.index == 5)
 		Ti.App.fireEvent('propspopulate');
});

