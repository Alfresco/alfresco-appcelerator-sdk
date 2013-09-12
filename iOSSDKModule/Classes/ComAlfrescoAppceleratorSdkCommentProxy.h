//
//  ComAlfrescoAppceleratorSdkCommentProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 12/09/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoComment.h"

@interface ComAlfrescoAppceleratorSdkCommentProxy : TiProxy
{
    @public
    AlfrescoComment* comment;
}

-(id)initWithComment:(AlfrescoComment *)c;

@end
