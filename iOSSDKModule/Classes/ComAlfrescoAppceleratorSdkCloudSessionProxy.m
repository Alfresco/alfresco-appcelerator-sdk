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
//  AlfrescoCloudSessionProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 02/2014.
//
//

#import "ComAlfrescoAppceleratorSdkCloudSessionProxy.h"
#import "ComAlfrescoAppceleratorSdkOAuthDataProxy.h"

#import "AlfrescoCloudSession.h"
#import "TiUtils.h"
#include "SDKUtil.h"


@implementation ComAlfrescoAppceleratorSdkCloudSessionProxy

-(void)connectWithOAuthData:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkOAuthDataProxy)
    
    ComAlfrescoAppceleratorSdkOAuthDataProxy* data = [arg objectAtIndex:0];
    AlfrescoOAuthData* oad = [data performSelector:NSSelectorFromString(@"OAuthData")];
    
    //NSLog(@"[INFO] OAuthData.accessToken: %@", oad.accessToken);
    
    [AlfrescoCloudSession connectWithOAuthData:oad
     completionBlock:^(id<AlfrescoSession> session, NSError *error)
     {
         if (nil == session)
         {
             self.error = error;
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             self.session = session;
             
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:@"", @"code", nil];
             [self fireEvent:@"retrievedsession" withObject:event];
         }
     }];
}


-(void)connectWithOAuthDataAndNetworkID:(id)args
{
    ENSURE_UI_THREAD_1_ARG(args)
    
    ComAlfrescoAppceleratorSdkOAuthDataProxy* data = [args objectAtIndex:0];
    AlfrescoOAuthData* oad = [data performSelector:NSSelectorFromString(@"OAuthData")];
    NSString* networkID = [args objectAtIndex:1];
    
    //NSLog(@"[INFO] OAuthData.accessToken: %@", oad.accessToken);
    
    [AlfrescoCloudSession connectWithOAuthData:oad networkIdentifer:networkID parameters:nil
     completionBlock:^(id<AlfrescoSession> session, NSError *error)
     {
         if (nil == session)
         {
             self.error = error;
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             self.session = session;
             self.info = self.session.repositoryInfo;
             
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:self.info.name, @"servername", nil];
             [self fireEvent:@"success" withObject:event];
         }
     }];
}


-(void)retrieveNetworks:(id)arg
{
    ENSURE_UI_THREAD_0_ARGS
    
    AlfrescoCloudSession* cloudSession = self.session;
    
    [cloudSession retrieveNetworksWithCompletionBlock:
     ^(NSArray* networks, NSError *error)
     {
         if (error != NULL)
         {
             self.error = error;
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             for (int i = 0;  i < networks.count;  i++)
             {
                 AlfrescoCloudNetwork* currentNet = [networks objectAtIndex:i];
                 
                 NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:currentNet.identifier, @"networkid", nil];
                 [self fireEvent:@"retrievednetwork" withObject:event];
             }
             [SDKUtil createEnumerationEndEvent:self];
         }
     }];
}

@end
