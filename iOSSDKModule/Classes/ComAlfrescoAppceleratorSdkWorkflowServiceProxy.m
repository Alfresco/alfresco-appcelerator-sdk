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
//  ComAlfrescoAppceleratorSdkWorkflowServiceProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 20/03/2014.
//
//

#import "ComAlfrescoAppceleratorSdkWorkflowServiceProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "ComAlfrescoAppceleratorSdkProcessProxy.h"
#import "ComAlfrescoAppceleratorSdkProcessDefinitionProxy.h"
#import "ComAlfrescoAppceleratorSdkListingContextProxy.h"
#import "ComAlfrescoAppceleratorSdkTaskProxy.h"
#import "ComAlfrescoAppceleratorSdkContentFileProxy.h"
#import "ComAlfrescoAppceleratorSdkPersonProxy.h"
#import "ComAlfrescoAppceleratorSdkDocumentProxy.h"
#import "SDKUtil.h"


@implementation ComAlfrescoAppceleratorSdkWorkflowServiceProxy

-(void)initialiseWithSession:(id)arg
{
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkSessionProxy)
    
    ComAlfrescoAppceleratorSdkSessionProxy* sessionProxy = arg;
    
    if (sessionProxy == nil || sessionProxy.session == nil)
    {
        [SDKUtil createParamErrorEvent:self];
        return;
    }
    
    errorCode = [[NSError alloc]init];
    
    service = [[AlfrescoWorkflowService alloc] initWithSession:sessionProxy.session];
}


/**
 Retrieves a list of all processes.
 */
-(void)retrieveAllProcesses:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
    
    [service retrieveProcessesWithCompletionBlock:
     ^(NSArray* array, NSError* error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             for (int i = 0;  i < array.count;  i++)
             {
                 ComAlfrescoAppceleratorSdkProcessProxy* processProxy = [[ComAlfrescoAppceleratorSdkProcessProxy alloc]initWithProcess:array[i]];
                 
                 NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:processProxy, @"process", nil];
                 [self fireEvent:@"processnode" withObject:event];
             }
             
             [SDKUtil createEnumerationEndEvent:self eventSource:@"retrieveAllProcesses" eventObject:nil];
         }
     }];
}


/**
 Retrieves a list of all process Definitions.
 */
-(void)retrieveAllProcessDefinitions:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
    
    [service retrieveProcessDefinitionsWithCompletionBlock:
     ^(NSArray* array, NSError* error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             for (int i = 0;  i < array.count;  i++)
             {
                 ComAlfrescoAppceleratorSdkProcessDefinitionProxy* processProxy = [[ComAlfrescoAppceleratorSdkProcessDefinitionProxy alloc]initWithProcessDefinition:array[i]];
                 
                 NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:processProxy, @"processdefinition", nil];
                 [self fireEvent:@"processdefinitionnode" withObject:event];
             }
             
             [SDKUtil createEnumerationEndEvent:self eventSource:@"retrieveAllProcessDefinitions" eventObject:nil];
         }
     }];
}


/**
 Retrieves a paged result of processes in accordance to a listing context.
 @param listingContext The listing context with a paging definition that's used to retrieve the processes
 */
-(void)retrieveProcessesWithListingContext:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkListingContextProxy)
    
    [service retrieveProcessesWithListingContext:[arg listingContext]
     completionBlock:^(AlfrescoPagingResult* results, NSError* error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             for (int i = 0;  i < results.objects.count;  i++)
             {
                 ComAlfrescoAppceleratorSdkProcessProxy* processProxy = [[ComAlfrescoAppceleratorSdkProcessProxy alloc]initWithProcess:results.objects[i]];
                 
                 NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:processProxy, @"process", nil];
                 [self fireEvent:@"processnode" withObject:event];
             }
             
             [SDKUtil createEventWithPagingResult:results proxyObject:self];
             [SDKUtil createEnumerationEndEvent:self eventSource:@"retrieveProcessesWithListingContext" eventObject:arg];
         }
     }];
}


