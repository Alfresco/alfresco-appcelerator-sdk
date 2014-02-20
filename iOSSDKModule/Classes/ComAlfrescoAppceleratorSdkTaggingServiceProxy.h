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
//  ComAlfrescoAppceleratorSdkTaggingServiceProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 19/09/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoTaggingService.h"
 

/**
 #Javascript object:#
 <code>TaggingService</code>
 
#Javascript events:#
* **'error' - ** Sent upon error condition from any API.  ***Properties:*** *string errorstring, int errorcode*
* **'tagnode' - ** Sent for each tag node.  ***Properties:*** *Tag tag*
* **'pagingresult' - ** Sent when using ListingContext.  ***Properties:*** *int hasmoreitems, int totalitems*
* **'endenumeration' - ** Sent when no more nodes available.  ***Properties:*** *string eventsource, string eventobject*
* **'addedtags' - ** Sent when tags have been added.  ***Properties:*** *none* 
*/

@interface ComAlfrescoAppceleratorSdkTaggingServiceProxy : TiProxy
{
    AlfrescoTaggingService* service;
    NSError* errorCode;
}


/**
 Initialise the service
 @param RepositorySession session
*/
-(void)initialiseWithSession:(id)arg;


/**
 Retrieve all tags
*/
-(void)retrieveAllTags:(id)noargs;


/**
 Retrieve all tags
 @param Folder or Document object
 */
-(void)retrieveTagsForNode:(id)arg;


/** Adds the given tags to the given node.
 @param Array of strings containing tags that should be added.
 @param The node to which the tags should be added.
 @since v1.1
 */
-(void)addTags:(id)args;

@end
