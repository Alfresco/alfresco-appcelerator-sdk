//
//  ComAlfrescoAppceleratorSdkPersonProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 16/09/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoPerson.h"


@interface ComAlfrescoAppceleratorSdkPersonProxy : TiProxy
{
    @public
    AlfrescoPerson* person;
}

-(id)initWithPerson:(AlfrescoPerson *)person;

@end
