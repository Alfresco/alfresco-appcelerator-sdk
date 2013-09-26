/*
 ******************************************************************************
 * Copyright (C) 2005-2013 Alfresco Software Limited.
 *
 * This file is part of the Alfresco Mobile SDK.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *****************************************************************************
 */

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
    self = [super init];
    
    if (self)
    {
        contentFile = cf;
        humanReadableName = cf.fileUrl.lastPathComponent;
    }
    return self;
}


- (id)initWithContentFile:(AlfrescoContentFile *)cf name:(NSString*)name
{
    self = [super init];
    
    if (self)
    {
        contentFile = cf;
        humanReadableName = name;
    }
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
    NSMutableString* appceleratorPath = [[NSMutableString alloc]initWithString:@"file://localhost"];
    [appceleratorPath appendString:contentFile.fileUrl.path];
    return [appceleratorPath stringByReplacingOccurrencesOfString:@" " withString:@"%20"];
}


-(id)getFile:(id)args
{
    return [[TiFile alloc] initWithPath:[self getPath:NULL]];
}

@end
