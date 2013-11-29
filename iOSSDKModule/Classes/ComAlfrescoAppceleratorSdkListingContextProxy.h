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
//  ComAlfrescoAppceleratorSdkListingContext.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 22/08/2013.
//
//

#import "TiProxy.h"
#include "AlfrescoListingContext.h"


/**
 #Javascript object:#
 <code>ListingContext</code>
*/

@interface ComAlfrescoAppceleratorSdkListingContextProxy : TiProxy

@property (nonatomic, strong) AlfrescoListingContext* listingContext;


-(void)initialise:(id)noargs;


/**
 Initialise with maximum number of items to deliver at one time
 @param int maxItems
*/
-(void)initialiseWithMaxItems:(id)arg;


/**
 Initialise with maximum number of items, and skip count
 @param int maxItems
 @param int skipCount
*/
-(void)initialiseWithMaxItemsAndSkipCount:(id)args;

/**
 Initialise with sort property
 @param string sortProperty
*/
-(void)initialiseWithSortProperty:(id)args;


/**
 Initialise with all parameters
 @param int maxItems
 @param int skipCount
 @param string sortProperty
 @param boolean sortAscending
*/
-(void)initialiseWithMaxItems:(id)args;

@end
