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

#import "TiProxy.h"
#import "AlfrescoPersonService.h"


/**
 
 #Javascript object:#
 <code>PersonService</code>
 
#Javascript events:#
* **'error' - ** Sent upon error condition from any API.  ***Properties:*** *string errorstring, int errorcode*
* **'personnode' - ** Sent for each person node. ***Properties:*** *Person person*
* **'endenumeration' - ** Sent when no more nodes available.  ***Properties:*** *none*
* **'retrievedavatar' - ** Sent upon retrieval of avatar. ***Properties:*** *ContentFile contentfile*
 
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

@end
