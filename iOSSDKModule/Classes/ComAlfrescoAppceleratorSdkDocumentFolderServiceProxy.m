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
//  AlfrescoDocumentFolderServiceProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 29/05/2013.
//
//


#import "ComAlfrescoAppceleratorSdkDocumentFolderServiceProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "ComAlfrescoAppceleratorSdkFolderProxy.h"
#import "ComAlfrescoAppceleratorSdkDocumentProxy.h"
#import "ComAlfrescoAppceleratorSdkContentFileProxy.h"
#import "ComAlfrescoAppceleratorSdkListingContextProxy.h"
#import "ComAlfrescoAppceleratorSdkPermissionsProxy.h"

#import "AlfrescoFolder.h"
#import <objc/runtime.h>
#import "TiUtils.h"
#import "SDKUtil.h"


@implementation ComAlfrescoAppceleratorSdkDocumentFolderServiceProxy


-(void)initialiseWithSession:(id)arg
{ 
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkSessionProxy)
    
    ComAlfrescoAppceleratorSdkSessionProxy* sessionProxy = arg;
    
    if (sessionProxy == nil || sessionProxy.session == nil)
    {
        [SDKUtil createParamErrorEvent:self];
        return;
    }
    
    currentFolder = nil;
    errorCode = [[NSError alloc]init];
    
    service = [[AlfrescoDocumentFolderService alloc] initWithSession:sessionProxy.session];
}


-(void)retrieveRootFolder:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
    
    [service retrieveRootFolderWithCompletionBlock:
     ^(AlfrescoFolder* folder, NSError* error)
    {
        currentFolder = folder;
        errorCode = error;
        if (error != NULL)
        {
            [SDKUtil createErrorEvent:error proxyObject:self];
        }
        else
        {
            NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:folder.name, @"folder", nil];
            [self fireEvent:@"retrievedfolder" withObject:event];
        }
    }];
}

 
-(void)setFolder:(id)arg
{
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkFolderProxy)
    
    NSLog(@"[INFO] folder arg object: %@", arg);
    ComAlfrescoAppceleratorSdkFolderProxy* folder = arg;

    currentFolder = [folder performSelector:NSSelectorFromString(@"node")];
    NSLog(@"[INFO] folder object set: %@ (name: %@)", folder, currentFolder.name);
}


-(id)getCurrentFolder:(id)noargs
{
    return [[ComAlfrescoAppceleratorSdkFolderProxy alloc] initWithNode:currentFolder];
}


-(void)retrieveChildrenInFolder:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
     
    NSLog(@"[INFO] folder object in use: %@ (name: %@)", currentFolder, currentFolder.name);
    
    [service retrieveChildrenInFolder:currentFolder
    completionBlock:^(NSArray* array, NSError* error)
    {
        if (error != NULL)
        {
            [SDKUtil createErrorEvent:error proxyObject:self];
        }
        else
        {
            NSLog(@"[INFO] Number of nodes: %d", array.count);
            
            for (int i = 0;  i < array.count;  i++)
            {
                [SDKUtil createEventWithNode:[array objectAtIndex:i] proxyObject:self];
            }
        }
        
        [SDKUtil createEnumerationEndEvent:self];
    }];
}


-(void)retrieveChildrenInFolderWithListingContext:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkListingContextProxy)

    ComAlfrescoAppceleratorSdkListingContextProxy* listingContextProxy = arg;
    AlfrescoListingContext* listingContext = listingContextProxy.listingContext;

    NSLog(@"[INFO] ListingContext maxItems %d, skipCount %d", listingContext.maxItems, listingContext.skipCount);
    
    NSLog(@"[INFO] folder object in use: %@ (name: %@)", currentFolder, currentFolder.name);
    
    [service retrieveChildrenInFolder:currentFolder listingContext:listingContext
                      completionBlock:^(AlfrescoPagingResult* pagingResult, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             NSLog(@"[INFO] Number of nodes: %d", pagingResult.objects.count);
             
             for (int i = 0;  i < pagingResult.objects.count;  i++)
             {
                 [SDKUtil createEventWithNode:[pagingResult.objects objectAtIndex:i] proxyObject:self];
             }
         }
         
         [SDKUtil createEventWithPagingResult:pagingResult proxyObject:self];
         [SDKUtil createEnumerationEndEvent:self];
     }];
}


-(void)retrievePermissionsOfNode:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkNodeProxy)
    
    ComAlfrescoAppceleratorSdkNodeProxy* proxy = arg;
    AlfrescoNode* node = [proxy performSelector:NSSelectorFromString(@"node")];
    
    NSLog(@"[INFO] Node name for permissions: %@, %@)", node.name, node);
    
    [service retrievePermissionsOfNode:node
    completionBlock:^(AlfrescoPermissions *permissions, NSError *error)
    {
        if (error != NULL)
        {
            [SDKUtil createErrorEvent:error proxyObject:self];
        }
        else
        {
            ComAlfrescoAppceleratorSdkPermissionsProxy* permissionsProxy = [[ComAlfrescoAppceleratorSdkPermissionsProxy alloc]initWithPermissions:permissions];
            NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:permissionsProxy, @"permissions", nil];
            
            [self fireEvent:@"retrievedpermissions" withObject:event];
        }
    }];
}



