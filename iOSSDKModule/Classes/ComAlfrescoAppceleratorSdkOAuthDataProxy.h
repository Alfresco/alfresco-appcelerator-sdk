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
//  ComAlfrescoAppceleratorSDkOAuthDataProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 02/2014.
//
//

#import "TiProxy.h"
#import "AlfrescoOAuthData.h"

/**
#Javascript object:#
<code>OAuthData</code>
 
 */

@interface ComAlfrescoAppceleratorSdkOAuthDataProxy : TiProxy

/**
 This initialised is typically used for subsequent authentication steps, e.g. obtaining the access token or refresh token.
 The Alfresco default redirect URI is taken as a value
 @param apiKey
 @param secretKey
 @since v1.2
 */

-(void)initialiseWithAPIKey:(id)args;


/**
 This initialised is typically used for subsequent authentication steps, e.g. obtaining the access token or refresh token.
 The Alfresco default redirect URI is taken as a value
 @param apiKey
 @param secretKey
 @param jsonDictionary
 @since v1.2
 */

-(void)initialiseWithAPIKeyAndJsonData:(id)args;

@end
