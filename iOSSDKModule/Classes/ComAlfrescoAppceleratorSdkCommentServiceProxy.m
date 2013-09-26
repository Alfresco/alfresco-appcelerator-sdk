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
//  ComAlfrescoAppceleratorSdkCommentService.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 12/09/2013.
//
//

#import "ComAlfrescoAppceleratorSdkCommentServiceProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "ComAlfrescoAppceleratorSdkNodeProxy.h"
#import "ComAlfrescoAppceleratorSdkCommentProxy.h"
#import "SDKUtil.h"

@implementation ComAlfrescoAppceleratorSdkCommentServiceProxy


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
    
    service = [[AlfrescoCommentService alloc] initWithSession:sessionProxy.session];
}


-(void)retrieveCommentsForNode:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkNodeProxy)
    
    ComAlfrescoAppceleratorSdkNodeProxy* nodeProxy = arg;

    [service retrieveCommentsForNode:[nodeProxy performSelector:NSSelectorFromString(@"node")]
     completionBlock:^(NSArray* array, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             for (int i = 0;  i < array.count;  i++)
             {
                 AlfrescoComment* comment = [array objectAtIndex:i];
                 
                 NSLog(@"[INFO] Comment %@", comment.content);
                 
                 ComAlfrescoAppceleratorSdkCommentProxy* commentProxy = [[ComAlfrescoAppceleratorSdkCommentProxy alloc]initWithComment:comment];
                 
                 NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:commentProxy, @"comment", nil];
                 [self fireEvent:@"commentnode" withObject:event];
             }
         }
         
         [SDKUtil createEnumerationEndEvent:self];
     }];
}


-(void)retrieveCommentsForNodeWithListingContext:(id)args
{
    
}

@end
