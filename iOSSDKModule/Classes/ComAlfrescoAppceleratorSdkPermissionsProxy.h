//
//  ComAlfrescoAppceleratorSdkPermissionsProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 10/09/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoPermissions.h"


@interface ComAlfrescoAppceleratorSdkPermissionsProxy : TiProxy
{
    @public
    AlfrescoPermissions* permissions;
}

-(id)init;

-(id)initWithPermissions:(AlfrescoPermissions*)permissions;

@end
