//
//  ComAlfrescoAppceleratorSdkListingContext.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 22/08/2013.
//
//

#import "TiProxy.h"
#include "AlfrescoListingContext.h"


@interface ComAlfrescoAppceleratorSdkListingContextProxy : TiProxy

@property (nonatomic, strong) AlfrescoListingContext* listingContext;

-(void)init:(id)noargs;

-(void)initWithMaxItems:(id)arg;

-(void)initWithMaxItemsAndSkipCount:(id)args;

-(void)initWithSortProperty:(id)args;

-(void)initWithMaxItems:(id)args;

@end
