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

#import "ComAlfrescoAppceleratorSdkSiteServiceProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "ComAlfrescoAppceleratorSdkSiteProxy.h"
#import "ComAlfrescoAppceleratorSdkFolderProxy.h"
#import "ComAlfrescoAppceleratorSdkListingContextProxy.h"
#import "ComAlfrescoAppceleratorSdkPersonProxy.h"
#import "SDKUtil.h"

#import <objc/runtime.h>


@implementation ComAlfrescoAppceleratorSdkSiteServiceProxy

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
    
    service = [[AlfrescoSiteService alloc] initWithSession:sessionProxy.session];
}


-(void)createEventWithSite:(AlfrescoSite*)site context:(NSString*)context
{
    ComAlfrescoAppceleratorSdkSiteProxy* siteProxy = [[ComAlfrescoAppceleratorSdkSiteProxy alloc]initWithSite:site];
    
    NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:siteProxy, @"site", nil];
                           
    [self fireEvent:context withObject:event];
}


-(void)retrieveAllSites:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
    
    [service retrieveAllSitesWithCompletionBlock:^(NSArray* array, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             for (int i = 0;  i < array.count;  i++)
             {
                 [self createEventWithSite:[array objectAtIndex:i] context:@"allsitesnode"];
             }
         }
         
         [SDKUtil createEnumerationEndEvent:self eventSource:@"retrieveAllSites" eventObject:nil];
     }];
}


-(void)retrieveSites:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
    
    [service retrieveSitesWithCompletionBlock:^(NSArray* array, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             for (int i = 0;  i < array.count;  i++)
             {
                 [self createEventWithSite:[array objectAtIndex:i] context:@"mysitesnode"];
             }
         }
         
         [SDKUtil createEnumerationEndEvent:self eventSource:@"retrieveSites" eventObject:nil];
     }];
}


-(void)retrieveFavoriteSites:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
    
    [service retrieveFavoriteSitesWithCompletionBlock:^(NSArray* array, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             for (int i = 0;  i < array.count;  i++)
             {
                 [self createEventWithSite:[array objectAtIndex:i] context:@"favsitesnode"];
             }
         }
         
         [SDKUtil createEnumerationEndEvent:self eventSource:@"retrieveFavoriteSites" eventObject:nil];
     }];
} 


-(void)retrieveSiteWithShortName:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSString)
    
    NSString* shortName = arg;
    
    [service retrieveSiteWithShortName:shortName completionBlock:^(AlfrescoSite* site, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             [self createEventWithSite:site context:@"sitenode"];
         }
     }];
}


-(void)retrieveDocumentLibraryFolderForSite:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSString)
    
    [service retrieveDocumentLibraryFolderForSite:arg completionBlock:^(AlfrescoFolder* folder, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             ComAlfrescoAppceleratorSdkFolderProxy* folderProxy = [[ComAlfrescoAppceleratorSdkFolderProxy alloc]initWithNode:folder];
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:folderProxy, @"folder", nil];

             [self fireEvent:@"retrievedDocumentFolder" withObject:event];
         }
     }];
}


-(void)clearSitesCache:(id)noargs
{
    [service clear];
}


-(void)addFavoriteSite:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkSiteProxy)
    
    [service addFavoriteSite:[arg performSelector:NSSelectorFromString(@"currentSite")]
     completionBlock:^(AlfrescoSite* site, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             [self createEventWithSite:site context:@"siteupdated"];
         }
     }];
}


-(void)removeFavoriteSite:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkSiteProxy)
    
    [service removeFavoriteSite:[arg performSelector:NSSelectorFromString(@"currentSite")]
     completionBlock:^(AlfrescoSite* site, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             [self createEventWithSite:site context:@"siteupdated"];
         }
     }];
}


-(void)joinSite:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkSiteProxy)
    
    [service joinSite:[arg performSelector:NSSelectorFromString(@"currentSite")]
     completionBlock:^(AlfrescoSite* site, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             [self createEventWithSite:site context:@"siteupdated"];
         }
     }];
}


-(void)retrievePendingSites:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
    
    [service retrievePendingSitesWithCompletionBlock:
     ^(NSArray* sites, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             for (int i = 0;  i < sites.count;  i++)
             {
                 [self createEventWithSite:sites[i] context:@"retrievedpendingsite"];
             }
             
             [SDKUtil createEnumerationEndEvent:self eventSource:@"retrievePendingSites" eventObject:nil];
         }
     }];
}


