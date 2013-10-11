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
//  ComAlfresconAppceleratorSdkSiteProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 19/08/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoSite.h"

/**
#Javascript object:#
<code>Site</code>
 
#Javascript properties:#
* string shortName
* string title
* string summary
* string identifier
* string GUID
* boolean isMember
* boolean isPendingMember
* boolean isFavorite
 
*/

@interface ComAlfrescoAppceleratorSdkSiteProxy : TiProxy

- (id)initWithSite:(AlfrescoSite *)site;
- (id)getSiteName:(id)args;

- (void)dealloc;

@end
