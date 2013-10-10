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
#import "AlfrescoSiteService.h"


/** SiteService
 
Javascript events:
 'error' (Properties: string errorstring, int errorcode)
 'sitesnode' (Properties: Site site)
 'allsitesnode' (Properties: Site site)
 'mysitesnode' (Properties: Site site)
 'favsitesnode' (Properties: Site site)
 'pagingresult' (Properties: int hasmoreitems, int totalitems)
 'endenumeration'
 
 @since v1.0
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



//Internal
-(void)createEventWithSite:(AlfrescoSite*)site context:(NSString*)context;

@end
