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
//  ComAlfrescoAppceleratorSdkCommentService.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 12/09/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoCommentService.h"

/**
#Javascript object:#
<code>CommentService</code>
 
#Javascript events:#
* **'error' - ** Sent upon error condition from any API.  ***Properties:*** *string errorstring, int errorcode*
* **'commentnode' - ** Sent for each comment node.  ***Properties:*** *Comment comment*
* **'pagingresult' - ** Sent when using ListingContext.  ***Properties:*** *int hasmoreitems, int totalitems*
* **'endenumeration' - ** Sent when no more nodes available.  ***Properties:*** *none*
 
*/

@interface ComAlfrescoAppceleratorSdkCommentServiceProxy : TiProxy
{
    AlfrescoCommentService* service;
    NSError* errorCode;
}


/** Initialise the service
 @param RepositorySession session
 @since v1.0
 */
-(void)initialiseWithSession:(id)arg;


/** Retrieve comments for a give document or folder object
 @param Document or Folder object
 @since v1.0
 */
-(void)retrieveCommentsForNode:(id)arg;


/** Retrieve comments for a give document or folder object, with listing context
 @param Document or Folder object
 @param ListingContext listingContext
 @since v1.0
 */
-(void)retrieveCommentsForNodeWithListingContext:(id)args;

@end