-(void)retrievePendingSitesWithListingContext:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkListingContextProxy)
    
    [service retrievePendingSitesWithListingContext:((ComAlfrescoAppceleratorSdkListingContextProxy*)arg).listingContext
     completionblock:^(AlfrescoPagingResult* results, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             for (int i = 0;  i < results.objects.count;  i++)
             {
                 [self createEventWithSite:results.objects[i] context:@"retrievedpendingsite"];
             }
             
             [SDKUtil createEnumerationEndEvent:self eventSource:@"retrievePendingSitesWithListingContext" eventObject:nil];
             
             [SDKUtil createEventWithPagingResult:results proxyObject:self];
         }
     }];
}


-(void)cancelPendingJoinRequestForSite:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkSiteProxy)
    
    [service cancelPendingJoinRequestForSite:[arg performSelector:NSSelectorFromString(@"currentSite")]
      completionBlock:^(AlfrescoSite* site, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             [self createEventWithSite:site context:@"siteupdated"];
         }
     }];
}


-(void)leaveSite:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkSiteProxy)
    
    [service leaveSite:[arg performSelector:NSSelectorFromString(@"currentSite")]
     completionBlock:^(AlfrescoSite* site, NSError* error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else
         {
             [self createEventWithSite:site context:@"siteupdated"];
         }
     }];
}

    
-(void)retrieveAllMembers:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkSiteProxy)
    
    [service retrieveAllMembersOfSite:[arg performSelector:NSSelectorFromString(@"currentSite")]
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
                 ComAlfrescoAppceleratorSdkPersonProxy* personProxy = [[ComAlfrescoAppceleratorSdkPersonProxy alloc]initWithPerson:array[i]];
                 NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:personProxy, @"person", nil];
                 
                 [self fireEvent:@"personnode" withObject:event];
             }
             
             [SDKUtil createEnumerationEndEvent:self eventSource:@"retrieveAllMembers" eventObject:arg];
         }
     }];
}


-(void)retrieveAllMembersWithListingContext:(id)args
{
    ENSURE_UI_THREAD_1_ARG(args)
    
    ComAlfrescoAppceleratorSdkSiteProxy* siteProxy = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkListingContextProxy* lc = [args objectAtIndex:1];
    
    [service retrieveAllMembersOfSite:[siteProxy performSelector:NSSelectorFromString(@"currentSite")] listingContext:lc.listingContext
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
                 ComAlfrescoAppceleratorSdkPersonProxy* personProxy = [[ComAlfrescoAppceleratorSdkPersonProxy alloc]initWithPerson:pagingResult.objects[i]];
                 NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:personProxy, @"person", nil];
                 
                 [self fireEvent:@"personnode" withObject:event];
             }
             
             [SDKUtil createEnumerationEndEvent:self eventSource:@"retrieveAllMembersWithListingContext" eventObject:siteProxy];
             [SDKUtil createEventWithPagingResult:pagingResult proxyObject:self];
         }
     }];
}


-(void)searchMembers:(id)args
{
    ENSURE_UI_THREAD_1_ARG(args)
    
    ComAlfrescoAppceleratorSdkSiteProxy* siteProxy = [args objectAtIndex:0];
    NSString* filter = [args objectAtIndex:1];
    ComAlfrescoAppceleratorSdkListingContextProxy* lc = [args objectAtIndex:2];

    [service searchMembersOfSite:[siteProxy performSelector:NSSelectorFromString(@"currentSite")] keywords:filter listingContext:lc.listingContext
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
                 ComAlfrescoAppceleratorSdkPersonProxy* personProxy = [[ComAlfrescoAppceleratorSdkPersonProxy alloc]initWithPerson:pagingResult.objects[i]];
                 NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:personProxy, @"person", nil];
                 
                 [self fireEvent:@"personnode" withObject:event];
             }
             
             [SDKUtil createEnumerationEndEvent:self eventSource:@"searchMembers" eventObject:siteProxy];
             [SDKUtil createEventWithPagingResult:pagingResult proxyObject:self];
         }
     }];
}


-(void)isPersonMember:(id)args
{
    
    ENSURE_UI_THREAD_1_ARG(args)
    ComAlfrescoAppceleratorSdkSiteProxy* siteProxy = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkPersonProxy* personProxy = [args objectAtIndex:1];
    
    [service isPerson:[personProxy performSelector:NSSelectorFromString(@"person")]
     memberOfSite:[siteProxy performSelector:NSSelectorFromString(@"currentSite")]
     completionBlock:^(BOOL succeeded, BOOL isMember, NSError *error)
     {
         if (error != NULL)
         {
             [SDKUtil createErrorEvent:error proxyObject:self];
         }
         else if (succeeded)
         {
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:[[NSNumber alloc]initWithInt:(isMember ? 1 : 0)], @"ismember", nil];
             [self fireEvent:@"retrievedmembership" withObject:event];
         }
     }];
}

@end
