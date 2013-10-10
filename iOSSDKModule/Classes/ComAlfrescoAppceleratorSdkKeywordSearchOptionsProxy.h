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
//  ComAlfrescoAppceleratorSdkKeywordSearchOptionsProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 29/08/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoKeywordSearchOptions.h"

/** AlfrescoKeywordSearchOptions
 
 The AlfrescoKeywordSearchOptions are used in Alfresco Search Service.
 */

@interface ComAlfrescoAppceleratorSdkKeywordSearchOptionsProxy : TiProxy

@property (nonatomic, strong) AlfrescoKeywordSearchOptions* searchOptions;

-(void)initialise:(id)noargs;

/**
 @param boolean exactMatch
 @param boolean includeContent - searches also the content of files
 */
-(void)initialiseWithExactMatch:(id)args;


/**
 @param Folder folder - the node to be searched
 @param boolean includeDescendants - search sub-folders as well
 */
-(void)initialiseWithFolder:(id)args;


/**
 @param boolean exactMatch
 @param boolean includeContent - searches also the content of files
 @param Folder folder - the node to be searched
 @param boolean includeDescendants - search sub-folders as well
 */
-(void)initialiseWithExactMatchAndFolder:(id)args;

@end
