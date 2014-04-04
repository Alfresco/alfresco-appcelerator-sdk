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
//  AlfrescoSiteServiceProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 14/08/2013.
//
//

#import "TiProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"


/**
 
#Javascript object:#
<code>SiteService</code>

 
#Javascript events:#
* **'error' - ** Sent upon error condition from any API.  ***Properties:*** *string errorstring, int errorcode*
* **'sitesnode' - ** Sent for each site node.  ***Properties:*** *Site site*
* **'allsitesnode' - ** Sent for each site node.  ***Properties:*** *Site site*
* **'mysitesnode' - ** Sent for each of current users site nodes.  ***Properties:*** *Site site*
* **'favsitesnode' - ** Sent for each favourite site node.  ***Properties:*** *Site site*
* **'retrieveddocumentfolder' - ** Sent upon retrieval of site's repository folder.  ***Properties:*** *Folder folder*
* **'pagingresult' - ** Sent when using ListingContext.  ***Properties:*** *int hasmoreitems, int totalitems*
* **'endenumeration' - ** Sent when no more nodes available.  ***Properties:*** *string eventsource, string eventobject*
* **'siteupdated' - ** Sent when site has been updated with changes.  ***Properties:*** *Site site*
* **'retrievedpendingsite' - ** Sent for each pending site.  ***Properties:*** *Site site*
* **'retrievedmembership' - ** Sent upon membership retrieval.  ***Properties:*** *int ismember*
* **'personnode' - ** Sent for each member.  ***Properties:*** *Person person*
 
*/

@interface ComAlfrescoAppceleratorSdkSiteServiceProxy : TiProxy
{
    AlfrescoSiteService* service;
    NSError* errorCode;
}


/** Initialise the service
 @param RepositorySession session
 @since v1.0
 */
-(void)initialiseWithSession:(id)arg;


/** Retrieve all sites
 @since v1.0
 */
-(void)retrieveAllSites:(id)noargs;


/** Retrieve users sites
 @since v1.0
 */
-(void)retrieveSites:(id)noargs;


/** Retrieve favorite sites.
 @since v1.0
 */
-(void)retrieveFavoriteSites:(id)noargs;


/** Retrieve a site object from site name.
 @param string siteName
 @since v1.0
 */
-(void)retrieveSiteWithShortName:(id)arg;


/** Retrieve document library folder object for site.
 @param Site siteObject
 @since v1.0
 */
-(void)retrieveDocumentLibraryFolderForSite:(id)arg;


/** Clear sites cahce
 @since v1.0
 */
-(void)clearSitesCache:(id)noargs;


/**
 Marks a site as favorite and adds it to the favorite list
 @param The site object to be added to favorites
 @since v1.1
 */
-(void)addFavoriteSite:(id)arg;


/**
 Unmarks a site as favorite and removes it from the favorite list
 @param The site to be added to favorites
 @since v1.1
 */
-(void)removeFavoriteSite:(id)arg;


/**
 Creates a request to join a site. Please, note, this method works for both joining public and joining moderated sites.
 For public sites, the same AlfrescoSite object will be returned.
 For moderated sites, an updated AlfrescoSite object will be returned - with pending flag set to YES.
 @param The site to join.
 @since v1.1
 */
-(void)joinSite:(id)arg;


/**
 Retrieves a list of sites for which a join request is pending
 @since v1.1
 */
-(void)retrievePendingSites:(id)noargs;


/**
 Retrieves a list of pending join request sites with a specified listing context
 @param listing context
 @since v1.1
 */
-(void)retrievePendingSitesWithListingContext:(id)arg;


/**
 Cancels a join request for a specified site
 @param The pending site for which the join request is to be cancelled
 @since v1.1
 */
-(void)cancelPendingJoinRequestForSite:(id)arg;


/**
 Leave a site
 @param site
 @since v1.1
 */
-(void)leaveSite:(id)arg;

 
/** Returns a list of all members for a site.
 @param site - site from which members are retrieved
 @since v1.2
 */
-(void)retrieveAllMembers:(id)arg;


/** Returns a paged list of all members for a site.
 @param site - site from which members are retrieved
 @param listingContext - The listing context with a paging definition that's used to retrieve members.
 @since v1.2
 */
-(void)retrieveAllMembersWithListingContext:(id)args;
    

/** Returns a paged list of all members for a site that respect the filter.
 @param site - site from which members are retrieved
 @param filter - filter that needs to be applied to search query.
 @param listingContext - The listing context with a paging definition that's used to retrieve members.
 @since v1.2
 */
-(void)searchMembers:(id)args;


/** Returns true if the person is member of the site, returns false otherwise
 @param person - person for whom membership status is retrieved
 @param site - site from which membership status for the person is retrieved
 @since v1.2
 */
-(void)isPersonMember:(id)args;


//Internal
-(void)createEventWithSite:(AlfrescoSite*)site context:(NSString*)context;

@end
