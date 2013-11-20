package com.alfresco.appcelerator.module.sdk;

import org.alfresco.mobile.android.api.model.Comment;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.annotations.Kroll;

@Kroll.proxy(creatableInModule = AndroidsdkmoduleModule.class,
propertyAccessors = {"identifier", "name", "title", "createdAt", "modifiedAt", "content", "createdBy", "isEdited", "canEdit", "canDelete"})
public class CommentProxy extends KrollProxy
{
	Comment comment;
	
	CommentProxy()
	{
		super();
	}
	
	CommentProxy (Comment comment)
	{
        this.comment = comment;
            
        String nodeGetters[] = {"identifier", "name", "title", "createdAt", "modifiedAt", "content", "createdBy", "isEdited", "canEdit", "canDelete"};    	
		for (int i = 0;  i < nodeGetters.length;  i++)
		{
			Object value = SDKUtil.extractProperty (comment, nodeGetters[i]);
			if (value != null)
				setProperty(nodeGetters[i], value);
		}
	}
}
