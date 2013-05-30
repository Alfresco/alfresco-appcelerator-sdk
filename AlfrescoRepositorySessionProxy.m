//
//  AlfrescoRepositorySessionProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 20/05/2013.
//
//

#import "AlfrescoRepositorySessionProxy.h"
#import "AlfrescoRepositorySession.h"
#import "AlfrescoSessionCompletionBlockProxy.h"

@implementation AlfrescoRepositorySessionProxy


-(AlfrescoRequestProxy *)connect:(id)args
{
    NSURL *url = [NSURL URLWithString:[args objectAtIndex:0]];
    NSString *user = [args objectAtIndex:1];
    NSString *pwd = [args objectAtIndex:2];
    AlfrescoSessionCompletionBlockProxy * compBlock = [args objectAtIndex:3];
    
    AlfrescoRequest* request;
    AlfrescoRepositorySessionProxy *weakSelf = [self autorelease];
    
    if ([args length] > 4)
    {
        NSDictionary *params = [args objectAtIndex:4];
        request = [AlfrescoRepositorySession connectWithUrl:url username:user password:pwd parameters:params
                                            completionBlock:^(id<AlfrescoSession> session, NSError *error){
                                                if (nil == session)
                                                {
                                                    NSLog(@"Error connecting to repository: %@", error);
                                                }
                                                else
                                                {
                                                    weakSelf.session = session;
                                                    NSLog(@"Authenticated successfully.");
                                                    
                                                    // get repository info
                                                    weakSelf.info = weakSelf.session.repositoryInfo;
                                                    
                                                    NSLog(@"RepositoryInfo:");
                                                    NSLog(@"%@",weakSelf.info.name);
                                                    NSLog(@"%@",weakSelf.info.edition);
                                                    NSLog(@"%@",weakSelf.info.buildNumber);
                                                    NSLog(@"%@",weakSelf.info.version);
                                                    
                                                    weakSelf.session = nil;
                                                }
                                            }];
        
    }
    else
    {
        request = [AlfrescoRepositorySession connectWithUrl:url username:user password:pwd
                                            completionBlock:^(id<AlfrescoSession> session, NSError *error){
                                                if (nil == session)
                                                {
                                                    NSLog(@"Error connecting to repository: %@", error);
                                                }
                                                else
                                                {
                                                    weakSelf.session = session;
                                                    NSLog(@"Authenticated successfully.");
                                                    
                                                    // get repository info
                                                    weakSelf.info = weakSelf.session.repositoryInfo;
                                                    
                                                    NSLog(@"RepositoryInfo:");
                                                    NSLog(@"%@",weakSelf.info.name);
                                                    NSLog(@"%@",weakSelf.info.edition);
                                                    NSLog(@"%@",weakSelf.info.buildNumber);
                                                    NSLog(@"%@",weakSelf.info.version);
                                                    
                                                    weakSelf.session = nil;
                                                }
                                            }];

    }
}

@end
