//
//  ComAlfresconAppceleratorSdkSiteProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 19/08/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoSite.h"
#import "ComAlfrescoAppceleratorSdkSiteProxy.h"

@implementation ComAlfrescoAppceleratorSdkSiteProxy
@synthesize currentSite;

- (id)initWithSite:(AlfrescoSite *)site
{
    currentSite = site;
    return self;
}

- (id)getSiteName:(id)args
{
    return currentSite.shortName;
}

- (void)dealloc
{
    NSLog(@"[INFO] SiteProxy object %@ being deallocated", currentSite.shortName);
}

@end
