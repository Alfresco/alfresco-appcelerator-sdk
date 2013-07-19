//
//  AlfrescoDocumentFolderServiceProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 29/05/2013.
//
//

#import "TiProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "AlfrescoDocumentFolderService.h"

@interface ComAlfrescoAppceleratorSdkDocumentFolderServiceProxy : TiProxy
{
    AlfrescoDocumentFolderService* service;
    AlfrescoFolder* currentFolder;
    NSError* errorCode;
   __strong NSMutableDictionary* folders;
}

-(void)initWithSession:(id)arg;
-(void)retrieveRootFolder:(id)noargs;
-(void)setFolder:(id)arg;
-(void)retrieveChildrenInFolder:(id)noargs;
-(id)getCurrentFolder:(id)noargs;
-(void)saveDocument:(id)arg;

@end
