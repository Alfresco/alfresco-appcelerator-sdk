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
         
         [SDKUtil createEnumerationEndEvent:self eventSource:@"retrieveCommentsForNode" eventObject:nodeProxy];
     }];
}


-(void)retrieveCommentsForNodeWithListingContext:(id)args
{
    
}


-(void)createEventWithComment:(AlfrescoComment*)comment
{
    ComAlfrescoAppceleratorSdkCommentProxy* commentProxy = [[ComAlfrescoAppceleratorSdkCommentProxy alloc]initWithComment:comment];
    
    NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:commentProxy, @"comment", nil];
    
    [self fireEvent:@"commentupdated" withObject:event];
}


-(void)addCommentToNode:(id)args
{
    ENSURE_UI_THREAD_1_ARG(args)
    
    [service addCommentToNode:[args[0] performSelector:NSSelectorFromString(@"node")] content:args[1] title:args[2]
     completionBlock:^(AlfrescoComment* comment, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             [self createEventWithComment:comment];
         }
     }];
}


-(void)updateCommentOnNode:(id)args
{
    ENSURE_UI_THREAD_1_ARG(args)
    
    [service updateCommentOnNode:[args[0] performSelector:NSSelectorFromString(@"node")]
     comment:[args[1] performSelector:NSSelectorFromString(@"comment")] content:args[2]
     completionBlock:^(AlfrescoComment* comment, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             [self createEventWithComment:comment];
         }
     }];
}


-(void)deleteCommentFromNode:(id)args
{
    ENSURE_UI_THREAD_1_ARG(args)
    
    [service deleteCommentFromNode:[args[0] performSelector:NSSelectorFromString(@"node")]
     comment:[args[1] performSelector:NSSelectorFromString(@"comment")]
     completionBlock:^(BOOL succeeded, NSError* error)
     {
         if (succeeded)
         {
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:[[NSNumber alloc]initWithInt:1], @"code", nil];
             [self fireEvent:@"deletedcomment" withObject:event];
         }
         else
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
     }];
}


@end
