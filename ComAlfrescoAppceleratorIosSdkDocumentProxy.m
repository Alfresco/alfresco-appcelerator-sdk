//
//  ComAlfrescoAppceleratorIosSdkFolder.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 17/06/2013.
//
//

#import "ComAlfrescoAppceleratorIosSdkDocumentProxy.h"

@implementation ComAlfrescoAppceleratorIosSdkDocumentProxy
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
 