/**
 Retrieves a paged result of process definitions in accordance to a listing context.
 @param listingContext The listing context with a paging definition that's used to retrieve the processes
 */
-(void)retrieveProcessDefinitionsWithListingContext:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkListingContextProxy)
    
    [service retrieveProcessDefinitionsWithListingContext:[arg listingContext]
                                 completionBlock:^(AlfrescoPagingResult* results, NSError* error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             for (int i = 0;  i < results.objects.count;  i++)
             {
                 ComAlfrescoAppceleratorSdkProcessDefinitionProxy* processProxy = [[ComAlfrescoAppceleratorSdkProcessDefinitionProxy alloc]initWithProcessDefinition:results.objects[i]];
                 
                 NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:processProxy, @"processdefinition", nil];
                 [self fireEvent:@"processdefinitionnode" withObject:event];
             }
             
             [SDKUtil createEventWithPagingResult:results proxyObject:self];
             [SDKUtil createEnumerationEndEvent:self eventSource:@"retrieveProcessesWithListingContext" eventObject:arg];
         }
     }];
}


/**
 Retrieves a process for a given process identifier.
 @param processID The process identifier of the process to retrieve
 */
-(void)retrieveProcessWithIdentifier:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    NSString* processID = [arg objectAtIndex:0];
    
    [service retrieveProcessWithIdentifier:processID
     completionBlock:^(AlfrescoWorkflowProcess* process, NSError* error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             ComAlfrescoAppceleratorSdkProcessProxy* processProxy = [[ComAlfrescoAppceleratorSdkProcessProxy alloc]initWithProcess:process];
             
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:processProxy, @"process", nil];
             [self fireEvent:@"processnode" withObject:event];
         }
     }];

}


/**
 Retrieves an array of all tasks that the user is able to see. Tasks are returned if created by the user, or if the user is involved in the task.
 @param process The process for which task(s) should be retrieved
 */
-(void)retrieveAllTasksForProcess:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkProcessProxy)
    
    [service retrieveTasksForProcess:[arg performSelector:NSSelectorFromString(@"process")]
     completionBlock:^(NSArray* array, NSError* error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             for (int i = 0;  i < array.count;  i++)
             {
                 ComAlfrescoAppceleratorSdkTaskProxy* taskProxy = [[ComAlfrescoAppceleratorSdkTaskProxy alloc]initWithTask:array[i]];
                 
                 NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:taskProxy, @"task", nil];
                 [self fireEvent:@"tasknode" withObject:event];
             }
             
             [SDKUtil createEnumerationEndEvent:self eventSource:@"retrieveAllTasksForProcess" eventObject:arg];
         }
     }];
}


/**
 Retrieves an image of the given process. An image is only returned if the user has started the process or is involved in any of the tasks.
 @param process The process for which an image should be retrieved
 */
-(void)retrieveProcessImage:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkProcessProxy)
    
    [service retrieveImageForProcess: [arg performSelector:NSSelectorFromString(@"process")]
                     completionBlock:^(AlfrescoContentFile* file, NSError* error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             ComAlfrescoAppceleratorSdkContentFileProxy* cfProxy = [[ComAlfrescoAppceleratorSdkContentFileProxy alloc]initWithContentFile:file];
             
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:cfProxy, @"contentfile", arg, @"process", nil];
             [self fireEvent:@"retrievedimage" withObject:event];
         }
     }];
}


/**
 Creates and returns a process for a given process definition.
 @param processDefinition The process definition the process should be modeled on
 @param assignees (optional, can be null) An array of AlfrescoPerson's to assign to the task. If this is left blank, the process will be assigned to the creator
 @param variables (optional, can be null) An object of process properties to add at the start of the process. Variable keys must be the same as those defined in the workflow model definition in the repository
 @param attachments (optional, can be null) An array of Document objects to add to the process
 */
