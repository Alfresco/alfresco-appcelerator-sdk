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
//  ComAlfrescoAppceleratorSdkTaskProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 20/03/2014.
//
//

#import "ComAlfrescoAppceleratorSdkTaskProxy.h"

@interface ComAlfrescoAppceleratorSdkTaskProxy()
@property(nonatomic,strong) AlfrescoWorkflowTask *task;
@end

@implementation ComAlfrescoAppceleratorSdkTaskProxy

-(id)initWithTask:(AlfrescoWorkflowTask *)task
{
    self = [super init];
    
    if (self)
    {
        self.task = task;
        
        NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"assigneeIdentifier", @"taskDescription", @"dueAt", @"endedAt",
                                                                        @"identifier", @"key", @"name", @"priority", @"processDefinitionIdentifier", @"processIdentifier", @"startedAt", nil];
        
        NSMutableDictionary* values = [[task dictionaryWithValuesForKeys:keys] mutableCopy];
        
        [self setValuesForKeysWithDictionary:values];
    }
    
    return self;
}

@end
