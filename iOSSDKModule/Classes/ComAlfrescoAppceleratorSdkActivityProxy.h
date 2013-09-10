//
//  ComAlfrescoAppceleratorSdkActivityProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 10/09/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoActivityEntry.h"

@interface ComAlfrescoAppceleratorSdkActivityProxy : TiProxy
{
    @public
    AlfrescoActivityEntry* entry;
}

-(id)initWithActivityEntry:(AlfrescoActivityEntry*)e;

@end
