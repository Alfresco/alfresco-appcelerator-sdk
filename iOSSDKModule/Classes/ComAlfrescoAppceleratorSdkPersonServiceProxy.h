//
//  ComAlfrescoAppceleratorSdkPersonServiceProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 16/09/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoPersonService.h"


@interface ComAlfrescoAppceleratorSdkPersonServiceProxy : TiProxy
{
    AlfrescoPersonService* service;
}

-(void)initWithSession:(id)arg;

-(void)retrievePersonWithIdentifier:(id)arg;

-(void)retrieveAvatarForPerson:(id)arg;

@end
