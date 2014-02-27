package com.alfresco.appcelerator.module.sdk;

import org.alfresco.mobile.android.api.model.Task;
import org.appcelerator.kroll.KrollProxy;

public class TaskProxy extends KrollProxy 
{
	public Task task;
	
	TaskProxy(Task task)
	{
		this.task = task;
	}
}
