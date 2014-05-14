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
//  ComAlfrescoAppceleratorSdkListingFilter.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 20/03/2014.
//
//

#import "TiProxy.h"

/**
 #Javascript object:#
 <code>ListingFilter</code>
*/

@interface ComAlfrescoAppceleratorSdkListingFilterProxy : TiProxy

@property (nonatomic, strong) AlfrescoListingFilter* listingFilter;


-(void)initialise:(id)noargs;


/**
 Add a listing filter.
 @param string key
 @param string value
*/
-(void)addListingFilter:(id)args;

@end