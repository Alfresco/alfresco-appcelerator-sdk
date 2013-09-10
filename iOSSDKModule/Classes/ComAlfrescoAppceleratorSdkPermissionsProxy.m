//
//  ComAlfrescoAppceleratorSdkPermissionsProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 10/09/2013.
//
//

#import "ComAlfrescoAppceleratorSdkPermissionsProxy.h"

@implementation ComAlfrescoAppceleratorSdkPermissionsProxy

-(id)initWithPermissions:(AlfrescoPermissions*)p
{
    self->permissions = p;
    
    NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"canEdit", @"canDelete", @"canAddChildren", @"canComment", @"canGetContent", @"canSetContent", @"canGetProperties", @"canGetAllVersions", @"canGetChildren", nil];
    NSMutableDictionary* values = [[permissions dictionaryWithValuesForKeys:keys] mutableCopy];
    
    [self setValuesForKeysWithDictionary:values];
    
    return self;
}


-(id)init
{
    self->permissions = [[AlfrescoPermissions alloc]init];
    
    //
    // TODO: Incoming properties will need mapping to AlfrescoProperties when R/W properties implemented:
    //
    //[self valueForKey:@"canEdit"];
    //[self valueForKey:@"canDelete"];
    //[self valueForKey:@"canAddChildren"];
    //[self valueForKey:@"canComment;"];
    //[self valueForKey:@"canGetContent"];
    //[self valueForKey:@"canSetContent"];
    //[self valueForKey:@"canGetProperties"];
    //[self valueForKey:@"canGetChildren"];
    //[self valueForKey:@"canGetAllVersions"];
    
    return self;
}
@end
