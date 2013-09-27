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
#import "SDKUtil.h"

#import "AlfrescoFolder.h"
#import <objc/runtime.h>
#import "TiUtils.h"

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
         
         [SDKUtil createEnumerationEndEvent:self];
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
         
         [SDKUtil createEnumerationEndEvent:self];
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
         
         [SDKUtil createEnumerationEndEvent:self];
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

@end
