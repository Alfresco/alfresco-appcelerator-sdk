//
//  ComAlfrescoAppceleratorSdkListingContext.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 22/08/2013.
//
//

#import "ComAlfrescoAppceleratorSdkListingContext.h"

@implementation ComAlfrescoAppceleratorSdkListingContext

@synthesize listingContext;


-(void)init:(id)noargs
{
    listingContext = [[AlfrescoListingContext alloc]init];
}


-(void)initWithMaxItems:(id)arg
{
    ENSURE_SINGLE_ARG(arg,NSNumber)

    NSNumber* maxItems = arg;
    
    listingContext = [[AlfrescoListingContext alloc]initWithMaxItems:maxItems];
}


-(void)initWithMaxItemsAndSkipCount:(id)args
{
    NSNumber* maxItems = [args objectAtIndex:0];
    NSNumber* skipCount = [args objectAtIndex:1];
    
    listingContext = [[AlfrescoListingContext alloc]initWithMaxItems:maxItems skipCount:skipCount];
}


-(void)initWithSortProperty:(id)args
{
    NSString* sortProperty = [args objectAtIndex:0];
    BOOL sortAscending = ([args objectAtIndex:1] > 0);
    
    listingContext = [[AlfrescoListingContext alloc]initWithSortProperty:sortProperty sortAscending:sortAscending];
}


- (id)initWithAllParams:(id)args
{
    NSNumber* maxItems = [args objectAtIndex:0];
    NSNumber* skipCount = [args objectAtIndex:1];
    NSString* sortProperty = [args objectAtIndex:2];
    BOOL sortAscending = ([args objectAtIndex:3] > 0);
    
    listingContext = [[AlfrescoListingContext alloc]initWithMaxItems:maxItems skipCount:skipCount sortProperty:sortProperty
                                                                     sortAscending:sortAscending];
}

@end
