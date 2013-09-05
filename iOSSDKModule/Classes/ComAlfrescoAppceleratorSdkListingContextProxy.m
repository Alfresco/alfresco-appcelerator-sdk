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
//  ComAlfrescoAppceleratorSdkListingContext.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 22/08/2013.
//
//

#import "ComAlfrescoAppceleratorSdkListingContextProxy.h"

@implementation ComAlfrescoAppceleratorSdkListingContextProxy

@synthesize listingContext;


-(void)init:(id)noargs
{
    listingContext = [[AlfrescoListingContext alloc]init];
}


-(void)initWithMaxItems:(id)arg
{
    ENSURE_SINGLE_ARG(arg,NSNumber)

    NSNumber* maxItems = arg;
    
    listingContext = [[AlfrescoListingContext alloc]initWithMaxItems:maxItems];
}


-(void)initWithMaxItemsAndSkipCount:(id)args
{
    NSNumber* maxItems = [args objectAtIndex:0];
    NSNumber* skipCount = [args objectAtIndex:1];
    
    listingContext = [[AlfrescoListingContext alloc]initWithMaxItems:maxItems skipCount:skipCount];
}


-(void)initWithSortProperty:(id)args
{
    NSString* sortProperty = [args objectAtIndex:0];
    BOOL sortAscending = ([args objectAtIndex:1] > 0);
    
    listingContext = [[AlfrescoListingContext alloc]initWithSortProperty:sortProperty sortAscending:sortAscending];
}


- (id)initWithAllParams:(id)args
{
    NSNumber* maxItems = [args objectAtIndex:0];
    NSNumber* skipCount = [args objectAtIndex:1];
    NSString* sortProperty = [args objectAtIndex:2];
    BOOL sortAscending = ([args objectAtIndex:3] > 0);
    
    listingContext = [[AlfrescoListingContext alloc]initWithMaxItems:maxItems skipCount:skipCount sortProperty:sortProperty
                                                                     sortAscending:sortAscending];
}

@end
