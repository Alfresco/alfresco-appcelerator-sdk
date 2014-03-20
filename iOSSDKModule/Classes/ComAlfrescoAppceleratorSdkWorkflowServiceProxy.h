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
//  ComAlfrescoAppceleratorSdkWorkflowServiceProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 20/03/2014.
//
//


/**
 #Javascript object:#
 <code>WorkflowService</code>
 
#Javascript events:#
* **'error' - ** Sent upon error condition from any API.  ***Properties:*** *string errorstring, int errorcode*
* **'documentnode' - ** Sent for each document node.  ***Properties:*** *Document document*
* **'foldernode' - ** Sent for each folder node.  ***Properties:*** *Folder folder*
* **'endenumeration' - ** Sent when no more nodes available.  ***Properties:*** *string eventsource, string eventobject*

 
*/

@interface ComAlfrescoAppceleratorSdkWorkflowServiceProxy : TiProxy
{
    AlfrescoWorkflowService* service;
    NSError* errorCode;
}

/**
 Initialise the service
 @param RepositorySession session
 */
-(void)initialiseWithSession:(id)arg;



@end
