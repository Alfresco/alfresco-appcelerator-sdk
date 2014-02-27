package com.alfresco.appcelerator.module.sdk;

import org.alfresco.mobile.android.api.model.ProcessDefinition;
import org.appcelerator.kroll.KrollProxy;

public class ProcessDefinitionProxy extends KrollProxy
{
	public ProcessDefinition process;
	
	public ProcessDefinitionProxy(ProcessDefinition process)
	{
		this.process = process;
	}

}
