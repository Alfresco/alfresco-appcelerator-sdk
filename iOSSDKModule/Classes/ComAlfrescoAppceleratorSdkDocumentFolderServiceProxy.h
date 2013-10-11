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


/**

#Javascript object:#
<code>DocumentFolderService</code>

#Javascript events:#
* **'error' - ** Sent upon error condition from any API.  ***Properties:*** *string errorstring, int errorcode*
* **'retrievedfolder' - ** Sent when retrieveRootFolder() succeeds.  ***Properties:*** *none*
* **'documentnode' - ** Sent for each document.  ***Properties:*** Document *document*
* **'foldernode' - ** Sent for each folder.  ***Properties:*** *Folder folder*
* **'pagingresult' - ** Sent when using ListingContext.  ***Properties:*** *int hasmoreitems, int totalitems*
* **'endenumeration' - ** Sent when no more nodes available.  ***Properties:*** *none*
* **'progresseddocument' - ** Sent during document retrieval progress.  ***Properties:*** *int total, int bytes*
* **'retrieveddocument' - ** Sent when document retrieval complete.  ***Properties:*** *ContentFile contentfile*
 
#Javascript example:#
 
 
    var documentFolderService = SDKModule.createDocumentFolderService();
 
    documentFolderService.addEventListener('error', function(e) { alert(e.errorstring); });
 
    documentFolderService.initialiseWithSession (repoSession);
 
    documentFolderService.retrieveRootFolder();
 
    documentFolderService.addEventListener('retrievedfolder', function(e)
    {
 
        documentFolderService.addEventListener('documentnode', function(e) { var doc = e.document; ... }
   
        documentFolderService.addEventListener('foldernode', function(e) { var folder = e.folder; ... }
 
        documentFolderService.retrieveChildrenInFolder();
 
    });
*/

@interface ComAlfrescoAppceleratorSdkDocumentFolderServiceProxy : TiProxy
{
    AlfrescoDocumentFolderService* service;
    AlfrescoFolder* currentFolder;
    NSError* errorCode;
}


/** Initialise the service
 @param RepositorySession session
 @since v1.0
 */
-(void)initialiseWithSession:(id)arg;


/** Retrieve the root folder
 @since v1.0
 */
-(void)retrieveRootFolder:(id)noargs;


/** Set a specific folder ready for a retrieveChildrenInFolder() call.
 @param Folder folderObject
 @since v1.0
 */
-(void)setFolder:(id)arg;


/** Retrieve children in current folder (either root after retrieveRootFolder(), or a specific folder after a setFolder() call).
 @since v1.0
 */
-(void)retrieveChildrenInFolder:(id)noargs;


/** Retrieve children in current folder (either root after retrieveRootFolder(), or a specific folder after a setFolder() call).
 Result event will include listing context for paged handling.
 @since v1.0
 */
-(void)retrieveChildrenInFolderWithListingContext:(id)arg;


/** Get current folder
 @return Folder object
 @since v1.0
 */
-(id)getCurrentFolder:(id)noargs;


/** Save document to storage
 @param Document docObject
 @since v1.0
 */
-(void)saveDocument:(id)arg;


/** Retrieve permissions of document or folder object
 @param Document or Folder object
 @since v1.0
 */
-(void)retrievePermissionsOfNode:(id)arg;


/** Retrieve document or folder object from its identifier
 @param string identifier
 @since v1.0
 */
-(void)retrieveNodeWithIdentifier:(id)arg;


/** Retrieve document or folder object from its folder path
 @param string folderPath
 @since v1.0
 */
-(void)retrieveNodeWithFolderPath:(id)arg;


/** Retrieve document or folder object from its folder object and relative path string
 @param string relativeFolderPath
 @param Folder folderObject
 @since v1.0
 */
-(void)retrieveNodeWithFolderPathRelative:(id)args;


/** Retrieve parent folder object of node
 @param Document or Folder object
 @since v1.0
 */
-(void)retrieveParentFolderOfNode:(id)arg;


/** Retrieve an image rendition of node
 @param Document or folder object
 @param string type  - The type of thumbnail to be retrieved. For example 'doclib' can be used.
 @since v1.0
 */
-(void)retrieveRenditionOfNode:(id)args;


/** Retrieve only documents in folder
 @param Folder folderObject
 @since v1.0
 */
-(void)retrieveDocumentsInFolder:(id)arg;


/** Retrieve only documents in folder, with listing context
 @param Folder folderObject
 @param ListingContext listingContextObject
 @since v1.0
 */
-(void)retrieveDocumentsInFolderWithListingContext:(id)args;


/** Retrieve only folders in folder
 @param Folder folderObject
 @since v1.0
 */
-(void)retrieveFoldersInFolder:(id)arg;


/** Retrieve only folders in folder, with listing context
 @param Folder folderObject
 @param ListingContext listingContextObject
 @since v1.0
 */
-(void)retrieveFoldersInFolderWithListingContext:(id)args;




//Internal

-(void)internalRetrieveNodeWithFolderPathRelative:(id)dictionary;

-(void)internalRetrieveRenditionOfNode:(id)dictionary;

-(void)internalRetrieveDocumentsInFolderWithListingContext:(id)arg;

-(void)internalRetrieveFoldersInFolderWithListingContext:(id)arg;

@end
