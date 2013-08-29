//
//  SDKUtil.h
//  iOSSDKModule
//
//  Created by Luke Jagger on 14/08/2013.
//
//

#import <Foundation/Foundation.h>
#import "TiProxy.h"
#import "AlfrescoNode.h"
#import "AlfrescoPagingResult.h"


@interface SDKUtil : NSObject

+(void)createEventWithNode:(AlfrescoNode*)node proxyObject:(TiProxy*)proxyObj;

+(void)createEventWithPagingResult:(AlfrescoPagingResult*)pagingResult  proxyObject:(TiProxy*)proxyObj;

@end
