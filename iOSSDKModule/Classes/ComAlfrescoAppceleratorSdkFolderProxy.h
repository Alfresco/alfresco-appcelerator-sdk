//
//  ComAlfrescoAppceleratorIosSdkFolder.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 17/06/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoFolder.h"


@interface ComAlfrescoAppceleratorSdkFolderProxy : TiProxy

@property (nonatomic, strong) AlfrescoFolder* currentFolder;

- (id)initWithFolder:(AlfrescoFolder *)folder;
- (id)getFolderName:(id)args;

- (void)dealloc;

@end
