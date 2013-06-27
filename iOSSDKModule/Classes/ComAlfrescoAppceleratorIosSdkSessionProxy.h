//
//  AlfrescoSessionProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 29/05/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoSession.h"

@interface ComAlfrescoAppceleratorIosSdkSessionProxy : TiProxy

@property (nonatomic, strong) id<AlfrescoSession> session;
@property (nonatomic, strong) AlfrescoRepositoryInfo *info;
@property (nonatomic, strong) NSError *error;

@end
