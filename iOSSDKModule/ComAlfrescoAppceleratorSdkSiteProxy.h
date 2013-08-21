//
//  ComAlfresconAppceleratorSdkSiteProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 19/08/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoSite.h"

@interface ComAlfrescoAppceleratorSdkSiteProxy : TiProxy

@property (nonatomic, strong) AlfrescoSite* currentSite;

- (id)initWithSite:(AlfrescoSite *)site;
- (id)getSiteName:(id)args;

- (void)dealloc;

@end
