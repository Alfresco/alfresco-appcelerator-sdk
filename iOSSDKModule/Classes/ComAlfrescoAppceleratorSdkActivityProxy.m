//
//  ComAlfrescoAppceleratorSdkActivityProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 10/09/2013.
//
//

#import "ComAlfrescoAppceleratorSdkActivityProxy.h"

@implementation ComAlfrescoAppceleratorSdkActivityProxy

-(id)initWithActivityEntry:(AlfrescoActivityEntry*)e
{
    self->entry = e;
    
    NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"identifier", @"createdAt", @"createdBy",
                            @"siteShortName", @"type", @"data", nil];
    NSMutableDictionary* values = [[entry dictionaryWithValuesForKeys:keys] mutableCopy];
    
    [self setValuesForKeysWithDictionary:values];
    
    return self;
}

@end
