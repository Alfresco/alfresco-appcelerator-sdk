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

//---------------------------------------------------------------------------------------------------------------------------------
//This provides convenient defaults while testing.
//---------------------------------------------------------------------------------------------------------------------------------
if (Titanium.Platform.model == 'google_sdk' ||  Titanium.Platform.model == 'Simulator')  
	$.serverEdit.value = "http://localhost:8080/alfresco";		//Running on Simulator/Emulator. Assume local server on the PC/Mac.
else
	$.serverEdit.value = "http://192.168.1.91:8080/alfresco";	//Running on-device. NOTE: Change to your servers IP address!	
																//Examples:
																//  https://ts.alfresco.com/alfresco
																//  http://192.168.1.91:8080/alfresco
//---------------------------------------------------------------------------------------------------------------------------------


function loginButtonClick()
{
	var svr = $.serverEdit.value;
	var user = $.usernameEdit.value;
	var pwd = $.passwordEdit.value;
	
	if (svr.length == 0 || user.length == 0)
	{
		alert("Please enter values for all fields");
	}
	else
	{
		//Connect to repo and fire event to 'populate' the list.
		connect(svr, user, pwd);
	}
}

function propsButtonChange(e)
{
	Alloy.Globals.showProperties = $.propsButton.value;
}

function connect(serverUrl, serverUsername, serverPassword)
{
	var repositorySession = Alloy.Globals.SDKModule.createRepositorySession({serverUrl: serverUrl, serverUsername: serverUsername, serverPassword: serverPassword});
	
	repositorySession.connect();
	
	repositorySession.addEventListener('error',function(e)
	{
	  	alert("Cannot connect to server (" + e.errorcode + "): " + e.errorstring);
	  	return 0;
	});
	
	repositorySession.addEventListener('success',function(e)
	{
		Alloy.Globals.repositorySession = repositorySession;
		
	  	Ti.API.info("Connected to server: " + e.servername);
	  	
	  	//Ti.App.fireEvent('cleartabs');
	  	
		//Switch to repo tab
		Alloy.Globals.tabGroup.setActiveTab(1);
		
		$.loginButton.enabled = false;
		
		return 1;
	});    
}

