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
//  AlfrescoRepositorySessionProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 20/05/2013.
//
//

#import "ComAlfrescoAppceleratorSdkRepositorySessionProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionCompletionBlockProxy.h"

#import "AlfrescoRepositorySession.h"

#import "TiUtils.h"

@implementation ComAlfrescoAppceleratorSdkRepositorySessionProxy

 
-(void)connect:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
    
    NSURL *url = [NSURL URLWithString:[self valueForKey:@"serverUrl"]];
    NSString *user = [self valueForKey:@"serverUsername"];
    NSString *pwd = [self valueForKey:@"serverPassword"];
    
    if (url == nil  ||  user == nil  ||  pwd == nil)
    {
        NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:[[NSNumber alloc]initWithInt:1], @"errorcode", nil];
        [self fireEvent:@"paramerror" withObject:event];
        
        return;
    } 
    
    AlfrescoRequest* request;
    ComAlfrescoAppceleratorSdkRepositorySessionProxy *weakSelf = self;
  
    request = [AlfrescoRepositorySession connectWithUrl:url username:user password:pwd
                                                        completionBlock:^(id<AlfrescoSession> session, NSError *error)
                                                        {
                                                            if (nil == session)
                                                            {
                                                                self.error = error;
                                                                
                                                                NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:[[NSNumber alloc]initWithInt:error.code], @"errorcode", @"", @"errorstring", nil];
                                                                [weakSelf fireEvent:@"error" withObject:event];
                                                            }
                                                            else
                                                            {
                                                                weakSelf.session = session;
                                                                weakSelf.info = weakSelf.session.repositoryInfo;
                                                                
                                                                NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:weakSelf.info.name, @"servername", nil];
                                                                [weakSelf fireEvent:@"success" withObject:event];
                                                            }
                                                        }];
}

@end