-(void)startProcessForProcessDefinition:(id)args
{
    ENSURE_UI_THREAD_1_ARG(args)
    ComAlfrescoAppceleratorSdkProcessDefinitionProxy* processDefProxy = [args objectAtIndex:0];
    NSArray* peopleProxy = [args objectAtIndex:1];
    NSDictionary* variables = [args objectAtIndex:2];
    NSArray* attachmentsProxy = [args objectAtIndex:3];
    
    NSMutableArray* people = nil;
    NSMutableArray* attachments = nil;
    
    if (peopleProxy && peopleProxy.count)
    {
        people = [[NSMutableArray alloc]init];
        
        for (int i = 0;  i < peopleProxy.count;  i++)
            [people addObject:[peopleProxy[i] performSelector:NSSelectorFromString(@"person")]];
    }
    
    if (attachmentsProxy && attachmentsProxy.count)
    {
        attachments = [[NSMutableArray alloc]init];
        
        for (int i = 0;  i < attachmentsProxy.count;  i++)
            [attachments addObject:[attachmentsProxy[i] performSelector:NSSelectorFromString(@"node")]];
    }
    
    
    [service startProcessForProcessDefinition:[processDefProxy performSelector:NSSelectorFromString(@"processDefinition")] assignees:people
     variables:variables attachments:attachments
     completionBlock:^(AlfrescoWorkflowProcess* process, NSError* error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             ComAlfrescoAppceleratorSdkProcessProxy* processProxy = [[ComAlfrescoAppceleratorSdkProcessProxy alloc]initWithProcess:process];
             
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:processProxy, @"process", nil];
             [self fireEvent:@"processnode" withObject:event];
         }
     }];
}


/**
 Deletes a process.
 @param process The process to delete
 */
-(void)deleteProcess:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkProcessProxy)
    
    [service deleteProcess:[arg performSelector:NSSelectorFromString(@"process")]
     completionBlock:^(BOOL succeeded, NSError *error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else if (succeeded)
         {
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:arg, @"process", nil];
             [self fireEvent:@"deletedProcess" withObject:event];
         }
     }];
}


/**
 Retrieves a process definition for a specific process identifier.
 @param processDefinitionId The process definition identifier for the process definition to be retrieved
 */
-(void)retrieveProcessDefinitionWithIdentifier:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSString)
    
    [service retrieveProcessDefinitionWithIdentifier:arg
     completionBlock:^(AlfrescoWorkflowProcessDefinition *processDefinition, NSError *error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             ComAlfrescoAppceleratorSdkProcessDefinitionProxy* processProxy = [[ComAlfrescoAppceleratorSdkProcessDefinitionProxy alloc]initWithProcessDefinition:processDefinition];
             
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:processProxy, @"processdefinition", nil];
             [self fireEvent:@"processdefinitionnode" withObject:event];
         }
     }];
}


/**
 Retrieves a list of all tasks.
 */
-(void)retrieveAllTasks:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
    
    [service retrieveTasksWithCompletionBlock:
     ^(NSArray* array, NSError* error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             for (int i = 0;  i < array.count;  i++)
             {
                 ComAlfrescoAppceleratorSdkTaskProxy* taskProxy = [[ComAlfrescoAppceleratorSdkTaskProxy alloc]initWithTask:array[i]];
                 
                 NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:taskProxy, @"task", nil];
                 [self fireEvent:@"tasknode" withObject:event];
             }
             
             [SDKUtil createEnumerationEndEvent:self eventSource:@"retrieveAllTasks" eventObject:nil];
         }
     }];
}


/**
 Retrieves a paged result of the tasks the authenticated user is allowed to see.
 @param listingContext The listing context with a paging definition that's used to retrieve the tasks
 */
