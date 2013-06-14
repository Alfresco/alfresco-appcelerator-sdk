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
    NSDictionary *values;
}

-(void)initWithSession:(id)args;
-(void)retrieveRootFolder:(id)args;
-(void)retrieveChildrenInFolder:(id)args;

-(void)enumerateFolderProperties:(AlfrescoNode*)node propertyValues:(NSDictionary*)propValues;
@end
