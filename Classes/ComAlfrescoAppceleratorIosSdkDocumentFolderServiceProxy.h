//
//  AlfrescoDocumentFolderServiceProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 29/05/2013.
//
//

#import "TiProxy.h"
#import "ComAlfrescoAppceleratorIosSdkSessionProxy.h"
#import "AlfrescoDocumentFolderService.h"

@interface ComAlfrescoAppceleratorIosSdkDocumentFolderServiceProxy : TiProxy
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

//-(void)enumerateFolderProperties:(AlfrescoNode*)node propertyValues:(NSDictionary*)propValues;
@end
