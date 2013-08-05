//
//  ComAlfrescoAppceleratorSdkContentFileProxy.m
//  iOSSDKModule
//
//  Created by Luke Jagger on 17/06/2013.
//
//

#import "ComAlfrescoAppceleratorSdkContentFileProxy.h"
#import "TiUtils.h"


@implementation ComAlfrescoAppceleratorSdkContentFileProxy
@synthesize contentFile;
@synthesize humanReadableName;


- (id)initWithContentFile:(AlfrescoContentFile *)cf
{
    contentFile = cf;
    humanReadableName = cf.fileUrl.lastPathComponent;
    return self;
}


- (id)initWithContentFile:(AlfrescoContentFile *)cf name:(NSString*)name
{
    contentFile = cf;
    humanReadableName = name;
    return self;
}


-(id)getName:(id)args
{
    return humanReadableName;
}


-(id)getMIMEType:(id)args
{
    return contentFile.mimeType;
}


-(id)getPath:(id)args
{
    return contentFile.fileUrl.path;
}


-(id)getFile:(id)args
{
    return [[TiFile alloc] initWithPath:contentFile.fileUrl.path];
}

@end
