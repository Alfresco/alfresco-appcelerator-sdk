//
//  ComAlfrescoAppceleratorSdkSearchServiceProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 27/08/2013.
//
//

#import "TiProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "AlfrescoSearchService.h"

@interface ComAlfrescoAppceleratorSdkSearchServiceProxy : TiProxy
{
    AlfrescoSearchService* service;
    NSError* errorCode;
}

-(void)initWithSession:(id)arg;

-(void)searchWithStatement:(id)arg;

-(void)searchWithStatementAndListingContext:(id)args;

-(void)searchWithKeywords:(id)args;

-(void)searchWithKeywordsAndListingContext:(id)args;


//Internal

-(void)internalSearchWithStatement:(id)dictionary;

-(void)internalSearchWithKeywords:(id)dictionary;

@end
