//
//  ComAlfrescoAppceleratorSdkSearchServiceProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 27/08/2013.
//
//

#import "ComAlfrescoAppceleratorSdkSearchServiceProxy.h"
#import "ComAlfrescoAppceleratorSdkSiteProxy.h"
#import "ComAlfrescoAppceleratorSdkListingContextProxy.h"
#import "ComAlfrescoAppceleratorSdkKeywordSearchOptionsProxy.h"
#import "SDKUtil.h"


@implementation ComAlfrescoAppceleratorSdkSearchServiceProxy

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
    
    service = [[AlfrescoSearchService alloc] initWithSession:sessionProxy.session];
}


-(void)searchWithStatementAndListingContext:(id)args
{
    NSString* statement = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkListingContextProxy* listingContextProxy = [args objectAtIndex:1];
    
    AlfrescoListingContext* listingContext = listingContextProxy.listingContext;
    
    NSDictionary *internalParams = [NSDictionary dictionaryWithObjectsAndKeys:listingContext, @"listingContext",
                                                                              statement, @"statement",
                                                                              nil];
    [self internalSearchWithStatement:internalParams];
}

-(void)searchWithStatement:(id)arg
{
    ENSURE_SINGLE_ARG(arg,NSString)
    
    [service searchWithStatement:(NSString *)arg language:AlfrescoSearchLanguageCMIS completionBlock:^(NSArray* array, NSError* error)
     {
         if (error != NULL)
             NSLog(@"[INFO] Error %@", error.description);
         
         for (int i = 0;  i < array.count;  i++)
         {
             [SDKUtil createEventWithNode:[array objectAtIndex:i] proxyObject:self];
         }
     }];
}


-(void)searchWithKeywords:(id)args
{
    NSString* keywords = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkKeywordSearchOptionsProxy* searchOptionsProxy = [args objectAtIndex:1];
    AlfrescoKeywordSearchOptions* searchOptions = searchOptionsProxy.searchOptions;
    
    NSDictionary *internalParams = [NSDictionary dictionaryWithObjectsAndKeys:searchOptions, @"searchOptions",
                                    keywords, @"keywords",
                                    nil];
    [self internalSearchWithKeywords:internalParams];
}


-(void)searchWithKeywordsAndListingContext:(id)args
{
    NSString* keywords = [args objectAtIndex:0];
    ComAlfrescoAppceleratorSdkKeywordSearchOptionsProxy* searchOptionsProxy = [args objectAtIndex:1];
    AlfrescoKeywordSearchOptions* searchOptions = searchOptionsProxy.searchOptions;
    ComAlfrescoAppceleratorSdkListingContextProxy* listingContextProxy = [args objectAtIndex:2];
    AlfrescoListingContext* listingContext = listingContextProxy.listingContext;
    
    NSDictionary *internalParams = [NSDictionary dictionaryWithObjectsAndKeys:searchOptions, @"searchOptions",
                                    keywords, @"keywords",
                                    listingContext, @"listingContext",
                                    nil];
    [self internalSearchWithKeywords:internalParams];
}


//
//This allows us to use multiple arguments on the JS interface for user-friendliness, but pass them on as an NSDictionary in order
//to ensure the ENSURE_UI_THREAD_1_ARG is called (a quirk for the iOS Module creation, that we must be on the UI thread initially,
//even if we then create further threads for the completionBlock).
//
-(void)internalSearchWithKeywords:(id)dictionary
{
    ENSURE_UI_THREAD_1_ARG(dictionary)
    ENSURE_SINGLE_ARG(dictionary,NSDictionary)

    AlfrescoListingContext* listingContext = [dictionary objectForKey:@"listingContext"];
    
    if (listingContext != NULL)
    {
        [service searchWithKeywords:[dictionary objectForKey:@"keywords"] options:[dictionary objectForKey:@"searchOptions"] listingContext:listingContext
                    completionBlock:^(AlfrescoPagingResult *pagingResult, NSError *error)
         {
             if (error != NULL)
                 NSLog(@"[INFO] Error %@", error.description);
             
             for (int i = 0;  i < pagingResult.objects.count;  i++)
             {
                 [SDKUtil createEventWithNode:[pagingResult.objects objectAtIndex:i] proxyObject:self];
             }
             
             [SDKUtil createEventWithPagingResult:pagingResult proxyObject:self];
         }];
    }
    else
    {
        [service searchWithKeywords:[dictionary objectForKey:@"keywords"] options:[dictionary objectForKey:@"searchOptions"]
        completionBlock:^(NSArray* array, NSError* error)
         {
             if (error != NULL)
                 NSLog(@"[INFO] Error %@", error.description);
             
             for (int i = 0;  i < array.count;  i++)
             {
                 [SDKUtil createEventWithNode:[array objectAtIndex:i] proxyObject:self];
             }
         }];
    }
}


//
//This allows us to use multiple arguments on the JS interface for user-friendliness, but pass them on as an NSDictionary in order
//to ensure the ENSURE_UI_THREAD_1_ARG is called (a quirk for the iOS Module creation, that we must be on the UI thread initially,
//even if we then create further threads for the completionBlock).
//
-(void)internalSearchWithStatement:(id)dictionary
{
    ENSURE_UI_THREAD_1_ARG(dictionary)
    ENSURE_SINGLE_ARG(dictionary,NSDictionary)
        
    [service searchWithStatement:[dictionary objectForKey:@"statement"] language:AlfrescoSearchLanguageCMIS
                                 listingContext:[dictionary objectForKey:@"listingContext"]
    completionBlock:^(AlfrescoPagingResult *pagingResult, NSError *error)
    {
        if (error != NULL)
            NSLog(@"[INFO] Error %@", error.description);
        
         for (int i = 0;  i < pagingResult.objects.count;  i++)
         {
             [SDKUtil createEventWithNode:[pagingResult.objects objectAtIndex:i] proxyObject:self];
         }
         
         [SDKUtil createEventWithPagingResult:pagingResult proxyObject:self];
    }];
}

@end
