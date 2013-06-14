//
//  AlfrescoDocumentFolderServiceProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 29/05/2013.
//
//

#import "ComAlfrescoAppceleratorIosSdkDocumentFolderServiceProxy.h"
#import "ComAlfrescoAppceleratorIosSdkSessionProxy.h"

#import "AlfrescoFolder.h"
#import <objc/runtime.h>


@implementation ComAlfrescoAppceleratorIosSdkDocumentFolderServiceProxy


-(void)initWithSession:(id)args
{
    ENSURE_UI_THREAD_1_ARG(args)
    
    ComAlfrescoAppceleratorIosSdkSessionProxy* sessionProxy = [args objectAtIndex:0];
    
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

-(void)retrieveRootFolder:(id)args
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

-(void)retrieveChildrenInFolder:(id)args
{
    ENSURE_UI_THREAD_0_ARGS
    
    [service retrieveChildrenInFolder:currentFolder
    completionBlock:^(NSArray* array, NSError* error)
    {
        for (int i = 0;  i < array.count;  i++)
        {
            AlfrescoNode *node = [array objectAtIndex:i];
            NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"name", @"title", @"summary", @"type", @"createdBy", @"createdAt", @"modifiedBy", @"modifiedAt", nil];
            
            if (node.isFolder)
            {
                values = [node dictionaryWithValuesForKeys:keys];
                
                [self fireEvent:@"foldernode" withObject:values];
            }
            else
            {
                [keys addObjectsFromArray:[[NSArray alloc] initWithObjects:@"contentMimeType", @"contentLength", @"versionLabel", @"versionComment", @"isLatestVersion", nil]];

                values = [node dictionaryWithValuesForKeys:keys];
                
                [self fireEvent:@"documentnode" withObject:values];
            }
        }
    }];
}

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

@end
