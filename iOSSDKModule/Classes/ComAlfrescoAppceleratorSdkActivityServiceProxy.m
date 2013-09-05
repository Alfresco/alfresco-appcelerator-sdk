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
//  ComAlfrescoAppceleratorSdkActivityServiceProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 19/08/2013.
//
//

#import "ComAlfrescoAppceleratorSdkActivityServiceProxy.h"
#import "ComAlfrescoAppceleratorSdkSiteProxy.h"
#import "ComAlfrescoAppceleratorSdkListingContextProxy.h"
#import "SDKUtil.h"


@implementation ComAlfrescoAppceleratorSdkActivityServiceProxy

-(void)initWithSession:(id)arg
{
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkSessionProxy)
    
    ComAlfrescoAppceleratorSdkSessionProxy* sessionProxy = arg;
    
    if (sessionProxy == nil || sessionProxy.session == nil)
    {
        NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:[[NSNumber alloc]initWithInt:1], @"errorcode", nil];
        [self fireEvent:@"paramerror" withObject:event];
        
        return;
    }
    
    errorCode = [[NSError alloc]init];
    
    service = [[AlfrescoActivityStreamService alloc] initWithSession:sessionProxy.session];
}


-(void)createEventWithActivityEntry:(AlfrescoActivityEntry*)entry
{
    NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"identifier", @"createdAt", @"createdBy",
                                                                   @"siteShortName", @"type", @"data", nil];
    
    NSMutableDictionary* values = [[entry dictionaryWithValuesForKeys:keys] mutableCopy];
    
    [self fireEvent:@"activitynode" withObject:values];
}


-(void)retrieveActivityStream:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
    
    [service retrieveActivityStreamWithCompletionBlock:^(NSArray* array, NSError* error)
    {
        for (int i = 0;  i < array.count;  i++)
        {
            [self createEventWithActivityEntry:[array objectAtIndex:i]];
        }
    }];
}


- (void)retrieveActivityStreamWithListingContext:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkListingContextProxy)
    
    ComAlfrescoAppceleratorSdkListingContextProxy* listingContextProxy = arg;
    AlfrescoListingContext* listingContext = listingContextProxy.listingContext;

    [service retrieveActivityStreamWithListingContext:listingContext completionBlock:^(AlfrescoPagingResult *pagingResult, NSError *error)
    {
        for (int i = 0;  i < pagingResult.objects.count;  i++)
        {
            [self createEventWithActivityEntry:[pagingResult.objects objectAtIndex:i]];
        }
         
        [SDKUtil createEventWithPagingResult:pagingResult proxyObject:self];
    }];
}

-(void)retrieveActivityStreamForPerson:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSString)
    
    NSString* person = arg;

    [service retrieveActivityStreamForPerson:person completionBlock:^(NSArray* array, NSError* error)
    {
        for (int i = 0;  i < array.count;  i++)
        {
            [self createEventWithActivityEntry:[array objectAtIndex:i]];
        }
    }];
}


-(void)retrieveActivityStreamForPersonWithListingContext:(id)args
{
    NSString* person = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkListingContextProxy* listingContextProxy = [args objectAtIndex:1];
    
    AlfrescoListingContext* listingContext = listingContextProxy.listingContext;
    NSDictionary *internalParams = [NSDictionary dictionaryWithObjectsAndKeys:listingContext, @"listingContext",
                                                                              person, @"person",
                                                                              nil];
    [self internalRetrieveForPerson:internalParams];
}


//
//This allows us to use multiple arguments on the JS interface for user-friendliness, but pass them on as an NSDictionary in order
//to ensure the ENSURE_UI_THREAD_1_ARG is called (a quirk for the iOS Module creation, that we must be on the UI thread initially,
//even if we then create further threads for the completionBlock).
//
-(void)internalRetrieveForPerson:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSDictionary)
    
    [service retrieveActivityStreamForPerson:[arg objectForKey:@"person"] listingContext:[arg objectForKey:@"listingContext"]
    completionBlock:^(AlfrescoPagingResult *pagingResult, NSError *error)
    {
         for (int i = 0;  i < pagingResult.objects.count;  i++)
         {
             [self createEventWithActivityEntry:[pagingResult.objects objectAtIndex:i]];
         }
         
         [SDKUtil createEventWithPagingResult:pagingResult proxyObject:self];
    }];
}


-(void)retrieveActivityStreamForSite:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkSiteProxy)
    
    ComAlfrescoAppceleratorSdkSiteProxy* siteProxy = arg;
    AlfrescoSite* site = siteProxy.currentSite;
    
    [service retrieveActivityStreamForSite:site completionBlock:^(NSArray* array, NSError* error)
    {
        for (int i = 0;  i < array.count;  i++)
        {
            [self createEventWithActivityEntry:[array objectAtIndex:i]];
        }
    }];
}


-(void)retrieveActivityStreamForSiteWithListingContext:(id)args
{
    ComAlfrescoAppceleratorSdkSiteProxy* siteProxy = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkListingContextProxy* listingContextProxy = [args objectAtIndex:1];

    AlfrescoSite* site = siteProxy.currentSite;

    AlfrescoListingContext* listingContext = listingContextProxy.listingContext;
    NSDictionary *internalParams = [NSDictionary dictionaryWithObjectsAndKeys:listingContext, @"listingContext",
                                                                              site, @"site",
                                                                              nil];
    [self internalRetrieveForSite:internalParams];
}


//
//This allows us to use multiple arguments on the JS interface for user-friendliness, but pass them on as an NSDictionary in order
//to ensure the ENSURE_UI_THREAD_1_ARG is called (a quirk for the iOS Module creation, that we must be on the UI thread initially,
//even if we then create further threads for the completionBlock).
//
-(void)internalRetrieveForSite:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSDictionary)
    
    [service retrieveActivityStreamForSite:[arg objectForKey:@"site"] listingContext:[arg objectForKey:@"listingContext"]
                             completionBlock:^(AlfrescoPagingResult *pagingResult, NSError *error)
     {
         for (int i = 0;  i < pagingResult.objects.count;  i++)
         {
             [self createEventWithActivityEntry:[pagingResult.objects objectAtIndex:i]];
         }
         
         [SDKUtil createEventWithPagingResult:pagingResult proxyObject:self];
     }];
}

@end
