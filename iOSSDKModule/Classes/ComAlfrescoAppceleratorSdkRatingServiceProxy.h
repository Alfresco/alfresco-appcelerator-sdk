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
//  ComAlfrescoAppceleratorSdkRatingService.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 12/09/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoRatingService.h"

/**
#Javascript object:#
<code>RatingService</code>
 
#Javascript events:#
* **'error' - ** Sent upon error condition from any API.  ***Properties:*** *string errorstring, int errorcode*
* **'retrievedlikecount' - ** Sent when retrieved like count.  ***Properties:*** *integer count*
* **'retrievedisliked' - ** Sent when liked status retrieved.  ***Properties:*** *int isliked (1 or 0)*
* **'likednode' - ** Sent when like state has been set true.  ***Properties:*** *none*
* **'unlikednode' - ** Sent when like state has been set false.  ***Properties:*** *none*
*/

@interface ComAlfrescoAppceleratorSdkRatingServiceProxy : TiProxy
{
    AlfrescoRatingService* service;
    NSError* errorCode;
}


/** Initialise the service
 @param RepositorySession session
 @since v1.1
 */
-(void)initialiseWithSession:(id)arg;


/** Retrieves the number of likes for the given node.
 @param The node for which the like count needs to be retrieved.
 @since v1.1
 */
-(void)retrieveLikeCountForNode:(id)arg;


/** Has the user liked the given node?
 @param The node for which the like rating should be validated.
 @since v1.1
 */
-(void)isNodeLiked:(id)arg;


/** Adds a like rating to the given node.
 @param The node for which the like rating should be added.
 @since v1.1
 */
-(void)likeNode:(id)arg;


/** Removes the like rating from the given node.
 @param The node for which the like rating should be removed.
 @since v1.1
 */
-(void)unlikeNode:(id)arg;


@end
