//
//  AlfrescoSessionProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 29/05/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoSession.h"

@interface AlfrescoSessionProxy : TiProxy

@property (nonatomic) id<AlfrescoSession> session;
@property (nonatomic, strong) AlfrescoRepositoryInfo *info;

@end
