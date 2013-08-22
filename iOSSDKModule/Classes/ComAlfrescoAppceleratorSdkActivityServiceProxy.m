//
//  ComAlfrescoAppceleratorSdkActivityServiceProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 19/08/2013.
//
//

#import "ComAlfrescoAppceleratorSdkActivityServiceProxy.h"
#import "ComAlfrescoAppceleratorSdkSiteProxy.h"
#import "ComAlfrescoAppceleratorSdkListingContext.h"


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


-(void)createEventWithActivityEntry:(AlfrescoActivityEntry*)entry
{
    NSMutableArray* keys = [[NSMutableArray alloc] initWithObjects:@"identifier", @"createdAt", @"createdBy",
                                                                   @"siteShortName", @"type", @"data", nil];
    
    NSMutableDictionary* values = [[entry dictionaryWithValuesForKeys:keys] mutableCopy];
    
    [self fireEvent:@"activitynode" withObject:values];
}


-(void)createEventWithPagingResult:(AlfrescoPagingResult*)pagingResult
{
    NSDictionary *values = [NSDictionary dictionaryWithObjectsAndKeys:
                            [NSNumber numberWithBool:pagingResult.hasMoreItems], @"hasmoreitems",
                            [NSNumber numberWithBool:pagingResult.totalItems], @"totalitems",
                            nil];
    
    [self fireEvent:@"pagingresult" withObject:values];
}


-(void)retrieveActivityStream:(id)noargs
{
    ENSURE_UI_THREAD_0_ARGS
    
    [service retrieveActivityStreamWithCompletionBlock:^(NSArray* array, NSError* error)
    {
        for (int i = 0;  i < array.count;  i++)
        {
            [self createEventWithActivityEntry:[array objectAtIndex:i]];
        }
    }];
}


- (void)retrieveActivityStreamWithListingContext:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkListingContext)
    
    ComAlfrescoAppceleratorSdkListingContext* listingContextProxy = arg;
    AlfrescoListingContext* listingContext = listingContextProxy.listingContext;

    [service retrieveActivityStreamWithListingContext:listingContext completionBlock:^(AlfrescoPagingResult *pagingResult, NSError *error)
    {
        for (int i = 0;  i < pagingResult.objects.count;  i++)
        {
            [self createEventWithActivityEntry:[pagingResult.objects objectAtIndex:i]];
        }
         
        [self createEventWithPagingResult:pagingResult];
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
            [self createEventWithActivityEntry:[array objectAtIndex:i]];
        }
    }];
}


-(void)retrieveActivityStreamForPersonWithListingContext:(id)args
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkListingContext)
    
    ComAlfrescoAppceleratorSdkListingContext* listingContextProxy = arg;
    AlfrescoListingContext* listingContext = listingContextProxy.listingContext;
    
    [service retrieveActivityStreamWithListingContext:listingContext completionBlock:^(AlfrescoPagingResult *pagingResult, NSError *error)
     {
         for (int i = 0;  i < pagingResult.objects.count;  i++)
         {
             [self createEventWithActivityEntry:[pagingResult.objects objectAtIndex:i]];
         }
         
         [self createEventWithPagingResult:pagingResult];
     }];
}


-(void)retrieveActivityStreamForSite:(id)arg
{
    NSString* site = [arg objectAtIndex:0];
    
    ComAlfrescoAppceleratorSdkSiteProxy* siteProxy = arg;
    AlfrescoSite* site = siteProxy.currentSite;
    
    [service retrieveActivityStreamForSite:site completionBlock:^(NSArray* array, NSError* error)
    {
        for (int i = 0;  i < array.count;  i++)
        {
            [self createEventWithActivityEntry:[array objectAtIndex:i]];
        }
    }];
}


@end
