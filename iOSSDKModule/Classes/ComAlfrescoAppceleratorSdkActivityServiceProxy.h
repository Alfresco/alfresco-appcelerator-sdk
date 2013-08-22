//
//  ComAlfrescoAppceleratorSdkActivityServiceProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 19/08/2013.
//
//

#import "TiProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "AlfrescoActivityStreamService.h"

@interface ComAlfrescoAppceleratorSdkActivityServiceProxy : TiProxy
{
    AlfrescoActivityStreamService* service;
    NSError* errorCode;
}

-(void)createEvent:(AlfrescoActivityEntry*)entry;

-(void)initWithSession:(id)arg;

-(void)retrieveActivityStream:(id)noargs;
-(void)retrieveActivityStreamWithListingContext:(id)arg;
-(void)retrieveActivityStreamForPerson:(id)arg;
-(void)retrieveActivityStreamForPersonWithListingContext:(id)args;
-(void)retrieveActivityStreamForSite:(id)arg;
-(void)retrieveActivityStreamForSiteWithListingContext:(id)args;

/*
 

-(void)retrieveActivityStreamForPerson:(id)args;
-(void)retrieveActivityStreamForSite:(id)args;
 
*/

@end
