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
//  ComAlfrescoAppceleratorSdkListingFilter.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 20/03/2014.
//
//

#import "ComAlfrescoAppceleratorSdkListingFilterProxy.h"

@implementation ComAlfrescoAppceleratorSdkListingFilterProxy


-(void)initialise:(id)noargs
{
    self.listingFilter = [[AlfrescoListingFilter alloc]init];
}


-(void)addListingFilter:(id)args
{
    NSString* key = [args objectAtIndex:0];
    NSString* value = [args objectAtIndex:1];
    
    [self.listingFilter addFilter:key withValue:value];
}

@end
