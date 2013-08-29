//
//  ComAlfrescoAppceleratorSdkKeywordSearchOptionsProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 29/08/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoKeywordSearchOptions.h"

@interface ComAlfrescoAppceleratorSdkKeywordSearchOptionsProxy : TiProxy

@property (nonatomic, strong) AlfrescoKeywordSearchOptions* searchOptions;

-(void)init:(id)noargs;

-(void)initWithExactMatch:(id)args;

-(void)initWithFolder:(id)args;

-(void)initWithExactMatchAndFolder:(id)args;

@end
