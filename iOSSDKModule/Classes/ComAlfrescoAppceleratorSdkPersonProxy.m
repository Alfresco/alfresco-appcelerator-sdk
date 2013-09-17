//
//  ComAlfrescoAppceleratorSdkPersonProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 16/09/2013.
//
//

#import "ComAlfrescoAppceleratorSdkPersonProxy.h"

@implementation ComAlfrescoAppceleratorSdkPersonProxy

-(id)initWithPerson:(AlfrescoPerson *)p
{
    self->person = p;
    
    NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"identifier", @"firstName", @"lastName", @"fullName", @"avatarIdentifier", nil];
    
    NSMutableDictionary* values = [[person dictionaryWithValuesForKeys:keys] mutableCopy];
    
    [self setValuesForKeysWithDictionary:values];
    
    return self;
}


@end
