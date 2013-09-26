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

@interface ComAlfrescoAppceleratorSdkSiteServiceProxy : TiProxy
{
    AlfrescoSiteService* service;
    NSError* errorCode;
}

-(void)initialiseWithSession:(id)arg;

-(void)retrieveAllSites:(id)noargs;
-(void)retrieveSites:(id)noargs;
-(void)retrieveFavoriteSites:(id)noargs;
-(void)retrieveSiteWithShortName:(id)arg;
-(void)retrieveDocumentLibraryFolderForSite:(id)arg;
-(void)clearSitesCache:(id)noargs;


//Internal
-(void)createEventWithSite:(AlfrescoSite*)site context:(NSString*)context;

@end
