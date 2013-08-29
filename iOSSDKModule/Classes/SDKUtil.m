//
//  SDKUtil.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 14/08/2013.
//
//

#import "SDKUtil.h"

#import "ComAlfrescoAppceleratorSdkFolderProxy.h"
#import "ComAlfrescoAppceleratorSdkDocumentProxy.h"

@implementation SDKUtil

+(void)createEventWithNode:(AlfrescoNode*)node proxyObject:(TiProxy*)proxyObj
{
    NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"name", @"title", @"summary", @"type", @"createdBy", @"createdAt", @"modifiedBy", @"modifiedAt", nil];
    
    if (node.isFolder)
    {
        NSLog(@"[INFO] ** Folder node: %@", node.name);
        
        NSMutableDictionary* values = [[node dictionaryWithValuesForKeys:keys] mutableCopy];
        
        ComAlfrescoAppceleratorSdkFolderProxy *thisFolder = [[ComAlfrescoAppceleratorSdkFolderProxy alloc] initWithFolder:(AlfrescoFolder*)node];
        [values setValue:thisFolder forKey:@"folder"];
        
        [proxyObj fireEvent:@"foldernode" withObject:values];
    }
    else
    {
        NSLog(@"[INFO] ** Document node: %@", node.name);
        
        [keys addObjectsFromArray:[[NSArray alloc] initWithObjects:@"contentMimeType", @"contentLength", @"versionLabel", @"versionComment", @"isLatestVersion", nil]];
        
        NSMutableDictionary* values = [[node dictionaryWithValuesForKeys:keys] mutableCopy];
        
        ComAlfrescoAppceleratorSdkDocumentProxy *thisDocument = [[ComAlfrescoAppceleratorSdkDocumentProxy alloc] initWithDocument:(AlfrescoDocument*)node];
        [values setValue:thisDocument forKey:@"document"];
        
        [proxyObj fireEvent:@"documentnode" withObject:values];
    }
}


+(void)createEventWithPagingResult:(AlfrescoPagingResult*)pagingResult  proxyObject:(TiProxy*)proxyObj
{
    NSDictionary *values = [NSDictionary dictionaryWithObjectsAndKeys:
                            [NSNumber numberWithBool:pagingResult.hasMoreItems], @"hasmoreitems",
                            [NSNumber numberWithBool:pagingResult.totalItems], @"totalitems",
                            nil];
    
    [proxyObj fireEvent:@"pagingresult" withObject:values];
}

@end
