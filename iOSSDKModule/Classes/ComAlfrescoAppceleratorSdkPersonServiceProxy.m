//
//  ComAlfrescoAppceleratorSdkPersonService.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 16/09/2013.
//
//

#import "ComAlfrescoAppceleratorSdkPersonServiceProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "ComAlfrescoAppceleratorSdkPersonProxy.h"
#import "ComAlfrescoAppceleratorSdkContentFileProxy.h"


@implementation ComAlfrescoAppceleratorSdkPersonServiceProxy

-(void)initWithSession:(id)arg
{
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkSessionProxy)
    
    ComAlfrescoAppceleratorSdkSessionProxy* sessionProxy = arg;
    
    if (sessionProxy == nil || sessionProxy.session == nil)
    {
        NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:[[NSNumber alloc]initWithInt:1], @"errorcode", nil];
        [self fireEvent:@"paramerror" withObject:event];
        
        return;
    }
    
    service = [[AlfrescoPersonService alloc] initWithSession:sessionProxy.session];
}


-(void)retrievePersonWithIdentifier:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSString)
    
    [service retrievePersonWithIdentifier:arg completionBlock:^(AlfrescoPerson* person, NSError* error)
     {
         ComAlfrescoAppceleratorSdkPersonProxy* personProxy = [[ComAlfrescoAppceleratorSdkPersonProxy alloc]initWithPerson:person];
         
         NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:personProxy, @"person", nil];
         
         [self fireEvent:@"personnode" withObject:event];
     }];
}


-(void)retrieveAvatarForPerson:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkPersonProxy)
    
    [service retrieveAvatarForPerson:((ComAlfrescoAppceleratorSdkPersonProxy*)arg)->person
     completionBlock:^(AlfrescoContentFile* contentFile, NSError* error)
     {
         NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:
                                [[ComAlfrescoAppceleratorSdkContentFileProxy alloc] initWithContentFile:contentFile], @"contentfile",
                                nil];
         
         [self fireEvent:@"retrievedavatar" withObject:event];
    }];
}

@end
