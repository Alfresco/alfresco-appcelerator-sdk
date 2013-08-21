//
//  ComAlfrescoAppceleratorSdkActivityServiceProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 19/08/2013.
//
//

#import "ComAlfrescoAppceleratorSdkActivityServiceProxy.h"
#import "ComAlfrescoAppceleratorSdkSiteProxy.h"

@implementation ComAlfrescoAppceleratorSdkActivityServiceProxy

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
    
    errorCode = [[NSError alloc]init];
    
    service = [[AlfrescoActivityStreamService alloc] initWithSession:sessionProxy.session];
}


-(void)retrieveActivityStream:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
    
    [service retrieveActivityStreamWithCompletionBlock:^(NSArray* array, NSError* error)
    {
        for (int i = 0;  i < array.count;  i++)
        {
            AlfrescoActivityEntry* entry = [array objectAtIndex:i];
            NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"identifier", @"createdAt", @"createdBy", @"siteShortName", @"type", @"data", nil];
            NSMutableDictionary* values = [[entry dictionaryWithValuesForKeys:keys] mutableCopy];
            
            [self fireEvent:@"activitynode" withObject:values];
        }
    }];
}


-(void)retrieveActivityStreamForPerson:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,NSString)
    
    NSString* person = arg;

    [service retrieveActivityStreamForPerson:person completionBlock:^(NSArray* array, NSError* error)
    {
        for (int i = 0;  i < array.count;  i++)
        {
            AlfrescoActivityEntry* entry = [array objectAtIndex:i];
            NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"identifier", @"createdAt", @"createdBy", @"siteShortName", @"type", @"data", nil];
            NSMutableDictionary* values = [[entry dictionaryWithValuesForKeys:keys] mutableCopy];
            
            [self fireEvent:@"activitynode" withObject:values];
        }
    }];
}


-(void)retrieveActivityStreamForSite:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkSiteProxy)
    
    ComAlfrescoAppceleratorSdkSiteProxy* siteProxy = arg;
    AlfrescoSite* site = siteProxy.currentSite;
    
    [service retrieveActivityStreamForSite:site completionBlock:^(NSArray* array, NSError* error)
    {
        for (int i = 0;  i < array.count;  i++)
        {
            AlfrescoActivityEntry* entry = [array objectAtIndex:i];
            NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"identifier", @"createdAt", @"createdBy", @"siteShortName", @"type", @"data", nil];
            NSMutableDictionary* values = [[entry dictionaryWithValuesForKeys:keys] mutableCopy];
            
            [self fireEvent:@"activitynode" withObject:values];
        }
    }];
}


@end
