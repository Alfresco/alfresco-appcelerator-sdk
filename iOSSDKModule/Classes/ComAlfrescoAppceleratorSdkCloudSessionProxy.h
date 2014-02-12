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

#import "TiProxy.h"
#import "ComAlfrescoAppceleratorSdkRequestProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "AlfrescoOAuthData.h"

/**
 
#Javascript object:#
<code>CloudSession</code>
 
#Javascript events:#
* **'retrievedsession' - ** Sent upon successful retieval of authenticated session.  ***Properties:*** *none*
* **'error' - ** Sent upon error condition from any API.  ***Properties:*** *string errorstring, int errorcode*
* **'success' - ** Sent upon successful connection.  ***Properties:*** *string serverName*
* **'retrievednetwork' - ** Sent for each network ID retrieved.  ***Properties:*** *string networkid*
 
#Javascript example:#
 
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
 
*/


@interface ComAlfrescoAppceleratorSdkCloudSessionProxy : ComAlfrescoAppceleratorSdkSessionProxy
{
    AlfrescoOAuthData* data;
}


/**
 Initialise the Cloud Session.  This must be called before any retrieveNetworks call.
 @param oauthData
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

