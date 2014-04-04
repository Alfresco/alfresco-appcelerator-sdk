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


/**

#Javascript object:#
<code>DocumentFolderService</code>

#Javascript events:#
* **'error' - ** Sent upon error condition from any API.  ***Properties:*** *string errorstring, int errorcode*
* **'retrievedfolder' - ** Sent when retrieveRootFolder() succeeds.  ***Properties:*** *none*
* **'documentnode' - ** Sent for each document.  ***Properties:*** Document *document*
* **'foldernode' - ** Sent for each folder.  ***Properties:*** *Folder folder*
* **'pagingresult' - ** Sent when using ListingContext.  ***Properties:*** *int hasmoreitems, int totalitems*
* **'endenumeration' - ** Sent when no more nodes available.  ***Properties:*** *string eventsource, string eventobject*
* **'progresseddocument' - ** Sent during document retrieval progress.  ***Properties:*** *int total, int bytes*
* **'retrieveddocument' - ** Sent when document retrieval complete.  ***Properties:*** *ContentFile contentfile*
* **'newdocumentnode' - ** Sent after creation of new document node.  ***Properties:*** Document *document*
* **'newfoldernode' - ** Sent after creation of new folder node.  ***Properties:*** *Folder folder*
* **'deletednode' - ** Sent after node deletion.  ***Properties:*** *none*
* **'retrievedisfavorite' - ** Sent after favorite status retrieved.  ***Properties:*** *Node node, int favorite (1=yes, 0=no)*
* **'addedfavorite' - ** Sent after favorite added.  ***Properties:*** *Node node*
* **'removedfavorite' - ** Sent after favorite removed.  ***Properties:*** *Node node*

 
#Javascript example:#
 
 
    var documentFolderService = SDKModule.createDocumentFolderService();
 
    documentFolderService.addEventListener('error', function(e) { alert(e.errorstring); });
 
    documentFolderService.initialiseWithSession (repoSession);
 
    documentFolderService.retrieveRootFolder();
 
    documentFolderService.addEventListener('retrievedfolder', function(e)
    {
 
        documentFolderService.addEventListener('documentnode', function(e) { var doc = e.document; --your code here-- } );
   
        documentFolderService.addEventListener('foldernode', function(e) { var folder = e.folder; --your code here-- } );
 
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


/** Retrieve document content to storage (DEPRECATED - please use retrieveContentOfDocument)
 @param Document docObject
 @since v1.0
 */
-(void)saveDocument:(id)arg;


/** Retrieve document content to storage
 @param Document docObject
 @since v1.1
 */
-(void)retrieveContentOfDocument:(id)arg;


/** Save document content to repo
 @param String name
 @param Folder parentFolder
 @param ContentFile file
 @param NodeProperties additionalProperties
 @since v1.1
 */
-(void)createDocumentWithName:(id)arg;


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


/** Delete node
 @param Node folder or document object
 @since v1.1
 */
-(void)deleteNode:(id)arg;


/** Retrieves a list of favorite documents for current user .
 @since v1.2
 */
-(void)retrieveFavoriteDocuments:(id)noargs;
    

/** Retrieves a list of favorite documents with a listing context for current user.
 @param listingContext The listing context with a paging definition that's used to retrieve favorite documents.
 @since v1.2
 */
-(void)retrieveFavoriteDocumentsWithListingContext:(id)arg;


/** Retrieves a list of favorite folders for current user.
 @since v1.2
 */
-(void)retrieveFavoriteFolders:(id)noargs;


/** Retrieves a list of favorite folders with a listing context for current user.
 @param listingContext The listing context with a paging definition that's used to retrieve favorite folders.
 @since v1.2
 */
-(void)retrieveFavoriteFoldersWithListingContext:(id)arg;


/** Retrieves a list of favorite nodes for current user.
 @since v1.2
 */
-(void)retrieveFavoriteNodes:(id)noargs;


/** Retrieves a list of favorite nodes with a listing context for current user.
 @param listingContext The listing context with a paging definition that's used to retrieve favorite nodes.
 @since v1.2
 */
-(void)retrieveFavoriteNodesWithListingContext:(id)arg;


/** Determine whether given node is favorite.
 @param node The node for which favorite status is being determined
 @since v1.2
 */
-(void)isFavorite:(id)arg;


/** Favorite a node.
 @param node The node which is to be favorited
 @since v1.2
 */
-(void)addFavorite:(id)arg;


/** UnFavorite a node.
 @param node The node which is to be unfavorited
 @since v1.2
 */
-(void)removeFavorite:(id)arg;


/**
 clears the Favorites cache
 @since v1.2
 */
-(void)clearFavoritesCache:(id)noargs;

	

//Internal

-(void)internalRetrieveNodeWithFolderPathRelative:(id)dictionary;

-(void)internalRetrieveRenditionOfNode:(id)dictionary;

-(void)internalRetrieveDocumentsInFolderWithListingContext:(id)arg;

-(void)internalRetrieveFoldersInFolderWithListingContext:(id)arg;

@end
