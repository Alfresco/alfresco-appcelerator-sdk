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
//  ComAlfrescoAppceleratorSdkKeywordSearchOptionsProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 29/08/2013.
//
//

#import "ComAlfrescoAppceleratorSdkKeywordSearchOptionsProxy.h"
#import "ComAlfrescoAppceleratorSdkFolderProxy.h"

@implementation ComAlfrescoAppceleratorSdkKeywordSearchOptionsProxy
@synthesize searchOptions;

-(void)initialise:(id)noargs
{
    searchOptions = [[AlfrescoKeywordSearchOptions alloc]init];
}


-(void)initialiseWithExactMatch:(id)args
{
    BOOL exactMatch = [args objectAtIndex:0];
    BOOL includeContent = [args objectAtIndex:1];
    
    searchOptions = [[AlfrescoKeywordSearchOptions alloc]initWithExactMatch:exactMatch includeContent:includeContent];
}


-(void)initialiseWithFolder:(id)args
{
    ComAlfrescoAppceleratorSdkFolderProxy* folderProxy = [args objectAtIndex:0];
    AlfrescoFolder* folder = [folderProxy performSelector:NSSelectorFromString(@"node")];
    BOOL includeDescendants = [args objectAtIndex:1];
    
    searchOptions = [[AlfrescoKeywordSearchOptions alloc]initWithFolder:folder includeDescendants:includeDescendants];
}


-(void)initialiseWithExactMatchAndFolder:(id)args
{
    BOOL exactMatch = [args objectAtIndex:0];
    BOOL includeContent = [args objectAtIndex:1];
    ComAlfrescoAppceleratorSdkFolderProxy* folderProxy = [args objectAtIndex:2];
    AlfrescoFolder* folder = [folderProxy performSelector:NSSelectorFromString(@"node")];
    BOOL includeDescendants = [args objectAtIndex:3];
    
    searchOptions = [[AlfrescoKeywordSearchOptions alloc]initWithExactMatch:exactMatch includeContent:includeContent folder:folder includeDescendants:includeDescendants];
}

@end
