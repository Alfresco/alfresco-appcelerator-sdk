//
//  ComAlfrescoAppceleratorSdkCommentProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 12/09/2013.
//
//

#import "ComAlfrescoAppceleratorSdkCommentProxy.h"

@implementation ComAlfrescoAppceleratorSdkCommentProxy

-(id)initWithComment:(AlfrescoComment*)c
{
    comment = c;
    
    NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"identifier", @"name", @"title", @"createdAt", @"modifiedAt", @"content", @"createdBy", @"isEdited", @"canEdit", @"canDelete", nil];
        
    NSMutableDictionary* values = [[comment dictionaryWithValuesForKeys:keys] mutableCopy];
    
    [self setValuesForKeysWithDictionary:values];
    
    return self;
}

@end
