//
//  ComAlfrescoAppceleratorSdkCommentService.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 12/09/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoCommentService.h"


@interface ComAlfrescoAppceleratorSdkCommentServiceProxy : TiProxy
{
    AlfrescoCommentService* service;
    NSError* errorCode;
}

-(void)initWithSession:(id)arg;

-(void)retrieveCommentsForNode:(id)arg;

-(void)retrieveCommentsForNodeWithListingContext:(id)args;

@end
