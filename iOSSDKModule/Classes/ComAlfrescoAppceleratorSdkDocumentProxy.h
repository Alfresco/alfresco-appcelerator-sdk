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
//  ComAlfrescoAppceleratorSdkFolder.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 17/06/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoDocument.h"
#import "ComAlfrescoAppceleratorSdkNodeProxy.h"

/**
 Document
 
 Javascript properties:
 
 string identifier
 string name
 string title
 string summary
 string type
 string createdBy
 string createdAt
 string modifiedBy
 string modifiedAt
 boolean isFolder
 boolean isDocument
 string contentMimeType
 string contentLength
 string versionLabel
 string versionComment
 string isLatestVersion
 
 */

@interface ComAlfrescoAppceleratorSdkDocumentProxy : ComAlfrescoAppceleratorSdkNodeProxy

@end
