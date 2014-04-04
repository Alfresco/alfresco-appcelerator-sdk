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

//
//  AlfrescoCloudSessionProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 02/2014.
//
//

#import "ComAlfrescoAppceleratorSdkRequestProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"


/**
 
#Javascript object:#
<code>CloudSession</code>
 
#Javascript events:#
* **'retrievedsession' - ** Sent upon successful retieval of authenticated session.  ***Properties:*** *none*
* **'error' - ** Sent upon error condition from any API.  ***Properties:*** *string errorstring, int errorcode*
* **'success' - ** Sent upon successful connection.  ***Properties:*** *string serverName*
* **'retrievednetwork' - ** Sent for each network ID retrieved.  ***Properties:*** *string networkid*
* **'retrievedsession' - ** Sent when session retrieved from initialise call.  ***Properties:*** *none*
 
#Javascript basic API example:#
 
    var SDKModule = require('com.alfresco.appcelerator.module.sdk');
 
    var cloudSession = SDKModule.createCloudSession();
 
    var OAuthData = SDKModule.createOAuthData();
    OAuthData.initWithAPIKey (apiKey, secretKey, jsonData);   //Keys obtained using HTTP requests to https://api.alfresco.com/auth/oauth/... urls.
 
    cloudSession.initialiseWithOAuthData(OAuthData);
 
    cloudSession.addEventListener('retrievedsession', function(e)
    { 
        cloudSession.connect();
 
        cloudSession.addEventListener('error', function(e) { alert("Cannot connect to server (" + e.errorcode + "): " + e.errorstring); } );
 
        cloudSession.addEventListener('success',function(e) { Ti.API.info("Connected to server: " + e.servername); } );
    }
 
 
#Javascript full authentication example:#

    var OAuthData = SDKModule.createOAuthData();
    var cloudSession = SDKModule.createCloudSession();

    //Keys received from your https://developer.alfresco.com account.
    //You will need to store and retrieve these in a secure way, rather than hard-code them here.
    var APIKey = "Your API key";
    var secretKey = "Your secret key";
 
    var authURL = "https://api.alfresco.com/auth/oauth/versions/2/authorize?client_id=" + APIKey + "&redirect_uri=http://www.alfresco.com/mobile-auth-callback.html&scope=pub_api&response_type=code";
    var networks=[];
    var code;

 
    //
    //
    // Events needed for Cloud login:
    //
    //
 
    cloudSession.addEventListener('success',function(e)
      {
          Ti.API.info("Connected to server: " + e.servername);
          return 1;
      });
 
    cloudSession.addEventListener('error',function(e)
      {
          if (e.errorcode == 104)	//Login failed, access token expired.
          {
              //POST a fresh request.
              postRequest(false);
          }
          else
          {
              alert("Cannot connect to server (" + e.errorcode + "): " + e.errorstring);
          }
          return 0;
      });

    cloudSession.addEventListener('retrievednetwork', function(e)
      {
          //Retrieved an available network.  Add to our list until we receive the 'endenumeration' event.
          networks.push(e.networkid);
      });

    cloudSession.addEventListener('endenumeration', function(e)
      {
          //All networks retrieved.  Display to user and connect to the network of their choice.

          networks.push('Cancel');
          
          var cancelIdx = networks.length-1;
 
          var ops =	{ cancel: cancelIdx,
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

                   //Connect to the specified network and wait for 'success' or 'error' event.

                   cloudSession.connectWithNetworkID(networks[ev.index]);
               }
               else
               {
                   Ti.App.Properties.setObject('OAuthData', null);
                   Ti.App.Properties.setString('NetworkID', '');
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


 
    //
    //
    // Cloud login:
    //
    //

    //Check if we have auth details already.
    var data = Ti.App.Properties.getObject('OAuthData');
    if (data)
    {
        var dlg = Ti.UI.createOptionDialog({cancel: 2, options: ['Test initial authorisation', 'Test session refresh', 'Cancel'], selectedIndex: 1, destructive: 0, title: 'Cloud login'});
        dlg.addEventListener('click', function(ev)
         {
             if (ev.index == 0)
             {
                 //Start a new authentication using Alfresco's web authentication page.
                 authenticate();
             }
             else 
             if (ev.index == 1)
             {
                 //Initialise this session from existing OAuth data.  This will produce a 'retrievedsession' event if the session is still active,
                 //or an 'error' event if the session needs refreshing.
 
                 OAuthData.initialiseWithAPIKeyAndJsonData(APIKey, secretKey, data);
                 cloudSession.initialiseWithOAuthData(OAuthData);
             }		
         });
        dlg.show();
    }
    else
    {
        //We don't have any previous OAuth data.  Start a new authentication using Alfresco's web authentication page.
        authenticate();
    }
 

    // Method to start a new authentication process using Alfresco's web authentication page.
    function authenticate()
    {
        //It seems that Appcelerator does not display the MOBILE authentication page, so a width of 200% ensures login details are centered large enough to read!
        var win = Ti.UI.createWindow({width:'200%', height:'100%', backgroundColor:'white', fullscreen:'true', navBarHidden:'true'});
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
                     //Unknown error condition if we have no code back.
                     win.close();
                 }
             }   
         });	
    }
 
 
    //Method used to retrieve or refresh the tokens.
    function postRequest(firstAuth)
    {
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
 
 
    function getParameterByName(url, name)
    {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

*/


@interface ComAlfrescoAppceleratorSdkCloudSessionProxy : ComAlfrescoAppceleratorSdkSessionProxy
{
    AlfrescoOAuthData* data;
}


/**
 Initialise the Cloud Session.  This must be called before any retrieveNetworks call.
 @param oauthData OAuthData object populated with valid tokens.
 @since v1.2
 */
-(void)initialiseWithOAuthData:(id)arg;


/**
 This method obtains a list of available Cloud networks (or domains/tenants) for the registered user.
 @since v1.2
 */
-(void)retrieveNetworks:(id)noargs;


/**
 Connect to default network using access and refresh tokens from OAuth data provided during initialisation.
 @since v1.2
 */
-(void)connect:(id)noargs;


/**
 Connect to given network using access and refresh tokens from OAuth data provided during initialisation.
 @param networkIdentifer - also known as tenent ID
 @since v1.2
 */
-(void)connectWithNetworkID:(id)arg;

@end

