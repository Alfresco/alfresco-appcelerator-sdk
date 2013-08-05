//
//  ComAlfrescoAppceleratorSdkContentFileProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 17/06/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoContentFile.h"


@interface ComAlfrescoAppceleratorSdkContentFileProxy : TiProxy

@property (nonatomic, strong) AlfrescoContentFile* contentFile;
@property (nonatomic, strong) NSString* humanReadableName;

-(id)initWithContentFile:(AlfrescoContentFile *)cf;

-(id)initWithContentFile:(AlfrescoContentFile *)cf name:(NSString*)name;

-(id)getName:(id)args;

-(id)getMIMEType:(id)args;

-(id)getPath:(id)args;

-(id)getFile:(id)args;


@end
