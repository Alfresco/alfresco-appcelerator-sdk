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
//  ComAlfrescoAppceleratorSDkOAuthDataProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 02/2014.
//
//

#import "ComAlfrescoAppceleratorSDkOAuthDataProxy.h"

@interface ComAlfrescoAppceleratorSdkOAuthDataProxy()
@property(nonatomic,strong) AlfrescoOAuthData *OAuthData;
@end

@implementation ComAlfrescoAppceleratorSdkOAuthDataProxy

-(void)initialiseWithAPIKey:(id)args
{
    NSString* key = [args objectAtIndex:0];
    NSString* sec = [args objectAtIndex:1];
    
    _OAuthData = [[AlfrescoOAuthData alloc]initWithAPIKey:key secretKey:sec];
}


-(void)initialiseWithAPIKeyAndJsonData:(id)args
{
    NSString* key = [args objectAtIndex:0];
    NSString* sec = [args objectAtIndex:1];
    NSDictionary* dic = [args objectAtIndex:2];
    
    _OAuthData = [[AlfrescoOAuthData alloc]initWithAPIKey:key secretKey:sec jsonDictionary:dic];
    
    //NSLog(@"[INFO] OAuthData.accessToken: %@", _OAuthData.accessToken);
}

@end
