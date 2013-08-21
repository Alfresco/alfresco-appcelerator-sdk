//
//  AlfrescoSiteServiceProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 14/08/2013.
//
//

#import "TiProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "AlfrescoSiteService.h"

@interface ComAlfrescoAppceleratorSdkSiteServiceProxy : TiProxy
{
    AlfrescoSiteService* service;
    NSError* errorCode;
}

-(void)initWithSession:(id)arg;

-(void)retrieveAllSites:(id)noargs;
-(void)retrieveSites:(id)noargs;
-(void)retrieveFavoriteSites:(id)noargs;
-(void)retrieveSiteWithShortName:(id)arg;
-(void)retrieveDocumentLibraryFolderForSite:(id)arg;
-(void)clearSitesCache:(id)noargs;

@end
