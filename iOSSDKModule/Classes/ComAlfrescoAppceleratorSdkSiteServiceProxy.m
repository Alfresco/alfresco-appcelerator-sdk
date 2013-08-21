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

#import "AlfrescoFolder.h"
#import <objc/runtime.h>
#import "TiUtils.h"

@implementation ComAlfrescoAppceleratorSdkSiteServiceProxy

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
    
    service = [[AlfrescoSiteService alloc] initWithSession:sessionProxy.session];
}


-(void)retrieveAllSites:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
    
    [service retrieveAllSitesWithCompletionBlock:^(NSArray* array, NSError* error)
     {
         for (int i = 0;  i < array.count;  i++)
         {
             AlfrescoSite *site = [array objectAtIndex:i];
             NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"shortName", @"title", @"summary", @"identifier", @"GUID", @"isMember", @"isPendingMember", @"isFavorite", @"visibility", nil];
             
             NSMutableDictionary* values = [[site dictionaryWithValuesForKeys:keys] mutableCopy];
             
             ComAlfrescoAppceleratorSdkSiteProxy* siteProxy = [[ComAlfrescoAppceleratorSdkSiteProxy alloc]initWithSite:site];
             [values setValue:siteProxy forKey:@"site"];

             [self fireEvent:@"allsitesnode" withObject:values];
         }
     }];
}


-(void)retrieveSites:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
    
    [service retrieveSitesWithCompletionBlock:^(NSArray* array, NSError* error)
     {
         for (int i = 0;  i < array.count;  i++)
         {
             AlfrescoSite *site = [array objectAtIndex:i];
             NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"shortName", @"title", @"summary", @"identifier", @"GUID", @"isMember", @"isPendingMember", @"isFavorite", @"visibility", nil];
             
             NSMutableDictionary* values = [[site dictionaryWithValuesForKeys:keys] mutableCopy];
             
             ComAlfrescoAppceleratorSdkSiteProxy* siteProxy = [[ComAlfrescoAppceleratorSdkSiteProxy alloc]initWithSite:site];
             [values setValue:siteProxy forKey:@"site"];
             
             [self fireEvent:@"mysitesnode" withObject:values];

         }
     }];
}


-(void)retrieveFavoriteSites:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
    
    [service retrieveFavoriteSitesWithCompletionBlock:^(NSArray* array, NSError* error)
     {
         for (int i = 0;  i < array.count;  i++)
         {
             AlfrescoSite *site = [array objectAtIndex:i];
             NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"shortName", @"title", @"summary", @"identifier", @"GUID", @"isMember", @"isPendingMember", @"isFavorite", @"visibility", nil];
             
             NSMutableDictionary* values = [[site dictionaryWithValuesForKeys:keys] mutableCopy];
             
             ComAlfrescoAppceleratorSdkSiteProxy* siteProxy = [[ComAlfrescoAppceleratorSdkSiteProxy alloc]initWithSite:site];
             [values setValue:siteProxy forKey:@"site"];
             
             [self fireEvent:@"favsitesnode" withObject:values];
         }
     }];
} 


-(void)retrieveSiteWithShortName:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSString)
    
    NSString* shortName = arg;
    
    [service retrieveSiteWithShortName:shortName completionBlock:^(AlfrescoSite* site, NSError* error)
     {
         NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"shortName", @"title", @"summary", @"identifier", @"GUID", @"isMember", @"isPendingMember", @"isFavorite", @"visibility", nil];
         
         NSMutableDictionary* values = [[site dictionaryWithValuesForKeys:keys] mutableCopy];
         
         ComAlfrescoAppceleratorSdkSiteProxy* siteProxy = [[ComAlfrescoAppceleratorSdkSiteProxy alloc]initWithSite:site];
         [values setValue:siteProxy forKey:@"site"];
         
         [self fireEvent:@"sitenode" withObject:values];

     }];
}


-(void)retrieveDocumentLibraryFolderForSite:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSString)
    
    [service retrieveDocumentLibraryFolderForSite:arg completionBlock:^(AlfrescoFolder* folder, NSError* error)
     {
         ComAlfrescoAppceleratorSdkFolderProxy* folderProxy = [[ComAlfrescoAppceleratorSdkFolderProxy alloc]initWithFolder:folder];
         NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:folderProxy, @"folder", nil];

         [self fireEvent:@"retrievedDocumentFolder" withObject:event];
     }];
}


-(void)clearSitesCache:(id)noargs
{
    [service clear];
}

@end
