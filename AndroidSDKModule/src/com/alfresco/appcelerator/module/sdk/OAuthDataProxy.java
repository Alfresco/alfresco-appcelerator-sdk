/*
 ******************************************************************************
 * Copyright (C) 2005-2014 Alfresco Software Limited.
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
package com.alfresco.appcelerator.module.sdk;

import java.util.HashMap;

import org.alfresco.mobile.android.api.session.authentication.impl.OAuth2DataImpl;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class OAuthDataProxy extends KrollProxy
{
	public OAuth2DataImpl data;
	
	public OAuthDataProxy()
	{
		super();
	}
	
	/**
	 This initialised is typically used for subsequent authentication steps, e.g. obtaining the access token or refresh token.
	 The Alfresco default redirect URI is taken as a value
	 @param apiKey
	 @param secretKey
	 @since v1.2
	 */
	@Kroll.method
	void initialiseWithAPIKey(Object args[])
	{
		String apiKey = (String)args[0];
		String secKey = (String)args[1];
		
		data = new OAuth2DataImpl(apiKey, secKey);
	}


	/**
	 This initialised is typically used for subsequent authentication steps, e.g. obtaining the access token or refresh token.
	 The Alfresco default redirect URI is taken as a value
	 @param apiKey
	 @param secretKey
	 @param jsonDictionary
	 @since v1.2
	 */
	@Kroll.method
	void initialiseWithAPIKeyAndJsonData(Object args[])
	{
		String apiKey = (String)args[0];
		String secKey = (String)args[1];
		HashMap<String,String> jsonDictionary = (HashMap<String,String>)args[2];
		
		data = new OAuth2DataImpl(apiKey, secKey, jsonDictionary.get("access_token"), jsonDictionary.get("refresh_token") );
	}
}
