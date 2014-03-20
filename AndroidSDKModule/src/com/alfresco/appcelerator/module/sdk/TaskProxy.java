package com.alfresco.appcelerator.module.sdk;

import org.alfresco.mobile.android.api.model.Task;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class, 
propertyAccessors = {"assigneeIdentifier", "description", "dueAt", "endedAt", "identifier", "key", "name",
					 "priority", "processDefinitionIdentifier", "processIdentifier", "startedAt"})
public class TaskProxy extends KrollProxy 
{
	public Task task;
	
	TaskProxy(Task task)
	{
		this.task = task;
		
		String taskGetters[] =   {"assigneeIdentifier", "taskDescription", "dueAt", "endedAt", "identifier", "key", "name",
								  "priority", "processDefinitionIdentifier", "processIdentifier", "startedAt"};  
		String taskPropNames[] = {null, "description", null, null, null, null, null, null, null, null, null}; //For where they differ from iOS property names.
		    	
		for (int i = 0;  i < taskGetters.length;  i++)
		{
			Object value = SDKUtil.extractProperty (task, taskGetters[i]);
			if (value != null)
				setProperty (taskPropNames[i] != null ? taskPropNames[i] : taskGetters[i], value);
		}
	}
}
