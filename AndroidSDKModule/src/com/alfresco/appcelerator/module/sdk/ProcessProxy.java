package com.alfresco.appcelerator.module.sdk;

import org.alfresco.mobile.android.api.model.Process;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class, 
propertyAccessors = {"identifier", "processDefinitionIdentifier", "processDefinitionKey", "startedAt",
					 "endedAt", "dueAt", "priority", "processDescription", "initiatorUsername"})
public class ProcessProxy extends KrollProxy 
{
	public Process process;
	
	ProcessProxy (Process process)
	{
		this.process = process;
		
		String processGetters[] = {"identifier", "processDefinitionIdentifier", "processDefinitionKey", "startedAt",
				 				   "endedAt", "dueAt", "priority", "processDescription", "initiatorUsername"};  
		String processPropNames[] = {null, "definitionIdentifier", null, null, null, null, null, "description", "initiatorIdentifer"}; //For where they differ from iOS property names.
		
		for (int i = 0;  i < processGetters.length;  i++)
		{
			Object value = SDKUtil.extractProperty (process, processGetters[i]);
			if (value != null)
				setProperty (processPropNames[i] != null ? processPropNames[i] : processGetters[i], value);
		}
	}
}
