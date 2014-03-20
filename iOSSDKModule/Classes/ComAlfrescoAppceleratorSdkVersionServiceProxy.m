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
//  ComAlfrescoAppceleratorSdkVersionServiceProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 27/09/2013.
//
//

#import "ComAlfrescoAppceleratorSdkVersionServiceProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "ComAlfrescoAppceleratorSdkDocumentProxy.h"
#import "SDKUtil.h"

@implementation ComAlfrescoAppceleratorSdkVersionServiceProxy

-(void)initialiseWithSession:(id)arg
{
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkSessionProxy)
    
    ComAlfrescoAppceleratorSdkSessionProxy* sessionProxy = arg;
    
    if (sessionProxy == nil || sessionProxy.session == nil)
    {
        [SDKUtil createParamErrorEvent:self];
        return;
    }
    
    errorCode = [[NSError alloc]init];
    
    service = [[AlfrescoVersionService alloc] initWithSession:sessionProxy.session];
}


-(void)retrieveAllVersionsOfDocument:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkDocumentProxy)
    
    ComAlfrescoAppceleratorSdkDocumentProxy* docProxy = arg;
    
    [service retrieveAllVersionsOfDocument:[docProxy performSelector:NSSelectorFromString(@"node")]
      completionBlock:^(NSArray* array, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             NSLog(@"[INFO] Number of nodes: %d", array.count);
             
             for (int i = 0;  i < array.count;  i++)
             {
                 [SDKUtil createEventWithNode:[array objectAtIndex:i] proxyObject:self];
             }
         }
         
         [SDKUtil createEnumerationEndEvent:self eventSource:@"retrieveAllVersionsOfDocument" eventObject:docProxy];
     }];
}

@end
