package com.alfresco.appcelerator.module.sdk;

import org.alfresco.mobile.android.api.model.ProcessDefinition;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class,
propertyAccessors = {"identifier", "name", "version"})
public class ProcessDefinitionProxy extends KrollProxy
{
	public ProcessDefinition process;
	
	public ProcessDefinitionProxy(ProcessDefinition process)
	{
		this.process = process;
		
		String processDefGetters[] =   {"identifier", "name", "version"};  
		String processDefPropNames[] = {null, null, null}; //For where they differ from iOS property names.
		
		for (int i = 0;  i < processDefGetters.length;  i++)
		{
			Object value = SDKUtil.extractProperty (process, processDefGetters[i]);
			if (value != null)
				setProperty (processDefPropNames[i] != null ? processDefPropNames[i] : processDefGetters[i], value);
		}
	}

}
