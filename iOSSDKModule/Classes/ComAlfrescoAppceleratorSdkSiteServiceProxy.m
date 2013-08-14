//
//  AlfrescoDocumentFolderServiceProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 29/05/2013.
//
//

#import "ComAlfrescoAppceleratorSdkSiteServiceProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "ComAlfrescoAppceleratorSdkFolderProxy.h"
#import "ComAlfrescoAppceleratorSdkDocumentProxy.h"
#import "ComAlfrescoAppceleratorSdkContentFileProxy.h"

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
    
    currentFolder = nil;
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
             [self fireEvent:@"site" withObject:values];
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
             [self fireEvent:@"site" withObject:values];
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
             [self fireEvent:@"site" withObject:values];
         }
     }];
} 


-(void)retrieveSiteWithShortName:(id)arg
{
    ENSURE_UI_THREAD_0_ARGS
    ENSURE_SINGLE_ARG(arg,NSString)
    
    NSString* shortName = arg;
    
    [service retrieveSiteWithShortName:shortName completionBlock:^(AlfrescoSite* site, NSError* error)
     {
      //  ComAlfrescoAppceleratorSdkSiteProxy* siteProxy = [[ComAlfrescoAppceleratorSdkSiteProxy alloc]initWithSite:site]
      //  [self fireEvent:@"retrievedsite" withObject:siteProxy];
     }];
}


-(void)retrieveDocumentLibraryFolderForSite:(id)args
{
    
}


-(void)clearSitesCache:(id)noargs
{
    
}


 
-(void)setFolder:(id)arg
{
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkFolderProxy)
    
    NSLog(@"[INFO] folder arg object: %@", arg);
    ComAlfrescoAppceleratorSdkFolderProxy* folder = arg;
    
    NSLog(@"[INFO] folder object set: %@ (name: %@)", folder, folder.currentFolder.name);
    
    currentFolder = folder.currentFolder;
}


-(id)getCurrentFolder:(id)noargs
{
    return [[ComAlfrescoAppceleratorSdkFolderProxy alloc] initWithFolder:currentFolder];
}


/*
 Kept for now, as an example of how to return the nodes.
 Will remove as soon as Site service is available for iOS SDK.
 
-(void)retrieveChildrenInFolder:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
     
    NSLog(@"[INFO] folder object in use: %@ (name: %@)", currentFolder, currentFolder.name);
    
    [service retrieveChildrenInFolder:currentFolder
    completionBlock:^(NSArray* array, NSError* error)
    {
        NSLog(@"[INFO] Number of nodes: %d", array.count);
        
        folders = [[NSMutableDictionary alloc] init];
        
        for (int i = 0;  i < array.count;  i++)
        {
            AlfrescoNode *node = [array objectAtIndex:i];
            NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"name", @"title", @"summary", @"type", @"createdBy", @"createdAt", @"modifiedBy", @"modifiedAt", nil];
            
            if (node.isFolder)
            {
                NSLog(@"[INFO] ** Folder node: %@", node.name);
                
                NSMutableDictionary* values = [[node dictionaryWithValuesForKeys:keys] mutableCopy];
                
                ComAlfrescoAppceleratorSdkFolderProxy *thisFolder = [[ComAlfrescoAppceleratorSdkFolderProxy alloc] initWithFolder:(AlfrescoFolder*)node];
                [values setValue:thisFolder forKey:@"folder"];
                
                [self fireEvent:@"foldernode" withObject:values];
            }
            else
            {
                NSLog(@"[INFO] ** Document node: %@", node.name);
                
                [keys addObjectsFromArray:[[NSArray alloc] initWithObjects:@"contentMimeType", @"contentLength", @"versionLabel", @"versionComment", @"isLatestVersion", nil]];

                NSMutableDictionary* values = [[node dictionaryWithValuesForKeys:keys] mutableCopy];
                
                ComAlfrescoAppceleratorSdkDocumentProxy *thisDocument = [[ComAlfrescoAppceleratorSdkDocumentProxy alloc] initWithDocument:(AlfrescoDocument*)node];
                [values setValue:thisDocument forKey:@"document"];
                
                [self fireEvent:@"documentnode" withObject:values];
            }
        }
    }];
}
*/


@end
