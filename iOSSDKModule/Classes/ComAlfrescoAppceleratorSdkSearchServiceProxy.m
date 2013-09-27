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
//  ComAlfrescoAppceleratorSdkSearchServiceProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 27/08/2013.
//
//

#import "ComAlfrescoAppceleratorSdkSearchServiceProxy.h"
#import "ComAlfrescoAppceleratorSdkSiteProxy.h"
#import "ComAlfrescoAppceleratorSdkListingContextProxy.h"
#import "ComAlfrescoAppceleratorSdkKeywordSearchOptionsProxy.h"
#import "SDKUtil.h"


@implementation ComAlfrescoAppceleratorSdkSearchServiceProxy

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
    
    service = [[AlfrescoSearchService alloc] initWithSession:sessionProxy.session];
}


-(void)searchWithStatementAndListingContext:(id)args
{
    NSString* statement = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkListingContextProxy* listingContextProxy = [args objectAtIndex:1];
    
    AlfrescoListingContext* listingContext = listingContextProxy.listingContext;
    
    NSDictionary *internalParams = [NSDictionary dictionaryWithObjectsAndKeys:listingContext, @"listingContext",
                                                                              statement, @"statement",
                                                                              nil];
    [self internalSearchWithStatement:internalParams];
}


-(void)searchWithStatement:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSString)
    
    [service searchWithStatement:(NSString *)arg language:AlfrescoSearchLanguageCMIS completionBlock:^(NSArray* array, NSError* error)
     {
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
         
         [SDKUtil createEnumerationEndEvent:self];
     }];
}


-(void)searchWithKeywords:(id)args
{
    NSString* keywords = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkKeywordSearchOptionsProxy* searchOptionsProxy = [args objectAtIndex:1];
    AlfrescoKeywordSearchOptions* searchOptions = searchOptionsProxy.searchOptions;
    
    NSDictionary *internalParams = [NSDictionary dictionaryWithObjectsAndKeys:searchOptions, @"searchOptions",
                                    keywords, @"keywords",
                                    nil];
    [self internalSearchWithKeywords:internalParams];
}


-(void)searchWithKeywordsAndListingContext:(id)args
{
    NSString* keywords = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkKeywordSearchOptionsProxy* searchOptionsProxy = [args objectAtIndex:1];
    AlfrescoKeywordSearchOptions* searchOptions = searchOptionsProxy.searchOptions;
    ComAlfrescoAppceleratorSdkListingContextProxy* listingContextProxy = [args objectAtIndex:2];
    AlfrescoListingContext* listingContext = listingContextProxy.listingContext;
    
    NSDictionary *internalParams = [NSDictionary dictionaryWithObjectsAndKeys:searchOptions, @"searchOptions",
                                    keywords, @"keywords",
                                    listingContext, @"listingContext",
                                    nil];
    [self internalSearchWithKeywords:internalParams];
}


//
//This allows us to use multiple arguments on the JS interface for user-friendliness, but pass them on as an NSDictionary in order
//to ensure the ENSURE_UI_THREAD_1_ARG is called (a quirk for the iOS Module creation, that we must be on the UI thread initially,
//even if we then create further threads for the completionBlock).
//
-(void)internalSearchWithKeywords:(id)dictionary
{
    ENSURE_UI_THREAD_1_ARG(dictionary)
    ENSURE_SINGLE_ARG(dictionary,NSDictionary)

    AlfrescoListingContext* listingContext = [dictionary objectForKey:@"listingContext"];
    
    if (listingContext != NULL)
    {
        [service searchWithKeywords:[dictionary objectForKey:@"keywords"] options:[dictionary objectForKey:@"searchOptions"] listingContext:listingContext
                    completionBlock:^(AlfrescoPagingResult *pagingResult, NSError *error)
         {
             if (error != NULL)
             {
                  [SDKUtil createErrorEvent:error proxyObject:self];
             }
             else
             {
                 for (int i = 0;  i < pagingResult.objects.count;  i++)
                 {
                     [SDKUtil createEventWithNode:[pagingResult.objects objectAtIndex:i] proxyObject:self];
                 }
             
                 [SDKUtil createEventWithPagingResult:pagingResult proxyObject:self];
             }
             
             [SDKUtil createEnumerationEndEvent:self];
         }];
    }
    else
    {
        [service searchWithKeywords:[dictionary objectForKey:@"keywords"] options:[dictionary objectForKey:@"searchOptions"]
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
                     [SDKUtil createEventWithNode:[array objectAtIndex:i] proxyObject:self];
                 }
             }
             
             [SDKUtil createEnumerationEndEvent:self];
         }];
    }
}


//
//This allows us to use multiple arguments on the JS interface for user-friendliness, but pass them on as an NSDictionary in order
//to ensure the ENSURE_UI_THREAD_1_ARG is called (a quirk for the iOS Module creation, that we must be on the UI thread initially,
//even if we then create further threads for the completionBlock).
//
-(void)internalSearchWithStatement:(id)dictionary
{
    ENSURE_UI_THREAD_1_ARG(dictionary)
    ENSURE_SINGLE_ARG(dictionary,NSDictionary)
        
    [service searchWithStatement:[dictionary objectForKey:@"statement"] language:AlfrescoSearchLanguageCMIS
                                 listingContext:[dictionary objectForKey:@"listingContext"]
    completionBlock:^(AlfrescoPagingResult *pagingResult, NSError *error)
    {
        if (error != NULL)
        {
             [SDKUtil createErrorEvent:error proxyObject:self];
        }
        else
        {
             for (int i = 0;  i < pagingResult.objects.count;  i++)
             {
                 [SDKUtil createEventWithNode:[pagingResult.objects objectAtIndex:i] proxyObject:self];
             }
             
             [SDKUtil createEventWithPagingResult:pagingResult proxyObject:self];
        }
        
        [SDKUtil createEnumerationEndEvent:self];
    }];
}

@end
