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
//  ComAlfrescoAppceleratorSdkRatingService.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 12/09/2013.
//
//

#import "ComAlfrescoAppceleratorSdkRatingServiceProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "ComAlfrescoAppceleratorSdkNodeProxy.h"
#import "SDKUtil.h"

@implementation ComAlfrescoAppceleratorSdkRatingServiceProxy


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
    
    service = [[AlfrescoRatingService alloc] initWithSession:sessionProxy.session];
}



-(void)retrieveLikeCountForNode:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkNodeProxy)
    
    [service retrieveLikeCountForNode:[arg performSelector:NSSelectorFromString(@"node")]
    completionBlock:^(NSNumber* count, NSError* error)
    {
        if (error != nil)
        {
            [SDKUtil createErrorEvent:error proxyObject:self];
        }
        else
        {
            NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:count, @"count", nil];
            [self fireEvent:@"retrievedlikecount" withObject:event];
        }
    }];
}


-(void)isNodeLiked:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkNodeProxy)
    
    [service isNodeLiked:[arg performSelector:NSSelectorFromString(@"node")]
     completionBlock:^(BOOL succeeded, BOOL isLiked, NSError* error)
     {
         if (succeeded)
         {
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:arg, @"node", nil];
             [self fireEvent:@"retrievedisliked" withObject:event];
         }
         else
         if (error != nil)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
     }];
}


-(void)likeNode:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkNodeProxy)
    
    [service likeNode:[arg performSelector:NSSelectorFromString(@"node")]
         completionBlock:^(BOOL succeeded, NSError* error)
     {
         if (succeeded)
         {
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:arg, @"node", nil];
             [self fireEvent:@"likednode" withObject:event];
         }
         else
         if (error != nil)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
     }];
}


-(void)unlikeNode:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkNodeProxy)
    
    [service unlikeNode:[arg performSelector:NSSelectorFromString(@"node")]
      completionBlock:^(BOOL succeeded, NSError* error)
     {
         if (succeeded)
         {
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:arg, @"node", nil];
             [self fireEvent:@"unlikednode" withObject:event];
         }
         else
             if (error != nil)
             {
                 [SDKUtil createErrorEvent:error proxyObject:self];
             }
     }];
}

@end
