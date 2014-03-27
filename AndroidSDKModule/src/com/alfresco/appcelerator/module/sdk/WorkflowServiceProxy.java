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

import java.io.File;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.alfresco.mobile.android.api.model.ContentStream;
import org.alfresco.mobile.android.api.model.Document;
import org.alfresco.mobile.android.api.model.PagingResult;
import org.alfresco.mobile.android.api.model.Person;
import org.alfresco.mobile.android.api.model.Process;
import org.alfresco.mobile.android.api.model.ProcessDefinition;
import org.alfresco.mobile.android.api.model.Task;
import org.alfresco.mobile.android.api.model.impl.ContentFileImpl;
import org.alfresco.mobile.android.api.services.WorkflowService;
import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;


@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class)
public class WorkflowServiceProxy extends KrollProxy
{
	private WorkflowService service;
	
	public WorkflowServiceProxy() 
    {
		super();
	}
    
	
	/** Initialise the service
	 @param RepositorySession session
	 @since v1.0
	 */
	@Kroll.method
	void initialiseWithSession (Object[] arg)
	{
		SessionProxy seshProxy = (SessionProxy) arg[0];
    	
        service = seshProxy.session.getServiceRegistry().getWorkflowService();
	}


	/**
	 Retrieves a list of all processes. 
	 */
	@Kroll.method
	void retrieveAllProcesses (Object[] noargs)
	{
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<Process> processes;
    			
    			try
    			{
    				processes = service.getProcesses();
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.getProcesses()", WorkflowServiceProxy.this);
                    return;
    			}
    			
    	        for (Process process : processes)
    	        {
    	        	ProcessProxy processProxy = new ProcessProxy (process);
					HashMap<String, Object> map = new HashMap<String, Object>();
			        map.put("process", processProxy);
			        fireEvent("processnode", new KrollDict(map));
    	        }
    	        SDKUtil.createEnumerationEndEvent (WorkflowServiceProxy.this, "retrieveAllProcesses", null);
    	    
    	        super.run();
    		}
    	}.start();
	}
	
	
	/**
	 Retrieves a list of all process Definitions. 
	 */
	@Kroll.method
	void retrieveAllProcessDefinitions (Object[] noargs)
	{
		new Thread()
	   	{
	   		@Override
	   		public void run() 
	   		{
	   			List<ProcessDefinition> processes;
	   			
	   			try
	   			{
	   				processes = service.getProcessDefinitions();
	   			}
	   			catch (Exception e)
	   			{
	   				SDKUtil.createErrorEvent (e, "WorkflowService.getProcessDefinitions()", WorkflowServiceProxy.this);
   					return;
	   			}
	   			
	   	        for (ProcessDefinition process : processes)
	   	        {
	   	        	ProcessDefinitionProxy processProxy = new ProcessDefinitionProxy (process);
					HashMap<String, Object> map = new HashMap<String, Object>();
			        map.put("processdefinition", processProxy);
			        fireEvent("processdefinitionnode", new KrollDict(map));
	   	        }
	   	        SDKUtil.createEnumerationEndEvent (WorkflowServiceProxy.this, "retrieveAllProcessDefinitions", null);
	   	    
	   	        super.run();
	   		}
	   	}.start();
	}	
	
	
	/**
	 Retrieves a paged result of processes in accordance to a listing context. 
	 @param listingContext The listing context with a paging definition that's used to retrieve the processes
	 */
	@Kroll.method
	void retrieveProcessesWithListingContext(Object[] arg)
	{
		final ListingContextProxy proxy = (ListingContextProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			PagingResult<Process> processes;
    			
    			try
    			{
    				processes = service.getProcesses(proxy.listingContext);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.getProcesses()", WorkflowServiceProxy.this);
                    return;
    			}
    			
    	        for (Process process : processes.getList())
    	        {
    	        	ProcessProxy processProxy = new ProcessProxy (process);
					HashMap<String, Object> map = new HashMap<String, Object>();
			        map.put("process", processProxy);
			        fireEvent("processnode", new KrollDict(map));
			    }
    	        SDKUtil.createEnumerationEndEvent (WorkflowServiceProxy.this, "retrieveAllProcesses", null);
    	        SDKUtil.createEventWithPagingResult(processes, WorkflowServiceProxy.this);
    	        
    	        super.run();
    		}
    	}.start();
	}

	
	/**
	 Retrieves a paged result of process definitions in accordance to a listing context. 
	 @param listingContext The listing context with a paging definition that's used to retrieve the processes
	 */
	@Kroll.method
	void retrieveProcessDefinitionsWithListingContext(Object[] arg)
	{
		final ListingContextProxy proxy = (ListingContextProxy)arg[0];
		
		new Thread()
	   	{
	   		@Override
	   		public void run() 
	   		{
	   			PagingResult<ProcessDefinition> processes;
	   			
	   			try
	   			{
	   				processes = service.getProcessDefinitions(proxy.listingContext);
	   			}
	   			catch (Exception e)
	   			{
	   				SDKUtil.createErrorEvent (e, "WorkflowService.getProcessDefinitions()", WorkflowServiceProxy.this);
	                   return;
	   			}
	   			
	   	        for (ProcessDefinition process : processes.getList())
	   	        {
	   	        	ProcessDefinitionProxy processProxy = new ProcessDefinitionProxy (process);
					HashMap<String, Object> map = new HashMap<String, Object>();
			        map.put("processdefinition", processProxy);
			        fireEvent("processdefinitionnode", new KrollDict(map));
				}
	   	        SDKUtil.createEnumerationEndEvent (WorkflowServiceProxy.this, "retrieveProcessDefinitionsWithListingContext", null);
	   	        SDKUtil.createEventWithPagingResult (processes, WorkflowServiceProxy.this);
	   	         
	   	        super.run();
	   		}
	   	}.start();
	}
	
	
	/**
	 Retrieves a process for a given process identifier.
	 @param processID The process identifier of the process to retrieve
	 @param completionBlock The block that's called with the operation completes
	 */
	@Kroll.method
	void retrieveProcessWithIdentifier(Object[] arg)
	{
		final String processID = (String)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			Process process;
    			
    			try
    			{
    				process = service.getProcess(processID);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.getProcess()", WorkflowServiceProxy.this);
                    return;
    			}
    			
	        	ProcessProxy processProxy = new ProcessProxy (process);
				HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("process", processProxy);
		        fireEvent("processnode", new KrollDict(map));
    	    
    	        super.run();
    		}
    	}.start();
	}
	

	/**
	 Retrieves an array of all tasks that the user is able to see. Tasks are returned if created by the user, or if the user is involved in the task.
	 @param process The process for which task(s) should be retrieved
	 */
	@Kroll.method
	void retrieveAllTasksForProcess(Object[] arg)
	{
		final ProcessProxy processProxy = (ProcessProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<Task> tasks;
    			
    			try
    			{
    				tasks = service.getTasks(processProxy.process);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.getTasks()", WorkflowServiceProxy.this);
                    return;
    			}
    			
    			for (Task task : tasks)
    	        {
    				TaskProxy taskProxy = new TaskProxy (task);
					HashMap<String, Object> map = new HashMap<String, Object>();
			        map.put("task", taskProxy);
			        fireEvent("tasksnode", new KrollDict(map));
			    }
    	        SDKUtil.createEnumerationEndEvent (WorkflowServiceProxy.this, "retrieveAllTasksForProcess", processProxy);
    	        	    
    	        super.run();
    		}
    	}.start();
	}

	
	/**
	 Retrieves an image of the given process. An image is only returned if the user has started the process or is involved in any of the tasks. 
	 @param process The process for which an image should be retrieved
	 */
	@Kroll.method
	void retrieveProcessImage(Object[] arg)
	{
		final ProcessProxy processProxy = (ProcessProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			ContentStream image;
    			
    			try
    			{
    				image = service.getProcessDiagram(processProxy.process);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.getTasks()", WorkflowServiceProxy.this);
                    return;
    			}
    			
    			if (image != null)
				{
    				ContentFileImpl file = new ContentFileImpl (new File(image.getFileName()));
					ContentFileProxy cfProxy = new ContentFileProxy(file);
					HashMap<String, Object> map = new HashMap<String, Object>();
			        map.put("contentfile", cfProxy);
			        map.put("process", processProxy);
			        fireEvent("retrievedimage", new KrollDict(map));
				}
    	        	    
    	        super.run();
    		}
    	}.start();
	}

	
	/**
	 Creates and returns a process for a given process definition.	 
	 @param processDefinition The process definition the process should be modeled on
	 @param assignees (optional, can be null) An array of AlfrescoPerson's to assign to the task. If this is left blank, the process will be assigned to the creator
	 @param variables (optional, can be null) An object of process properties to add at the start of the process. Variable keys must be the same as those defined in the workflow model definition in the repository
	 @param attachments (optional, can be null) An array of Document objects to add to the process
	 */
	@SuppressWarnings("unchecked")
	@Kroll.method
	void startProcessForProcessDefinition(Object[] args)
	{
		final ProcessDefinitionProxy processDefinitionProxy = (ProcessDefinitionProxy)args[0];
		final PersonProxy[] peopleProxy = (PersonProxy[])args[1];
		final HashMap<String,Serializable> variables = (HashMap<String,Serializable>)args[2];
		final DocumentProxy[] nodesProxy = (DocumentProxy[])args[3]; 
		
		//Map proxied object arrays back to internal object arrays.
		final List<Person> people = new ArrayList<Person>();
		final List<Document> nodes = new ArrayList<Document>();
		
		if (peopleProxy != null)
			for (int i = 0; i < peopleProxy.length; i++)
				people.add(peopleProxy[i].person);
			
		if (nodesProxy != null)
			for (int i = 0; i < nodesProxy.length; i++)
				nodes.add((Document)nodesProxy[i].node);
				
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			Process process;
    			
    			try
    			{
    				process = service.startProcess(processDefinitionProxy.process, people, variables, nodes);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.startProcess()", WorkflowServiceProxy.this);
                    return;
    			}
    			
				ProcessProxy processProxy = new ProcessProxy(process);
				HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("process", processProxy);
		        fireEvent("processnode", new KrollDict(map));
			    	    
    	        super.run();
    		}
    	}.start();
	}
	

	/**
	 Deletes a process.	 
	 @param process The process to delete
	 */
	@Kroll.method
	void deleteProcess(Object[] arg)
	{
		final ProcessProxy processProxy = (ProcessProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			try
    			{
    				service.deleteProcess(processProxy.process);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.deleteProcess()", WorkflowServiceProxy.this);
                    return;
    			}
    			
				HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("process", processProxy);
		        fireEvent("deletedProcess", new KrollDict(map));
    	        	    
    	        super.run();
    		}
    	}.start();
	}
	
	/**
	 Retrieves a process definition for a specific process identifier.
	 @param processDefinitionId The process definition identifier for the process definition to be retrieved
	 */
	@Kroll.method
	void retrieveProcessDefinitionWithIdentifier(Object[] arg)
	{
		final String id = (String)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			ProcessDefinition processDefinition;
    			try
    			{
    				processDefinition = service.getProcessDefinition(id);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.getProcessDefinition()", WorkflowServiceProxy.this);
                    return;
    			}
    			
				HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("processdefinition", new ProcessDefinitionProxy(processDefinition));
		        fireEvent("processdefinitionnode", new KrollDict(map));
    	        	    
    	        super.run();
    		}
    	}.start();
	}
	
	
	/**
	 Retrieves a list of all tasks.
	 */
	@Kroll.method
	void retrieveAllTasks(Object[] noargs)
	{
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<Task> tasks;
    			try
    			{
    				tasks = service.getTasks();
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.getTasks()", WorkflowServiceProxy.this);
                    return;
    			}
    			
    			for (Task task : tasks)
    			{
					HashMap<String, Object> map = new HashMap<String, Object>();
			        map.put("task", new TaskProxy(task));
			        fireEvent("tasknode", new KrollDict(map));
    			}
    			SDKUtil.createEnumerationEndEvent (WorkflowServiceProxy.this, "retrieveAllTasks", null);
    			
    	        super.run();
    		}
    	}.start();
	}
	

	/**
	 Retrieves a paged result of the tasks the authenticated user is allowed to see.
	 @param listingContext The listing context with a paging definition that's used to retrieve the tasks
	 */
	@Kroll.method
	void retrieveTasksWithListingContext(Object[] arg)
	{
		final ListingContextProxy proxy = (ListingContextProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			PagingResult<Task> tasks;
    			try
    			{
    				tasks = service.getTasks (proxy.listingContext);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.getTasks()", WorkflowServiceProxy.this);
                    return;
    			}
    			
    			for (Task task : tasks.getList())
    			{
					HashMap<String, Object> map = new HashMap<String, Object>();
			        map.put("task", new TaskProxy(task));
			        fireEvent("tasknode", new KrollDict(map));
    			}
    			SDKUtil.createEnumerationEndEvent (WorkflowServiceProxy.this, "retrieveTasksWithListingContext", null);
	   	        SDKUtil.createEventWithPagingResult(tasks, WorkflowServiceProxy.this);
	   	        
    	        super.run();
    		}
    	}.start();
	}
	
	
	/**
	 Retrieves the task for a specific task identifier.
	 @param taskIdentifier The task identifier for the task to retrieve
	 */
	@Kroll.method
	void retrieveTaskWithIdentifier(Object[] arg)
	{
		final String id = (String)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			Task task;
    			try
    			{
    				task = service.getTask(id);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.getTask()", WorkflowServiceProxy.this);
                    return;
    			}
    			
				HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("task", new TaskProxy(task));
		        fireEvent("tasknode", new KrollDict(map));
    	        	    
    	        super.run();
    		}
    	}.start();
	}
	

	/**
	 Retrieves an array of AlfrescoNode's for a specific task. If there are no attachments, nil is returned in the completion block.
	 @param task The task for which attachements should be retrieved
	 */
	@Kroll.method
	void retrieveAttachmentsForTask(Object[] arg)
	{
		final TaskProxy proxy = (TaskProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			List<Document> docs;
    			try
    			{
    				docs = service.getDocuments (proxy.task);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.getDocuments()", WorkflowServiceProxy.this);
                    return;
    			}
    			
    			for (Document doc : docs)
    			{
					SDKUtil.createEventWithNode(doc, WorkflowServiceProxy.this, null);
    			}
    			SDKUtil.createEnumerationEndEvent (WorkflowServiceProxy.this, "retrieveAttachmentsForTask", proxy);
	   	        
    	        super.run();
    		}
    	}.start();
	}
	
	
	/**
	 Completes a given task.
	 @param task The task that should be marked as complete
	 @param properties Any properties to add to the task
	 */
	@SuppressWarnings("unchecked")
	@Kroll.method
	void completeTask(Object[] args)
	{
		final TaskProxy proxy = (TaskProxy)args[0];
		final HashMap<String,Serializable> properties = (HashMap<String,Serializable>)args[1];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			Task task;
    			try
    			{
    				task = service.completeTask (proxy.task, properties);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.completeTask()", WorkflowServiceProxy.this);
                    return;
    			}
    			
    			HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("task", task);
		        fireEvent("completedtask", new KrollDict(map));
	   	        
    	        super.run();
    		}
    	}.start();
	}
	

	/**
	 Claims the task for the authenticated user.
	 @param task The task to be claimed by the authenticated user
	 */
	@Kroll.method
	void claimTask(Object[] arg)
	{
		final TaskProxy proxy = (TaskProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			Task task;
    			try
    			{
    				task = service.claimTask (proxy.task);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.claimTask()", WorkflowServiceProxy.this);
                    return;
    			}
    			
    			HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("task", task);
		        fireEvent("claimedtask", new KrollDict(map));
	   	        
    	        super.run();
    		}
    	}.start();
	}
	

	/**
	 Unclaims a task and sets the assignee to "Unassigned".
	 @param task The task the be unclaimed by the authenticated user
	 @param properties Any properties to add to the task before completion
	 */
	@Kroll.method
	void unclaimTask(Object[] args)
	{
		final TaskProxy proxy = (TaskProxy)args[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			Task task;
    			try
    			{
    				task = service.unClaimTask (proxy.task);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.unClaimTask()", WorkflowServiceProxy.this);
                    return;
    			}
    			
    			HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("task", task);
		        fireEvent("unclaimedtask", new KrollDict(map));
	   	        
    	        super.run();
    		}
    	}.start();
	}
	

	/**
	 Assigns the given task to an assignee.
	 @param task The task to be assigned
	 @param assignee To whom the task should be assigned
	 */
	@Kroll.method
	void assignTask(Object[] args)
	{
		final TaskProxy taskProxy = (TaskProxy)args[0];
		final PersonProxy personProxy = (PersonProxy)args[1];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			Task task;
    			try
    			{
    				task = service.reassignTask (taskProxy.task, personProxy.person);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.reassignTask()", WorkflowServiceProxy.this);
                    return;
    			}
    			
    			HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("task", task);
		        fireEvent("assignedtask", new KrollDict(map));
	   	        
    	        super.run();
    		}
    	}.start();
	}
	

	/**
	 Resolves the given task and assigns it back to the owner. 
	 @param task The task which should be resolved
	 */
	@Kroll.method
	void resolveTask(Object[] arg)
	{
		final TaskProxy taskProxy = (TaskProxy)arg[0];
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			Task task;
    			try
    			{
    				task = service.completeTask (taskProxy.task, null);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.completeTask()", WorkflowServiceProxy.this);
                    return;
    			}
    			
    			HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("task", task);
		        fireEvent("resolvedtask", new KrollDict(map));
	   	        
    	        super.run();
    		}
    	}.start();
	}
	

	/**
	 Adds a single attachment to a given task.	 
	 @param node The document object that should be added to the task
	 @param task The task which the node should be attached
	 */
	@Kroll.method
	void addAttachment(Object[] args)
	{
		DocumentProxy nodeProxy = (DocumentProxy)args[0];
		final TaskProxy taskProxy = (TaskProxy)args[1];
		final List<Document> docs = new ArrayList<Document>();
		docs.add ((Document) nodeProxy.node);
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			try
    			{
    				service.addDocuments (taskProxy.task, docs);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.addDocuments()", WorkflowServiceProxy.this);
                    return;
    			}
    			
    			HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("task", taskProxy.task);
		        fireEvent("addedAttachments", new KrollDict(map));
	   	        
    	        super.run();
    		}
    	}.start();
	}
	

	/**
	 Adds an array of attachments to a given task.
	 @param nodeArray An array of Document objects that should be added to the task
	 @param task The task to which the nodes should be attached
	 */
	@Kroll.method
	void addAttachments(Object[] args)
	{
		DocumentProxy[] nodeProxy = (DocumentProxy[])args[0];
		final TaskProxy taskProxy = (TaskProxy)args[1];
		final List<Document> docs = new ArrayList<Document>();
		
		//Convert from node proxy form to standard Documents list.
		for (int i = 0;  i < nodeProxy.length;  i++)
			docs.add ((Document) nodeProxy[i].node);
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			try
    			{
    				service.addDocuments (taskProxy.task, docs);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.addDocuments()", WorkflowServiceProxy.this);
                    return;
    			}
    			
    			HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("task", taskProxy.task);
		        fireEvent("addedAttachments", new KrollDict(map));
	   	        
    	        super.run();
    		}
    	}.start();
	}
	

	/**
	 Removes an attachment from a specific task.	 
	 @param node The node that should be removed from the task
	 @param task The task from which the node should be removed
	 */
	@Kroll.method
	void removeAttachment(Object[] args)
	{
		DocumentProxy docProxy = (DocumentProxy)args[0];
		final TaskProxy taskProxy = (TaskProxy)args[1];
		final List<Document> docs = new ArrayList<Document>();
		docs.add ((Document) docProxy.node);
		
		new Thread()
    	{
    		@Override
    		public void run() 
    		{
    			try
    			{
    				service.removeDocuments (taskProxy.task, docs);
    			}
    			catch (Exception e)
    			{
    				SDKUtil.createErrorEvent (e, "WorkflowService.removeDocuments()", WorkflowServiceProxy.this);
                    return;
    			}
    			
    			HashMap<String, Object> map = new HashMap<String, Object>();
		        map.put("task", taskProxy.task);
		        fireEvent("removedattachment", new KrollDict(map));
	   	        
    	        super.run();
    		}
    	}.start();
	}
}
