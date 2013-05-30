//
//  AlfrescoDocumentFolderServiceProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 29/05/2013.
//
//

#import "AlfrescoDocumentFolderServiceProxy.h"
#import "AlfrescoSessionProxy.h"
#import "AlfrescoFolder.h"

@implementation AlfrescoDocumentFolderServiceProxy


-initWithSession:(id)args
{
    AlfrescoSessionProxy* sessionProxy = [args objectAtIndex:0];
    
    currentFolder = nil;
    errorCode = [[NSError alloc]init];
    
    service = [[AlfrescoDocumentFolderService alloc] init];
    [service initWithSession:sessionProxy.session];
}

-retrieveRootFolder
{
    [service retrieveRootFolderWithCompletionBlock:
     ^(AlfrescoFolder* folder, NSError* error)
    {
        currentFolder = folder;
        errorCode = error;
    }];
}

-retrieveChildrenInFolder
{
    [service retrieveChildrenInFolder:currentFolder
    completionBlock:^(NSArray* array, NSError* error)
    {
        
    }];
}
@end