-(void)retrieveTasksWithListingContext:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkListingContextProxy)
    
    [service retrieveTasksWithListingContext:[arg listingContext]
     completionBlock:^(AlfrescoPagingResult *pagingResult, NSError *error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             for (int i = 0;  i < pagingResult.objects.count;  i++)
             {
                 ComAlfrescoAppceleratorSdkTaskProxy* taskProxy = [[ComAlfrescoAppceleratorSdkTaskProxy alloc]initWithTask:pagingResult.objects[i]];
                 
                 NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:taskProxy, @"task", nil];
                 [self fireEvent:@"tasknode" withObject:event];
             }
             [SDKUtil createEventWithPagingResult:pagingResult proxyObject:self];
             [SDKUtil createEnumerationEndEvent:self eventSource:@"retrieveTasksWithListingContext" eventObject:arg];
         }
     }];
}


/**
 Retrieves the task for a specific task identifier.
 @param taskIdentifier The task identifier for the task to retrieve
 */
-(void)retrieveTaskWithIdentifier:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSString)
    
    [service retrieveTaskWithIdentifier:arg completionBlock:^(AlfrescoWorkflowTask *task, NSError *error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             ComAlfrescoAppceleratorSdkTaskProxy* taskProxy = [[ComAlfrescoAppceleratorSdkTaskProxy alloc]initWithTask:task];
             
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:taskProxy, @"task", nil];
             [self fireEvent:@"tasknode" withObject:event];
         }
     }];
}


/**
 Retrieves an array of AlfrescoNode's for a specific task. If there are no attachments, nil is returned in the completion block.
 @param task The task for which attachements should be retrieved
 */
-(void)retrieveAttachmentsForTask:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkTaskProxy)
    
    [service retrieveAttachmentsForTask:[arg performSelector:NSSelectorFromString(@"task")]
     completionBlock:^(NSArray *array, NSError *error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             for (int i = 0;  i < array.count;  i++)
             {
                 [SDKUtil createEventWithNode:[array objectAtIndex:i] proxyObject:self];
             }
         }
         [SDKUtil createEnumerationEndEvent:self eventSource:@"retrieveAttachmentsForTask" eventObject:arg];
     }];

}


/**
 Completes a given task.
 @param task The task that should be marked as complete
 @param properties Any properties to add to the task
 */
-(void)completeTask:(id)args
{
    ENSURE_UI_THREAD_1_ARG(args)
    ComAlfrescoAppceleratorSdkTaskProxy* taskProxy = [args objectAtIndex:0];
    NSDictionary* properties = [args objectAtIndex:1];
    
    [service completeTask:[taskProxy performSelector:NSSelectorFromString(@"task")]
     properties:properties
     completionBlock:^(AlfrescoWorkflowTask *task, NSError *error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:taskProxy, @"task", nil];
             [self fireEvent:@"completedtask" withObject:event];
         }
     }];
}


/**
 Claims the task for the authenticated user.
 @param task The task to be claimed by the authenticated user
 */
-(void)claimTask:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ComAlfrescoAppceleratorSdkTaskProxy* taskProxy = [arg objectAtIndex:0];
    
    [service claimTask:[taskProxy performSelector:NSSelectorFromString(@"task")]
          completionBlock:^(AlfrescoWorkflowTask *task, NSError *error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:taskProxy, @"task", nil];
             [self fireEvent:@"claimedtask" withObject:event];
         }
     }];
}


/**
 Unclaims a task and sets the assignee to "Unassigned".
 @param task The task the be unclaimed by the authenticated user
 @param properties Any properties to add to the task before completion
 */
-(void)unclaimTask:(id)args
{
    ENSURE_UI_THREAD_1_ARG(args)
    ComAlfrescoAppceleratorSdkTaskProxy* taskProxy = [args objectAtIndex:0];
    
    [service unclaimTask:[taskProxy performSelector:NSSelectorFromString(@"task")]
       completionBlock:^(AlfrescoWorkflowTask *task, NSError *error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:taskProxy, @"task", nil];
             [self fireEvent:@"unclaimedtask" withObject:event];
         }
     }];
}


