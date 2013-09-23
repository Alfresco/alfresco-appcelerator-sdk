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
//  ComAlfrescoAppceleratorSdkPersonService.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 16/09/2013.
//
//

#import "ComAlfrescoAppceleratorSdkPersonServiceProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "ComAlfrescoAppceleratorSdkPersonProxy.h"
#import "ComAlfrescoAppceleratorSdkContentFileProxy.h"


@implementation ComAlfrescoAppceleratorSdkPersonServiceProxy

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
    
    service = [[AlfrescoPersonService alloc] initWithSession:sessionProxy.session];
}


-(void)retrievePersonWithIdentifier:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSString)
    
    [service retrievePersonWithIdentifier:arg completionBlock:^(AlfrescoPerson* person, NSError* error)
     {
         ComAlfrescoAppceleratorSdkPersonProxy* personProxy = [[ComAlfrescoAppceleratorSdkPersonProxy alloc]initWithPerson:person];
         
         NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:personProxy, @"person", nil];
         
         [self fireEvent:@"personnode" withObject:event];
     }];
}


-(void)retrieveAvatarForPerson:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkPersonProxy)
    
    [service retrieveAvatarForPerson:((ComAlfrescoAppceleratorSdkPersonProxy*)arg)->person
     completionBlock:^(AlfrescoContentFile* contentFile, NSError* error)
     {
         NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:
                                [[ComAlfrescoAppceleratorSdkContentFileProxy alloc] initWithContentFile:contentFile], @"contentfile",
                                nil];
         
         [self fireEvent:@"retrievedavatar" withObject:event];
    }];
}

@end
