//
//  ComAlfrescoAppceleratorSdkCommentService.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 12/09/2013.
//
//

#import "ComAlfrescoAppceleratorSdkCommentServiceProxy.h"
#import "ComAlfrescoAppceleratorSdkSessionProxy.h"
#import "ComAlfrescoAppceleratorSdkNodeProxy.h"
#import "ComAlfrescoAppceleratorSdkCommentProxy.h"

@implementation ComAlfrescoAppceleratorSdkCommentServiceProxy

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
    
    service = [[AlfrescoCommentService alloc] initWithSession:sessionProxy.session];
}


-(void)retrieveCommentsForNode:(id)arg
{
    ENSURE_UI_THREAD_1_ARG(arg)
    ENSURE_SINGLE_ARG(arg,ComAlfrescoAppceleratorSdkNodeProxy)
    
    ComAlfrescoAppceleratorSdkNodeProxy* nodeProxy = arg;

    NSLog(@"[INFO] Retrieving comments for node %@", nodeProxy->node.name);
    
    [service retrieveCommentsForNode:nodeProxy->node
     completionBlock:^(NSArray* array, NSError* error)
     {
         if (error != NULL)
             NSLog(@"[INFO] Error %@", error.description);
         
         for (int i = 0;  i < array.count;  i++)
         {
             AlfrescoComment* comment = [array objectAtIndex:i];
             
             NSLog(@"[INFO] Comment %@", comment.content);
             
             ComAlfrescoAppceleratorSdkCommentProxy* commentProxy = [[ComAlfrescoAppceleratorSdkCommentProxy alloc]initWithComment:comment];
             
             NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:commentProxy, @"comment", nil];
             [self fireEvent:@"commentnode" withObject:event];
         }
     }];
}


-(void)retrieveCommentsForNodeWithListingContext:(id)args
{
    
}

@end
