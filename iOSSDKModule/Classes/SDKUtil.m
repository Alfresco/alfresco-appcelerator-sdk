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
//  SDKUtil.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 14/08/2013.
//
//

#import "SDKUtil.h"

#import "ComAlfrescoAppceleratorSdkFolderProxy.h"
#import "ComAlfrescoAppceleratorSdkDocumentProxy.h"

@implementation SDKUtil

+(void)createEventWithNode:(AlfrescoNode*)node proxyObject:(TiProxy*)proxyObj
{
    if (node.isFolder)
    {
        NSLog(@"[INFO] ** Folder node: %@", node.name);
        
        ComAlfrescoAppceleratorSdkFolderProxy *thisFolder = [[ComAlfrescoAppceleratorSdkFolderProxy alloc] initWithNode:node];
        NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:thisFolder, @"folder", nil];
        
        [proxyObj fireEvent:@"foldernode" withObject:event];
    }
    else
    {
        NSLog(@"[INFO] ** Document node: %@", node.name);
        
        ComAlfrescoAppceleratorSdkDocumentProxy *thisDocument = [[ComAlfrescoAppceleratorSdkDocumentProxy alloc] initWithNode:node];
        NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:thisDocument, @"document", nil];
        
        [proxyObj fireEvent:@"documentnode" withObject:event];
    }
}


+(void)createEventWithPagingResult:(AlfrescoPagingResult*)pagingResult  proxyObject:(TiProxy*)proxyObj
{
    NSDictionary *values = [NSDictionary dictionaryWithObjectsAndKeys:
                            [NSNumber numberWithBool:pagingResult.hasMoreItems], @"hasmoreitems",
                            [NSNumber numberWithBool:pagingResult.totalItems], @"totalitems",
                            nil];
    
    [proxyObj fireEvent:@"pagingresult" withObject:values];
}

@end
