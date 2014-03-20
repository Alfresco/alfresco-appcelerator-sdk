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
//  ComAlfresconAppceleratorSdkSiteProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 19/08/2013.
//
//

#import "TiProxy.h"
#import "ComAlfrescoAppceleratorSdkSiteProxy.h"

@interface ComAlfrescoAppceleratorSdkSiteProxy()
@property(nonatomic,strong) AlfrescoSite *currentSite;
@end

@implementation ComAlfrescoAppceleratorSdkSiteProxy

- (id)initWithSite:(AlfrescoSite *)site
{
    self = [super init];
    
    if (self)
    {
        self.currentSite = site;
        
        NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"shortName", @"title", @"summary", @"identifier", @"GUID", @"isMember", @"isPendingMember", @"isFavorite", @"visibility", nil];
        NSMutableDictionary* values = [[site dictionaryWithValuesForKeys:keys] mutableCopy];
        
        [self setValuesForKeysWithDictionary:values];
    }
    
    return self;
}

- (id)getSiteName:(id)args
{
    return self.currentSite.shortName;
}

- (void)dealloc
{
    NSLog(@"[INFO] SiteProxy object %@ being deallocated", _currentSite.shortName);
}

@end
