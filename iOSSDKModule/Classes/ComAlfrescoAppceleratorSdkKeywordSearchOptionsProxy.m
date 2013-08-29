//
//  ComAlfrescoAppceleratorSdkKeywordSearchOptionsProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 29/08/2013.
//
//

#import "ComAlfrescoAppceleratorSdkKeywordSearchOptionsProxy.h"
#import "ComAlfrescoAppceleratorSdkFolderProxy.h"

@implementation ComAlfrescoAppceleratorSdkKeywordSearchOptionsProxy
@synthesize searchOptions;

-(void)init:(id)noargs
{
    searchOptions = [[AlfrescoKeywordSearchOptions alloc]init];
}


-(void)initWithExactMatch:(id)args
{
    BOOL exactMatch = [args objectAtIndex:0];
    BOOL includeContent = [args objectAtIndex:1];
    
    searchOptions = [[AlfrescoKeywordSearchOptions alloc]initWithExactMatch:exactMatch includeContent:includeContent];
}


-(void)initWithFolder:(id)args
{
    ComAlfrescoAppceleratorSdkFolderProxy* folderProxy = [args objectAtIndex:0];
    AlfrescoFolder* folder = folderProxy.currentFolder;
    BOOL includeDescendants = [args objectAtIndex:1];
    
    searchOptions = [[AlfrescoKeywordSearchOptions alloc]initWithFolder:folder includeDescendants:includeDescendants];
}


-(void)initWithExactMatchAndFolder:(id)args
{
    BOOL exactMatch = [args objectAtIndex:0];
    BOOL includeContent = [args objectAtIndex:1];
    ComAlfrescoAppceleratorSdkFolderProxy* folderProxy = [args objectAtIndex:2];
    AlfrescoFolder* folder = folderProxy.currentFolder;
    BOOL includeDescendants = [args objectAtIndex:3];
    
    searchOptions = [[AlfrescoKeywordSearchOptions alloc]initWithExactMatch:exactMatch includeContent:includeContent folder:folder includeDescendants:includeDescendants];
}

@end
