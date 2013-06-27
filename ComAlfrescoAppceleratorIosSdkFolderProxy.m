//
//  ComAlfrescoAppceleratorIosSdkFolder.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 17/06/2013.
//
//

#import "ComAlfrescoAppceleratorIosSdkFolderProxy.h"

@implementation ComAlfrescoAppceleratorIosSdkFolderProxy
@synthesize currentFolder;

- (id)initWithFolder:(AlfrescoFolder *)Folder
{
    currentFolder = Folder;
    return self;
}

- (id)getFolderName:(id)args
{
    return currentFolder.name;
}

- (void)dealloc
{
    NSLog(@"[INFO] FolderProxy object %@ being deallocated", currentFolder.name);
}

@end
