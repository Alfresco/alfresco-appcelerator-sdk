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
//  AlfrescoDocumentFolderServiceProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 29/05/2013.
//
//

#import "TiProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "AlfrescoDocumentFolderService.h"

@interface ComAlfrescoAppceleratorSdkDocumentFolderServiceProxy : TiProxy
{
    AlfrescoDocumentFolderService* service;
    AlfrescoFolder* currentFolder;
    NSError* errorCode;
}

-(void)initialiseWithSession:(id)arg;

-(void)retrieveRootFolder:(id)noargs;

-(void)setFolder:(id)arg;

-(void)retrieveChildrenInFolder:(id)noargs;

-(void)retrieveChildrenInFolderWithListingContext:(id)arg;

-(id)getCurrentFolder:(id)noargs;

-(void)saveDocument:(id)arg;

-(void)retrievePermissionsOfNode:(id)arg;

-(void)retrieveNodeWithIdentifier:(id)arg;

-(void)retrieveNodeWithFolderPath:(id)arg;

-(void)retrieveNodeWithFolderPath:(id)args;

-(void)retrieveParentFolderOfNode:(id)arg;

-(void)retrieveRenditionOfNode:(id)args;

-(void)retrieveRenditionOfNode:(id)args;

-(void)retrieveDocumentsInFolder:(id)args;

-(void)retrieveDocumentsInFolderWithListingContext:(id)args;

-(void)retrieveFoldersInFolder:(id)arg;

-(void)retrieveFoldersInFolderWithListingContext:(id)args;



//Internal

-(void)internalRetrieveNodeWithFolderPathRelative:(id)dictionary;

-(void)internalRetrieveRenditionOfNode:(id)dictionary;

-(void)internalRetrieveDocumentsInFolderWithListingContext:(id)arg;

-(void)internalRetrieveFoldersInFolderWithListingContext:(id)arg;

@end