-(void)retrieveNodeWithIdentifier:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSString)

    NSString* identifier = arg;
    
    [service retrieveNodeWithIdentifier:identifier
     completionBlock:^(AlfrescoNode* node, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             [SDKUtil createEventWithNode:node proxyObject:self];
         }
     }];
}


-(void)retrieveNodeWithFolderPath:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSString)
    
    NSString* path = arg;
    
    [service retrieveNodeWithFolderPath:path
     completionBlock:^(AlfrescoNode* node, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             [SDKUtil createEventWithNode:node proxyObject:self];
         }
     }];
}


-(void)retrieveNodeWithFolderPathRelative:(id)args
{
    NSString* path = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkFolderProxy* folderProxy = [args objectAtIndex:1];
    NSDictionary *internalParams = [NSDictionary dictionaryWithObjectsAndKeys:path, @"path",
                                    [folderProxy performSelector:NSSelectorFromString(@"node")] , @"folder", nil];
    
    [self internalRetrieveNodeWithFolderPathRelative:internalParams];
}


//
//This allows us to use multiple arguments on the JS interface for user-friendliness, but pass them on as an NSDictionary in order
//to ensure the ENSURE_UI_THREAD_1_ARG is called (a quirk for the iOS Module creation, that we must be on the UI thread initially,
//even if we then create further threads for the completionBlock).
//
-(void)internalRetrieveNodeWithFolderPathRelative:(id)dictionary
{
    ENSURE_UI_THREAD_1_ARG(dictionary)
    ENSURE_SINGLE_ARG(dictionary,NSDictionary)
   
    [service retrieveNodeWithFolderPath:[dictionary objectForKey:@"path"] relativeToFolder:[dictionary objectForKey:@"folder"]
                        completionBlock:^(AlfrescoNode* node, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             [SDKUtil createEventWithNode:node proxyObject:self];
         }
     }];
}

    
-(void)retrieveParentFolderOfNode:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkNodeProxy)
    
    ComAlfrescoAppceleratorSdkNodeProxy* proxy = arg;
    AlfrescoNode* node = [proxy performSelector:NSSelectorFromString(@"node")];

    
    [service retrieveParentFolderOfNode:node
     completionBlock:^(AlfrescoFolder* folder, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             [SDKUtil createEventWithNode:folder proxyObject:self];
         }
     }];
}


-(void)retrieveRenditionOfNode:(id)args
{
    ComAlfrescoAppceleratorSdkNodeProxy* nodeProxy = [args objectAtIndex:0];
    NSString* name = [args objectAtIndex:1];
    NSDictionary *internalParams = [NSDictionary dictionaryWithObjectsAndKeys:[nodeProxy performSelector:NSSelectorFromString(@"node")], @"node", name, @"name", nil];
                                    
    [self internalRetrieveRenditionOfNode:internalParams];
}


//
//This allows us to use multiple arguments on the JS interface for user-friendliness, but pass them on as an NSDictionary in order
//to ensure the ENSURE_UI_THREAD_1_ARG is called (a quirk for the iOS Module creation, that we must be on the UI thread initially,
//even if we then create further threads for the completionBlock).
//
-(void)internalRetrieveRenditionOfNode:(id)dictionary
{
    ENSURE_UI_THREAD_1_ARG(dictionary)
    ENSURE_SINGLE_ARG(dictionary,NSDictionary)
    
    [service retrieveRenditionOfNode:[dictionary objectForKey:@"node"] renditionName:[dictionary objectForKey:@"name"]
     completionBlock:^(AlfrescoContentFile *contentFile, NSError *error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:
                                    [[ComAlfrescoAppceleratorSdkContentFileProxy alloc] initWithContentFile:contentFile], @"contentfile",
                                    nil];
             
             [self fireEvent:@"retrievedrendition" withObject:event];
         }
     }];
}


-(void)retrieveDocumentsInFolder:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkFolderProxy)

    ComAlfrescoAppceleratorSdkFolderProxy* proxy = arg;
    AlfrescoFolder* folder = [proxy performSelector:NSSelectorFromString(@"node")];
    
    NSLog(@"[INFO] folder object in use: %@", folder.name);
    
    [service retrieveDocumentsInFolder:folder
                      completionBlock:^(NSArray* array, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             NSLog(@"[INFO] Number of nodes: %d", array.count);
             
             for (int i = 0;  i < array.count;  i++)
             {
                 [SDKUtil createEventWithNode:[array objectAtIndex:i] proxyObject:self];
             }
         }
         
         [SDKUtil createEnumerationEndEvent:self];
     }];
}


