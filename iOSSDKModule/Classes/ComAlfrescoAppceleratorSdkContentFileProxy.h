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
//  ComAlfrescoAppceleratorSdkContentFileProxy.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 17/06/2013.
//
//

#import "TiProxy.h"
#import "AlfrescoContentFile.h"

/**
 #Javascript object:#
 <code>ContentFile</code>
 
 #Javascript events:#
 * **'initialisedfile' - ** Sent upon successful file creation from initialiseWithFile and initialiseWithPlainText. ***Properties:*** *none*
 
Describes a physical file object on internal storage.  Most commonly used for temporary files that are removed on app exit.
*/

@interface ComAlfrescoAppceleratorSdkContentFileProxy : TiProxy

@property (nonatomic, strong) AlfrescoContentFile* contentFile;
@property (nonatomic, strong) NSString* humanReadableName;

-(id)initWithContentFile:(AlfrescoContentFile *)cf;

-(id)initWithContentFile:(AlfrescoContentFile *)cf name:(NSString*)name;


/**
 Initialise with the given file
 @since v1.1
 */
-(id)initialiseWithFile:(id)arg;


/**
 Initialise with the given string content
  @since v1.1
 */
-(id)initialiseWithPlainText:(id)arg;



/**
Gets a human readable name for this file
 @return string name
*/
-(id)getName:(id)args;


/**
 Gets the MIME type of this file
 @return string MIME type
 */
-(id)getMIMEType:(id)args;


/**
 Gets the full path of this file, sanitised for Appcelerator calls.
 @return string path
 */
-(id)getPath:(id)args;


/**
 Gets the TiFile object associated with this object.
 NOTE:
  this object is currently different per platform (See Appcelerator documentation for TiFile).
  It is therefore safer to rely on the getPath() method instead of this at present (as of Appcelerator 3.1.3GA)
 
 @return TiFile file
 */
-(id)getFile:(id)args;


@end
