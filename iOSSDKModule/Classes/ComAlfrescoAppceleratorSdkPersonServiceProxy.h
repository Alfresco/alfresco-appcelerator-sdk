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
//  ComAlfrescoAppceleratorSdkPersonServiceProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 16/09/2013.
//
//



/**
 
 #Javascript object:#
 <code>PersonService</code>
 
#Javascript events:#
* **'error' - ** Sent upon error condition from any API.  ***Properties:*** *string errorstring, int errorcode*
* **'personnode' - ** Sent for each person node. ***Properties:*** *Person person*
* **'endenumeration' - ** Sent when no more nodes available.  ***Properties:*** *string eventsource, string eventobject*
* **'retrievedavatar' - ** Sent upon retrieval of avatar. ***Properties:*** *ContentFile contentfile, string personid*
 
*/

@interface ComAlfrescoAppceleratorSdkPersonServiceProxy : TiProxy
{
    AlfrescoPersonService* service;
}

/**
 Initialise the service
 @param RepositorySession session
*/
-(void)initialiseWithSession:(id)arg;


/**
 Retrieve person with identifier
 @param string identifier
 */
-(void)retrievePersonWithIdentifier:(id)arg;


/**
 Retrieve avatar for person
 @param Person person
 */
-(void)retrieveAvatarForPerson:(id)arg;


/** Returns a list of site members that respect the filter.
 @param filter - filter that needs to be applied to search query.
 @since v1.2
 */
-(void)search:(id)arg;

    
/** Returns a paged list of site members that respect the filter.
 @param filter - filter that needs to be applied to search query.
 @param listingContext - The listing context with a paging definition that's used to search for people.
 @since v1.2
 */
-(void)searchWithListingContext:(id)args;


/** Retrieve the latest (and complete) properties for person.
 @param The person which is to be refreshed with its latest properties
 @since v1.2
 */
-(void)refreshPerson:(id)arg;

@end