/**
 Assigns the given task to an assignee.
 @param task The task to be assigned
 @param assignee To whom the task should be assigned
 */
-(void)assignTask:(id)args
{
    ENSURE_UI_THREAD_1_ARG(args)
    ComAlfrescoAppceleratorSdkTaskProxy* taskProxy = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkPersonProxy* personProxy = [args objectAtIndex:1];
    
    [service reassignTask:[taskProxy performSelector:NSSelectorFromString(@"task")] toAssignee:[personProxy performSelector:NSSelectorFromString(@"person")]
     completionBlock:^(AlfrescoWorkflowTask *task, NSError *error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:taskProxy, @"task", nil];
             [self fireEvent:@"assignedtask" withObject:event];
         }
     }];
}


/**
 Resolves the given task and assigns it back to the owner.
 @param task The task which should be resolved
 */
-(void)resolveTask:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ComAlfrescoAppceleratorSdkTaskProxy* taskProxy = [arg objectAtIndex:0];
    
    [service resolveTask:[taskProxy performSelector:NSSelectorFromString(@"task")]
       completionBlock:^(AlfrescoWorkflowTask *task, NSError *error)
     {
         errorCode = error;
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:taskProxy, @"task", nil];
             [self fireEvent:@"resolvedtask" withObject:event];
         }
     }];
}


/**
 Adds a single attachment to a given task.
 @param node The document object that should be added to the task
 @param task The task which the node should be attached
 */
-(void)addAttachment:(id)args
{
    ENSURE_UI_THREAD_1_ARG(args)
    ComAlfrescoAppceleratorSdkDocumentProxy* docProxy = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkTaskProxy* taskProxy = [args objectAtIndex:1];
    
    [service addAttachmentToTask: [taskProxy performSelector:NSSelectorFromString(@"task")]
     attachment:[docProxy performSelector:NSSelectorFromString(@"node")]
     completionBlock:^(BOOL succeeded, NSError *error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:taskProxy, @"task", nil];
             [self fireEvent:@"addedattachment" withObject:event];
         }
     }];
}


/**
 Adds an array of attachments to a given task.
 @param nodeArray An array of Document objects that should be added to the task
 @param task The task to which the nodes should be attached
 */
-(void)addAttachments:(id)args
{
    ENSURE_UI_THREAD_1_ARG(args)
    NSArray* docsProxy = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkTaskProxy* taskProxy = [args objectAtIndex:1];
    
    NSMutableArray* docs = [[NSMutableArray alloc]init];
    for (int i = 0;  i < docsProxy.count;  i++)
        [docs addObject:[docsProxy[i] performSelector:NSSelectorFromString(@"node")]];
    
    [service addAttachmentsToTask: [taskProxy performSelector:NSSelectorFromString(@"task")]
     attachments:docs
     completionBlock:^(BOOL succeeded, NSError *error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:taskProxy, @"task", nil];
             [self fireEvent:@"addedattachments" withObject:event];
         }
     }];
}


/**
 Removes an attachment from a specific task.
 @param node The node that should be removed from the task
 @param task The task from which the node should be removed
 */
-(void)removeAttachment:(id)args
{
    ENSURE_UI_THREAD_1_ARG(args)
    ComAlfrescoAppceleratorSdkDocumentProxy* docProxy = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkTaskProxy* taskProxy = [args objectAtIndex:1];
    
    [service removeAttachmentFromTask:[taskProxy performSelector:NSSelectorFromString(@"task")]
     attachment:[docProxy performSelector:NSSelectorFromString(@"node")]
     completionBlock:^(BOOL succeeded, NSError *error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:taskProxy, @"task", nil];
             [self fireEvent:@"removedattachment" withObject:event];
         }
     }];
}

@end