-(void)retrieveDocumentsInFolderWithListingContext:(id)args
{
    ComAlfrescoAppceleratorSdkFolderProxy* folderProxy = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkListingContextProxy* listingContextProxy = [args objectAtIndex:1];
    NSDictionary *internalParams = [NSDictionary dictionaryWithObjectsAndKeys:[folderProxy performSelector:NSSelectorFromString(@"node")], @"folder", listingContextProxy.listingContext, @"listingContext", nil];

    [self internalRetrieveDocumentsInFolderWithListingContext:internalParams];
}


//
//This allows us to use multiple arguments on the JS interface for user-friendliness, but pass them on as an NSDictionary in order
//to ensure the ENSURE_UI_THREAD_1_ARG is called (a quirk for the iOS Module creation, that we must be on the UI thread initially,
//even if we then create further threads for the completionBlock).
//
-(void)internalRetrieveDocumentsInFolderWithListingContext:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSDictionary)
    
    [service retrieveDocumentsInFolder:[arg objectForKey:@"folder"] listingContext:[arg objectForKey:@"listingContext"]
        completionBlock:^(AlfrescoPagingResult* pagingResult, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             NSLog(@"[INFO] Number of nodes: %d", pagingResult.objects.count);
             
             for (int i = 0;  i < pagingResult.objects.count;  i++)
             {
                 [SDKUtil createEventWithNode:[pagingResult.objects objectAtIndex:i] proxyObject:self];
             }
             
             [SDKUtil createEventWithPagingResult:pagingResult proxyObject:self];
         }
         
         [SDKUtil createEnumerationEndEvent:self];
     }];
}


-(void)retrieveFoldersInFolder:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkFolderProxy)
    
    ComAlfrescoAppceleratorSdkFolderProxy* proxy = arg;
    AlfrescoFolder* folder = [proxy performSelector:NSSelectorFromString(@"node")];

    
    NSLog(@"[INFO] folder object in use: %@", folder.name);
    
    [service retrieveFoldersInFolder:folder
     completionBlock:^(NSArray* array, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             NSLog(@"[INFO] Number of nodes: %d", array.count);
             
             for (int i = 0;  i < array.count;  i++)
             {
                 [SDKUtil createEventWithNode:[array objectAtIndex:i] proxyObject:self];
             }
         }
         
         [SDKUtil createEnumerationEndEvent:self];
     }];
}


-(void)retrieveFoldersInFolderWithListingContext:(id)args
{
    ComAlfrescoAppceleratorSdkFolderProxy* folderProxy = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkListingContextProxy* listingContextProxy = [args objectAtIndex:1];
    NSDictionary *internalParams = [NSDictionary dictionaryWithObjectsAndKeys:[folderProxy performSelector:NSSelectorFromString(@"node")], @"folder", listingContextProxy.listingContext, @"listingContext", nil];
    
    [self internalRetrieveFoldersInFolderWithListingContext:internalParams];
}


//
//This allows us to use multiple arguments on the JS interface for user-friendliness, but pass them on as an NSDictionary in order
//to ensure the ENSURE_UI_THREAD_1_ARG is called (a quirk for the iOS Module creation, that we must be on the UI thread initially,
//even if we then create further threads for the completionBlock).
//
-(void)internalRetrieveFoldersInFolderWithListingContext:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSDictionary)
    
    [service retrieveFoldersInFolder:[arg objectForKey:@"folder"] listingContext:[arg objectForKey:@"listingContext"]
                       completionBlock:^(AlfrescoPagingResult* pagingResult, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             NSLog(@"[INFO] Number of nodes: %d", pagingResult.objects.count);
             
             for (int i = 0;  i < pagingResult.objects.count;  i++)
             {
                 [SDKUtil createEventWithNode:[pagingResult.objects objectAtIndex:i] proxyObject:self];
             }
             
             [SDKUtil createEventWithPagingResult:pagingResult proxyObject:self];
         }
         
         [SDKUtil createEnumerationEndEvent:self];
     }];
}


-(void)saveDocument:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkDocumentProxy)
  
    ComAlfrescoAppceleratorSdkDocumentProxy* document = arg;
    
    [service retrieveContentOfDocument:[document performSelector:NSSelectorFromString(@"node")]
        completionBlock:^(AlfrescoContentFile *contentFile, NSError *error)
        {
            if (error != NULL)
            {
                [SDKUtil createErrorEvent:error proxyObject:self];
            }
            else
            {
                NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:
                                       [[ComAlfrescoAppceleratorSdkContentFileProxy alloc] initWithContentFile:contentFile], @"contentfile",
                                       nil];
                
                [self fireEvent:@"retrieveddocument" withObject:event];
            }
        }
        progressBlock:^(unsigned long long bytesTransferred, unsigned long long bytesTotal)
        {
            NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:   [NSNumber numberWithLongLong:bytesTransferred], @"bytes",
                                                                                [NSNumber numberWithLongLong:bytesTotal], @"total",
                                                                                nil];
            [self fireEvent:@"progresseddocument" withObject:event];
        }];
}

@end
