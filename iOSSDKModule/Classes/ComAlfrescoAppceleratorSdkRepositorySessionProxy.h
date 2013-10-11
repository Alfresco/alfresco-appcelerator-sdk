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
//  AlfrescoRepositorySessionProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 20/05/2013.
//
//

#import "TiProxy.h"
#import "ComAlfrescoAppceleratorSdkRequestProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"

/**
 
#Javascript object:#
<code>RepositorySession</code>

#Javascript events:#
* 'error' (Properties: string errorstring, int errorcode)
* 'success' (Properties: string servername)
 
#Javascript example:#
 
    var SDKModule = require('com.alfresco.appcelerator.module.sdk');
 
    var properties  = {serverUrl: "http://localhost:8080/alfresco",  serverUsername: "admin",  serverPassword: "pwd"};
 
    var repoSession = SDKModule.createRepositorySession(properties);
 
    repoSession.addEventListener('error', function(e) { alert("Cannot connect to server (" + e.errorcode + "): " + e.errorstring); } );
 
    repoSession.addEventListener('success',function(e) { Ti.API.info("Connected to server: " + e.servername); } );
 
    repoSession.connect();
 
*/

@interface ComAlfrescoAppceleratorSdkRepositorySessionProxy : ComAlfrescoAppceleratorSdkSessionProxy

/** Connect to the repository using the properties set at creation
@since v1.0
*/
-(void)connect:(id)noargs;

@end

