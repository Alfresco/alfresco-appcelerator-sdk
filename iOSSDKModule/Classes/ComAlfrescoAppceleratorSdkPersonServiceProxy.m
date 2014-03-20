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
//  ComAlfrescoAppceleratorSdkPersonService.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 16/09/2013.
//
//

#import "ComAlfrescoAppceleratorSdkPersonServiceProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "ComAlfrescoAppceleratorSdkPersonProxy.h"
#import "ComAlfrescoAppceleratorSdkContentFileProxy.h"
#import "ComAlfrescoAppceleratorSdkListingContextProxy.h"
#import "SDKUtil.h"


@implementation ComAlfrescoAppceleratorSdkPersonServiceProxy

-(void)initialiseWithSession:(id)arg
{
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkSessionProxy)
    
    ComAlfrescoAppceleratorSdkSessionProxy* sessionProxy = arg;
    
    if (sessionProxy == nil || sessionProxy.session == nil)
    {
        [SDKUtil createParamErrorEvent:self];
        return;
    }
    
    service = [[AlfrescoPersonService alloc] initWithSession:sessionProxy.session];
}


-(void)retrievePersonWithIdentifier:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSString)
    
    [service retrievePersonWithIdentifier:arg completionBlock:^(AlfrescoPerson* person, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             ComAlfrescoAppceleratorSdkPersonProxy* personProxy = [[ComAlfrescoAppceleratorSdkPersonProxy alloc]initWithPerson:person];
             
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:personProxy, @"person", nil];
             
             [self fireEvent:@"personnode" withObject:event];
         }
         
         [SDKUtil createEnumerationEndEvent:self eventSource:@"retrievePersonWithIdentifier" eventObject:arg];
     }];
}


-(void)retrieveAvatarForPerson:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkPersonProxy)
    
    ComAlfrescoAppceleratorSdkPersonProxy* personProxy = arg;
    AlfrescoPerson* person = [person performSelector:NSSelectorFromString(@"person")];
    
    [service retrieveAvatarForPerson:person
     completionBlock:^(AlfrescoContentFile* contentFile, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:
                                    [[ComAlfrescoAppceleratorSdkContentFileProxy alloc] initWithContentFile:contentFile], @"contentfile",
                                    person.identifier, @"personid",
                                    nil];
             
             [self fireEvent:@"retrievedavatar" withObject:event];
         }
         
         [SDKUtil createEnumerationEndEvent:self eventSource:@"retrieveAvatarForPerson" eventObject:personProxy];
    }];
}
    

-(void)search:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSString)
    
    [service searchWithKeywords:arg
     completionBlock:^(NSArray* array, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             for (int i = 0;  i < array.count;  i++)
             {
                 ComAlfrescoAppceleratorSdkPersonProxy* personProxy = [[ComAlfrescoAppceleratorSdkPersonProxy alloc]initWithPerson:[array objectAtIndex:i]];
                 
                 NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:personProxy, @"person", nil];
                 
                 [self fireEvent:@"personnode" withObject:event];
             }
         }
         
         [SDKUtil createEnumerationEndEvent:self eventSource:@"search" eventObject:arg];
     }];
}


-(void)searchWithListingContext:(id)args
{
    ENSURE_UI_THREAD_1_ARG(args)
    NSString* filter = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkListingContextProxy* listingContextProxy = [args objectAtIndex:1];
    
    [service searchWithKeywords:filter listingContext:listingContextProxy.listingContext
     completionBlock:^(AlfrescoPagingResult* pagingResult, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             for (int i = 0;  i < pagingResult.objects.count;  i++)
             {
                 ComAlfrescoAppceleratorSdkPersonProxy* personProxy = [[ComAlfrescoAppceleratorSdkPersonProxy alloc]initWithPerson:[pagingResult.objects objectAtIndex:i]];
                 
                 NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:personProxy, @"person", nil];
                 
                 [self fireEvent:@"personnode" withObject:event];
             }
         }
         
         [SDKUtil createEventWithPagingResult:pagingResult proxyObject:self];
         [SDKUtil createEnumerationEndEvent:self eventSource:@"searchWithListingContext" eventObject:filter];
     }];
}

    
-(void)refreshPerson:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkPersonProxy)
    
    [service refreshPerson:arg
     completionBlock:^(AlfrescoPerson* person, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             ComAlfrescoAppceleratorSdkPersonProxy* personProxy = [[ComAlfrescoAppceleratorSdkPersonProxy alloc]initWithPerson:person];
             
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:personProxy, @"person", nil];
             
             [self fireEvent:@"refreshedperson" withObject:event];
         }
     }];
}

@end

