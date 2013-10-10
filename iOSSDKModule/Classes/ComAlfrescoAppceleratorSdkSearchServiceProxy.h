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
//  ComAlfrescoAppceleratorSdkSearchServiceProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 27/08/2013.
//
//

#import "TiProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "AlfrescoSearchService.h"


/** SearchService
 
Javascript events:
 'error' (Properties: string errorstring, int errorcode)
 'documentnode' (Properties: Document document)
 'foldernode' (Properties: Folder folder)
 'pagingresult' (Properties: int hasmoreitems, int totalitems)
 'endenumeration'
 
 @since v1.0
 */

@interface ComAlfrescoAppceleratorSdkSearchServiceProxy : TiProxy
{
    AlfrescoSearchService* service;
    NSError* errorCode;
}


/** Initialise the service
 @param RepositorySession session
 @since v1.0
 */
-(void)initialiseWithSession:(id)arg;


/** Search with statement
 @param string statementString
 @since v1.0
 */
-(void)searchWithStatement:(id)arg;


/** Search with statement and listing context
 @param string statementString
 @param ListingContext listingContextObject
 @since v1.0
 */
-(void)searchWithStatementAndListingContext:(id)args;


/** Search with keywords
 @param KeywordSearchOptions searchOptionsObject
 @since v1.0
 */
-(void)searchWithKeywords:(id)args;


/** Search with keywords and listing context
 @param KeywordSearchOptions searchOptionsObject
 @param ListingContext listingContextObject
 @since v1.0
 */
-(void)searchWithKeywordsAndListingContext:(id)args;



//Internal

-(void)internalSearchWithStatement:(id)dictionary;

-(void)internalSearchWithKeywords:(id)dictionary;

@end
