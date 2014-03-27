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


/**
 Retrieves a list of all processes.
 */
-(void)retrieveAllProcesses:(id)noargs;


/**
 Retrieves a list of all process Definitions.
 */
-(void)retrieveAllProcessDefinitions:(id)noargs;


/**
 Retrieves a paged result of processes in accordance to a listing context.
 @param listingContext The listing context with a paging definition that's used to retrieve the processes
 */
-(void)retrieveProcessesWithListingContext:(id)arg;


/**
 Retrieves a paged result of process definitions in accordance to a listing context.
 @param listingContext The listing context with a paging definition that's used to retrieve the processes
 */
-(void)retrieveProcessDefinitionsWithListingContext:(id)arg;


/**
 Retrieves a process for a given process identifier.
 @param processID The process identifier of the process to retrieve
 */
-(void)retrieveProcessWithIdentifier:(id)arg;


/**
 Retrieves an array of all tasks that the user is able to see. Tasks are returned if created by the user, or if the user is involved in the task.
 @param process The process for which task(s) should be retrieved
 */
-(void)retrieveAllTasksForProcess:(id)arg;


/**
 Retrieves an image of the given process. An image is only returned if the user has started the process or is involved in any of the tasks.
 @param process The process for which an image should be retrieved
 */
-(void)retrieveProcessImage:(id)arg;


/**
 Creates and returns a process for a given process definition.
 @param processDefinition The process definition the process should be modeled on
 @param assignees (optional, can be null) An array of AlfrescoPerson's to assign to the task. If this is left blank, the process will be assigned to the creator
 @param variables (optional, can be null) An object of process properties to add at the start of the process. Variable keys must be the same as those defined in the workflow model definition in the repository
 @param attachments (optional, can be null) An array of Document objects to add to the process
 */
-(void)startProcessForProcessDefinition:(id)args;


/**
 Deletes a process.
 @param process The process to delete
 */
-(void)deleteProcess:(id)arg;


/**
 Retrieves a process definition for a specific process identifier.
 @param processDefinitionId The process definition identifier for the process definition to be retrieved
 */
-(void)retrieveProcessDefinitionWithIdentifier:(id)arg;


/**
 Retrieves a list of all tasks.
 */
-(void)retrieveAllTasks:(id)noargs;


/**
 Retrieves a paged result of the tasks the authenticated user is allowed to see.
 @param listingContext The listing context with a paging definition that's used to retrieve the tasks
 */
-(void)retrieveTasksWithListingContext:(id)arg;


/**
 Retrieves the task for a specific task identifier.
 @param taskIdentifier The task identifier for the task to retrieve
 */
-(void)retrieveTaskWithIdentifier:(id)arg;


/**
 Retrieves an array of AlfrescoNode's for a specific task. If there are no attachments, nil is returned in the completion block.
 @param task The task for which attachements should be retrieved
 */
-(void)retrieveAttachmentsForTask:(id)arg;


/**
 Completes a given task.
 @param task The task that should be marked as complete
 @param properties Any properties to add to the task
 */
-(void)completeTask:(id)args;


/**
 Claims the task for the authenticated user.
 @param task The task to be claimed by the authenticated user
 */
-(void)claimTask:(id)arg;


/**
 Unclaims a task and sets the assignee to "Unassigned".
 @param task The task the be unclaimed by the authenticated user
 @param properties Any properties to add to the task before completion
 */
-(void)unclaimTask:(id)args;


/**
 Assigns the given task to an assignee.
 @param task The task to be assigned
 @param assignee To whom the task should be assigned
 */
-(void)assignTask:(id)args;


/**
 Resolves the given task and assigns it back to the owner.
 @param task The task which should be resolved
 */
-(void)resolveTask:(id)arg;


/**
 Adds a single attachment to a given task.
 @param node The document object that should be added to the task
 @param task The task which the node should be attached
 */
-(void)addAttachment:(id)args;


/**
 Adds an array of attachments to a given task.
 @param nodeArray An array of Document objects that should be added to the task
 @param task The task to which the nodes should be attached
 */
-(void)addAttachments:(id)args;


/**
 Removes an attachment from a specific task.	 
 @param node The node that should be removed from the task
 @param task The task from which the node should be removed
 */
-(void)removeAttachment:(id)args;

@end
