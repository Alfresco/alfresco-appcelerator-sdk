//
//  ComAlfrescoAppceleratorSdkFolder.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 17/06/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoDocument.h"


@interface ComAlfrescoAppceleratorSdkDocumentProxy : TiProxy

@property (nonatomic, strong) AlfrescoDocument* currentDocument;

- (id)initWithDocument:(AlfrescoDocument *)document;
- (void)dealloc;

@end
