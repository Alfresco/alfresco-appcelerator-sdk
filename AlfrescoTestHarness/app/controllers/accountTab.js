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

var clientID;


if (Ti.Platform.osname == 'android')
{
	//All this just to hide the keyboard initially...
	
	$.serverEdit.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
	$.serverEdit.addEventListener('click',function(e)
    {
        $.serverEdit.setSoftKeyboardOnFocus(Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS);
        $.serverEdit.focus();
    });
    
    $.usernameEdit.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
    $.usernameEdit.addEventListener('click',function(e)
    {
        $.usernameEdit.setSoftKeyboardOnFocus(Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS);
        $.usernameEdit.focus();
    });
    
    $.passwordEdit.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
    $.passwordEdit.addEventListener('click',function(e)
    {
        $.passwordEdit.setSoftKeyboardOnFocus(Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS);
        $.passwordEdit.focus();
    });
}
	
					
function cloudButtonClick()
{
	var OAuthData = Alloy.Globals.SDKModule.createOAuthData();
	var cloudSession = Alloy.Globals.SDKModule.createCloudSession();			
	
	var APIKey = "l7xx56bf489ed0b744978d6fcb4fafa5f067";
	var secretKey = "d0ef714383064042a36277dc238746ee" ;
	var authURL = "https://api.alfresco.com/auth/oauth/versions/2/authorize?client_id=" + APIKey + 
					"&redirect_uri=http://www.alfresco.com/mobile-auth-callback.html&scope=pub_api&response_type=code";
	var networks=[];
	var code; 

	cloudSession.addEventListener('success',function(e)
	{
		Alloy.Globals.showSpinner(false);
		
		Alloy.Globals.repositorySession = cloudSession;
		
		Ti.API.info("Connected to server: " + e.servername);
	  	
		//Switch to repo tab
		Alloy.Globals.tabGroup.setActiveTab(1);
		
		$.loginButton.visible = false;
		$.cloudButton.enabled = false;
		$.cloudButton.title = "(Logged in)";
		return 1;
	}); 
	cloudSession.addEventListener('error',function(e)
	{
		Alloy.Globals.showSpinner(false);
		
		if (e.errorcode == 104)	//Login failed, access token expired.
		{
			//POST a fresh request.
			postRequest(false);
		}	
		else
		{
			alert("Cannot connect to server (" + e.errorcode + "): " + e.errorstring);
		  	
		  	$.loginButton.enabled = true;
		  	$.loginButton.visible = true;
			$.cloudButton.enabled = true;
			$.cloudButton.title = "Cloud account...";
		}
	  	return 0;
	});
	cloudSession.addEventListener('retrievednetwork', function(e)
	{
		 networks.push(e.networkid);
	});
	cloudSession.addEventListener('endenumeration', function(e)
	{
		networks.push('Cancel');
		
		var cancelIdx = networks.length-1;
		var ops =	{	cancel: cancelIdx,
				  		options: networks,
				  		selectedIndex: 0,
				  		destructive: 0,
				  		title: 'Available Networks'
					};
	    var dlg = Ti.UI.createOptionDialog(ops);
	    
	  	dlg.addEventListener('click', function(ev)
	  	{
	  		if (ev.index < cancelIdx)
	  		{
		  		Ti.App.Properties.setString('NetworkID', networks[ev.index]);
		  		cloudSession.connectWithNetworkID(networks[ev.index]);
		  	}
		  	else
		  	{
		  		Alloy.Globals.showSpinner(false);
		  		
		  		Ti.App.Properties.setObject('OAuthData', null);
				Ti.App.Properties.setString('NetworkID', '');
			
		  		$.loginButton.enabled = true;
			  	$.loginButton.visible = true;
				$.cloudButton.enabled = true;
				$.cloudButton.title = "Cloud account...";
		  	}
		});
		dlg.show();
	});
	cloudSession.addEventListener('retrievedsession', function(e)
	{
		var networkID = Ti.App.Properties.getString('NetworkID');
		
		if (networkID && networkID.length > 0)
			cloudSession.connectWithNetworkID(networkID);
		else
			cloudSession.retrieveNetworks(OAuthData);
	});
	

	//Check if we have auth details already.
	var data = Ti.App.Properties.getObject('OAuthData');
	if (data)
	{	
	    var dlg = Ti.UI.createOptionDialog({cancel: 2, options: ['Test initial authorisation', 'Test session refresh', 'Cancel'], selectedIndex: 1, destructive: 0, title: 'Cloud login'});
	  	dlg.addEventListener('click', function(ev)
	  	{
			if (ev.index == 0)
			{
				authenticate();
			}
			else 
			if (ev.index == 1)
			{
				Alloy.Globals.showSpinner(true);
				OAuthData.initialiseWithAPIKeyAndJsonData(APIKey, secretKey, data);
				cloudSession.initialiseWithOAuthData(OAuthData);
			}		
		});
		dlg.show();
	}
	else
	{
		authenticate();
	}
	
	function authenticate()
	{
		//As desktop page is served up, a width of 200% ensures login details are centered large enough to read!
		var win = Ti.UI.createWindow({width:'200%', height:'100%', backgroundColor:'white', fullscreen:'true'});
		var webview = Titanium.UI.createWebView({width:'100%', height:'100%', url:authURL});
		
		win.add(webview);		//Add Cloud authentication login.
		win.open({modal:true});
		
		var page = 0;
		webview.addEventListener('load',function(e) 
		{
			++page;
				
			if (page==2)
			{
				//User has responded to the authentication page.
					
				code = getParameterByName(e.url, 'code');
				
				if (code)	//Do we have auth code?
				{
					win.close();
							
					postRequest(true);
				}
				else
				{
					win.close();
					
					$.loginButton.enabled = true;
				  	$.loginButton.visible = true;
					$.cloudButton.enabled = true;
					$.cloudButton.title = "Cloud account...";
				}
			}   
		});	
	}
	
	function postRequest(firstAuth)
	{
		$.loginButton.visible = false;
		$.loginButton.enabled = false;
		$.cloudButton.enabled = false;
		$.cloudButton.title = "Please wait...";
		
		var postClient = Titanium.Network.createHTTPClient();
		postClient.onload = function()
		{
			data = JSON.parse(this.responseText);
			
			Ti.App.Properties.setObject('OAuthData', data);
			Ti.App.Properties.setString('NetworkID', '');
			
			OAuthData.initialiseWithAPIKeyAndJsonData(APIKey, secretKey, data);
			cloudSession.initialiseWithOAuthData(OAuthData);
		};
		postClient.onerror = function()
		{
			var response = this.responseText;
			alert("Error with post data: " + response);
			
			$.loginButton.enabled = true;
		  	$.loginButton.visible = true;
			$.cloudButton.enabled = true;
			$.cloudButton.title = "Cloud account...";
		};
			
		postClient.open("POST","https://api.alfresco.com/auth/oauth/versions/2/token");
		
		if (firstAuth)
		{
			postClient.send({"code" : code,  "client_id" : APIKey,
							 "client_secret" : secretKey,
							 "grant_type" : "authorization_code",
							 "redirect_uri" : "http://www.alfresco.com/mobile-auth-callback.html"});
		}
		else
		{
			postClient.setRequestHeader('Authorization', 'Bearer ' + data.access_token);
			
			postClient.send({"refresh_token" : data.refresh_token, "client_id" : APIKey,
							 "client_secret" : secretKey,
							 "grant_type" : "refresh_token"});
		}
	}
}
    
    
function getParameterByName(url, name) 
{
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


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
		$.loginButton.visible = false;
		$.cloudButton.enabled = false;
		$.cloudButton.title = "(Logged in)";
		
		return 1;
	});    
}

