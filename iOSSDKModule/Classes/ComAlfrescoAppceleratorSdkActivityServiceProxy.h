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
//  ComAlfrescoAppceleratorSdkActivityServiceProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 19/08/2013.
//
//

#import "TiProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "AlfrescoActivityStreamService.h"

/**
#Javascript object:#
<code>ActivityService</code>
 
#Javascript events:#
* **'error' - ** Sent upon error condition from any API.  ***Properties:*** *string errorstring, int errorcode*
* **'activitynode' - ** Sent for each activity node. ***Properties:*** *Activity activity*
* **'pagingresult' - ** Sent when using ListingContext.  ***Properties:*** *int hasmoreitems, int totalitems*
* **'endenumeration' - ** Sent when no more nodes available.  ***Properties:*** *string eventsource, string eventobject*

*/

@interface ComAlfrescoAppceleratorSdkActivityServiceProxy : TiProxy
{
    AlfrescoActivityStreamService* service;
    NSError* errorCode;
}

/** Initialises the service
 @param RepositorySession session
 */
-(void)initialiseWithSession:(id)arg;


/** Retrieves all activities for the logged-in user.
 */
-(void)retrieveActivityStream:(id)noargs;


/** Retrieves all activities for the logged-in user with listing context
 @param ListingContext listingContext
 */
-(void)retrieveActivityStreamWithListingContext:(id)arg;


/** Retrieves activities for the given person.
 @param Person person
 */
-(void)retrieveActivityStreamForPerson:(id)arg;


/** Retrieves activities for the given person, with listing context.
@param Person person
@param ListingContext listingContext
*/
-(void)retrieveActivityStreamForPersonWithListingContext:(id)args;


/** Retrieves activities for the given site.
 @param Site site
 */
-(void)retrieveActivityStreamForSite:(id)arg;


/** Retrieves activities for the given site.
 @param Site site
 @param ListingContext listingContext
 */
-(void)retrieveActivityStreamForSiteWithListingContext:(id)args;




//Internal
-(void)createEventWithActivityEntry:(AlfrescoActivityEntry*)entry;
-(void)internalRetrieveForSite:(id)arg;
-(void)internalRetrieveForPerson:(id)arg;

@end
