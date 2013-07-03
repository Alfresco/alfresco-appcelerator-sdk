//
//  ComAlfrescoAppceleratorIosSdkFolder.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 17/06/2013.
//
//

#import "ComAlfrescoAppceleratorSdkDocumentProxy.h"

@implementation ComAlfrescoAppceleratorSdkDocumentProxy
@synthesize currentDocument;

- (id)initWithDocument:(AlfrescoDocument *)document
{
    currentDocument = document;
    return self;
}

- (void)dealloc
{
    NSLog(@"[INFO] DocumentProxy object %@ being deallocated", currentDocument.name);
}

@end
 