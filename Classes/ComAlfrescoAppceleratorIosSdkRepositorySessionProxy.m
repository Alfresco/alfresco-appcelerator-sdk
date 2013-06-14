//
//  AlfrescoRepositorySessionProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 20/05/2013.
//
//

#import "ComAlfrescoAppceleratorIosSdkRepositorySessionProxy.h"
#import "ComAlfrescoAppceleratorIosSdkSessionCompletionBlockProxy.h"

#import "AlfrescoRepositorySession.h"

#import "TiUtils.h"

@implementation ComAlfrescoAppceleratorIosSdkRepositorySessionProxy


-(void)connect:(id)args
{
    ENSURE_UI_THREAD_0_ARGS
    
    NSURL *url = [NSURL URLWithString:[self valueForKey:@"serverUrl"]];
    NSString *user = [self valueForKey:@"serverUsername"];
    NSString *pwd = [self valueForKey:@"serverPassword"];
    
    if (url == nil  ||  user == nil  ||  pwd == nil)
    {
        NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:[[NSNumber alloc]initWithInt:1], @"errorcode", nil];
        [self fireEvent:@"paramerror" withObject:event];
        
        return;
    }
    
    AlfrescoRequest* request;
    ComAlfrescoAppceleratorIosSdkRepositorySessionProxy *weakSelf = self;
  
    request = [AlfrescoRepositorySession connectWithUrl:url username:user password:pwd
                                                        completionBlock:^(id<AlfrescoSession> session, NSError *error)
                                                        {
                                                            if (nil == session)
                                                            {
                                                                self.error = error;
                                                                
                                                                NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:[[NSNumber alloc]initWithInt:error.code], @"errorcode", nil];
                                                                [weakSelf fireEvent:@"error" withObject:event];
                                                            }
                                                            else
                                                            {
                                                                weakSelf.session = session;
                                                                weakSelf.info = weakSelf.session.repositoryInfo;
                                                                
                                                                NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:weakSelf.info.name, @"servername", nil];
                                                                [weakSelf fireEvent:@"success" withObject:event];
                                                            }
                                                        }];
}

@end
