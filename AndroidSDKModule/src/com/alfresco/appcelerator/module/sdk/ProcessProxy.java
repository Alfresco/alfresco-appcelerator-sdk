package com.alfresco.appcelerator.module.sdk;

import org.alfresco.mobile.android.api.model.Process;
import org.appcelerator.kroll.KrollProxy;

public class ProcessProxy extends KrollProxy 
{
	public Process process;
	
	ProcessProxy (Process process)
	{
		this.process = process;
	}
}
