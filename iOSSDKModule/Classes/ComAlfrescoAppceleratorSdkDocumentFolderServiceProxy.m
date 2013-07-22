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

#import "AlfrescoFolder.h"
#import <objc/runtime.h>
#import "TiUtils.h"

@implementation ComAlfrescoAppceleratorSdkDocumentFolderServiceProxy


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
        
        NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:folder.name, @"folder", nil];
        [self fireEvent:@"retrievedfolder" withObject:event];
    }];
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

-(void)saveDocument:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkDocumentProxy)
  
    ComAlfrescoAppceleratorSdkDocumentProxy* document = arg;
    
    [service retrieveContentOfDocument:document.currentDocument
        completionBlock:^(AlfrescoContentFile *contentFile, NSError *error)
        {
            NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:contentFile.fileUrl.path, @"filename", nil];
            [self fireEvent:@"retrieveddocument" withObject:event];
        }
        progressBlock:^(unsigned long long bytesTransferred, unsigned long long bytesTotal)
        {
            NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:   [NSNumber numberWithLongLong:bytesTransferred], @"bytes",
                                                                                [NSNumber numberWithLongLong:bytesTotal], @"total",
                                                                                nil];
            [self fireEvent:@"progresseddocument" withObject:event];
        }];
}


/*
-(void)enumerateFolderProperties:(AlfrescoNode*)node propertyValues:(NSDictionary*)propValues
{
    unsigned int count=0;
    objc_property_t *props = class_copyPropertyList([node class],&count);
    
    for (int i=0;i<count;i++)
    {
        NSString* name = [[NSString alloc]initWithCString:property_getName(props[i]) encoding:NSASCIIStringEncoding];
        NSString* atts = [[NSString alloc]initWithCString:property_getAttributes(props[i]) encoding:NSASCIIStringEncoding];
        id value = [node valueForKey:name];

        NSLog(@"[INFO] name %@, value %@", name, value);

        //Wrap scalar types in order to store in an NSDictionary
        if ([atts rangeOfString:@"BOOL"].location != NSNotFound)
            value = [NSNumber numberWithBool:value];
        else
            if ([atts rangeOfString:@"NSInteger"].location != NSNotFound)
                value = [NSNumber numberWithInteger:value];
            else
                if ([atts rangeOfString:@"unsigned long long"].location != NSNotFound)
                    value = [NSNumber numberWithLongLong:value];
        
        [propValues setValue:value forKey:name];
    }
}
*/

@end
