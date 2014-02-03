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

/**
 
#Javascript object:#
<code>CloudSession</code>

#Required properties:#
* String serverUrl
* String serverUsername
* String serverPassword
 
#Javascript events:#
* **'error' - ** Sent upon error condition from any API.  ***Properties:*** *string errorstring, int errorcode*
* **'success' - ** Sent upon successful connection.  ***Properties:*** *string serverName*
 
#Javascript example:#
 
    var SDKModule = require('com.alfresco.appcelerator.module.sdk');
 
    var properties  = {serverUrl: "http://localhost:8080/alfresco",  serverUsername: "admin",  serverPassword: "pwd"};
 
    var repoSession = SDKModule.createCloudSession(properties);
 
    repoSession.addEventListener('error', function(e) { alert("Cannot connect to server (" + e.errorcode + "): " + e.errorstring); } );
 
    repoSession.addEventListener('success',function(e) { Ti.API.info("Connected to server: " + e.servername); } );
 
    repoSession.connect();
 
*/

@interface ComAlfrescoAppceleratorSdkCloudSessionProxy : ComAlfrescoAppceleratorSdkSessionProxy

/**
 This initialiser uses OAuth authentication processes. It will only be successful if the AlfrescoOAuthData contain a valid access and refresh token.
 Therefore, this method should only be used after the initial OAuth setup is complete.
 The method well set the home network/tenant ID as default
 @param oauthData
 @since v1.2
 */
-(void)connectWithOAuthData:(id)args;


/**
 This initialiser uses OAuth authentication processes. It will only be successful if the AlfrescoOAuthData contain a valid access and refresh token.
 Therefore, this method should only be used after the initial OAuth setup is complete.
 The method well set the home network/tenant ID as default
 @param oauthData
 @param parameters - optional, may be nil
 @since v1.2
 */
-(void)connectWithOAuthData:(id)args;


/**
 This initialiser uses OAuth authentication processes. It will only be successful if the AlfrescoOAuthData contain a valid access and refresh token.
 Therefore, this method should only be used after the initial OAuth setup is complete.
 The method well set to the specified network/tenant ID.
 @param oauthData
 @param networkIdentifer - also known as tenent ID
 @since v1.2
 */
-(void)connectWithOAuthData:(id)args;


/**
 This initialiser uses OAuth authentication processes. It will only be successful if the AlfrescoOAuthData contain a valid access and refresh token.
 Therefore, this method should only be used after the initial OAuth setup is complete.
 The method well set to the specified network/tenant ID.
 @param oauthData
 @param networkIdentifer - also known as tenent ID
 @param parameters - optional, may be nil
 @since v1.2
 */
-(void)connectWithOAuthData:(id)args;


/**
 This method obtains a list of available Cloud networks (or domains/tenants) for the registered user.
 */
-(void)retrieveNetworksWithCompletionBlock:(id)noargs;


@end

