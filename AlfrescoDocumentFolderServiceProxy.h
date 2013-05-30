//
//  AlfrescoDocumentFolderServiceProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 29/05/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoSessionProxy.h"
#import "AlfrescoDocumentFolderService.h"

@interface AlfrescoDocumentFolderServiceProxy : TiProxy
{
    AlfrescoDocumentFolderService* service;
    AlfrescoFolder* currentFolder;
    NSError* errorCode;
}

- (id)initWithSession:(id)args;
-retrieveRootFolder;
-retrieveChildrenInFolder;

@end
