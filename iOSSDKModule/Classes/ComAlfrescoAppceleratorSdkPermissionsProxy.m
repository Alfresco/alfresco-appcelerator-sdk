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
//  ComAlfrescoAppceleratorSdkPermissionsProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 10/09/2013.
//
//

#import "ComAlfrescoAppceleratorSdkPermissionsProxy.h"

@implementation ComAlfrescoAppceleratorSdkPermissionsProxy

-(id)initWithPermissions:(AlfrescoPermissions*)p
{
    self->permissions = p;
    
    NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"canEdit", @"canDelete", @"canAddChildren", @"canComment", @"canGetContent", @"canSetContent", @"canGetProperties", @"canGetAllVersions", @"canGetChildren", nil];
    NSMutableDictionary* values = [[permissions dictionaryWithValuesForKeys:keys] mutableCopy];
    
    [self setValuesForKeysWithDictionary:values];
    
    return self;
}


-(id)init
{
    self->permissions = [[AlfrescoPermissions alloc]init];
    
    //
    // TODO: Incoming properties will need mapping to AlfrescoProperties when R/W properties implemented:
    //
    //[self valueForKey:@"canEdit"];
    //[self valueForKey:@"canDelete"];
    //[self valueForKey:@"canAddChildren"];
    //[self valueForKey:@"canComment;"];
    //[self valueForKey:@"canGetContent"];
    //[self valueForKey:@"canSetContent"];
    //[self valueForKey:@"canGetProperties"];
    //[self valueForKey:@"canGetChildren"];
    //[self valueForKey:@"canGetAllVersions"];
    
    return self;
}
@end
