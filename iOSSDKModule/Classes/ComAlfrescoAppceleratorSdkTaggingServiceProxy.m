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
//  ComAlfrescoAppceleratorSdkTaggingServiceProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 19/09/2013.
//
//

#import "ComAlfrescoAppceleratorSdkTaggingServiceProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "ComAlfrescoAppceleratorSdkNodeProxy.h"
#import "ComAlfrescoAppceleratorSdkTagProxy.h"
#import "AlfrescoTag.h"


@implementation ComAlfrescoAppceleratorSdkTaggingServiceProxy

-(void)initWithSession:(id)arg
{
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkSessionProxy)
    
    ComAlfrescoAppceleratorSdkSessionProxy* sessionProxy = arg;
    
    if (sessionProxy == nil || sessionProxy.session == nil)
    {
        NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:[[NSNumber alloc]initWithInt:1], @"errorcode", nil];
        [self fireEvent:@"paramerror" withObject:event];
        
        return;
    }
    
    errorCode = [[NSError alloc]init];
    
    service = [[AlfrescoTaggingService alloc] initWithSession:sessionProxy.session];
}


-(void)retrieveAllTags:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
    
    [service retrieveAllTagsWithCompletionBlock:
     ^(NSArray* array, NSError* error)
     {
         if (error != NULL)
             NSLog(@"[INFO] Error %@", error.description);
         
         for (int i = 0;  i < array.count;  i++)
         {
             AlfrescoTag* tag = [array objectAtIndex:i];
             
             NSLog(@"[INFO] tag %@", tag.identifier);
             
             ComAlfrescoAppceleratorSdkTagProxy* tagProxy = [[ComAlfrescoAppceleratorSdkTagProxy alloc]initWithTag:tag];
             
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:tagProxy, @"tag", nil];
             [self fireEvent:@"tagnode" withObject:event];
         }
     }];
}


-(void)retrieveTagsForNode:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkNodeProxy)
    
    ComAlfrescoAppceleratorSdkNodeProxy* nodeProxy = arg;
    
    [service retrieveTagsForNode:nodeProxy->node
     completionBlock:^(NSArray* array, NSError* error)
     {
         if (error != NULL)
             NSLog(@"[INFO] Error %@", error.description);
         
         for (int i = 0;  i < array.count;  i++)
         {
             AlfrescoTag* tag = [array objectAtIndex:i];
             
             NSLog(@"[INFO] tag %@", tag.identifier);
             
             ComAlfrescoAppceleratorSdkTagProxy* tagProxy = [[ComAlfrescoAppceleratorSdkTagProxy alloc]initWithTag:tag];
             
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:tagProxy, @"tag", nil];
             [self fireEvent:@"tagnode" withObject:event];
         }
     }];
}
@end
