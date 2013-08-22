
//---------------------------------------------------------------------------------------------------------------------------------
//This provides convenient defaults while testing.
//---------------------------------------------------------------------------------------------------------------------------------
if (Titanium.Platform.model == 'google_sdk' ||  Titanium.Platform.model == 'Simulator')  
	$.serverEdit.value = "http://localhost:8080/alfresco";		//Running on Simulator/Emulator. Assume local server on the PC/Mac.
else
	$.serverEdit.value = "http://10.244.51.57:8080/alfresco";	//Running on-device. NOTE: Change to your servers IP address!	
																//$.serverEdit.value = "http://192.168.1.91:8080/alfresco";
//---------------------------------------------------------------------------------------------------------------------------------


function loginButtonClick()
{
	var svr = $.serverEdit.value;
	var user = $.usernameEdit.value;
	var pwd = $.passwordEdit.value;
	
	if (svr.length == 0 || user.length == 0)
	{
		alert("Please enter values for all fields");
	}
	else
	{
		//Connect to repo and fire event to 'populate' the list.
		connect(svr, user, pwd);
	}
}


function connect(serverUrl, serverUsername, serverPassword)
{
	var repositorySession = Alloy.Globals.SDKModule.createRepositorySession({serverUrl: serverUrl, serverUsername: serverUsername, serverPassword: serverPassword});
	
	repositorySession.connect();
	
	repositorySession.addEventListener('paramerror',function(e)
	{
	  	Ti.API.info("Param error code: " + e.errorcode);
	  	return 0;
	});
	
	repositorySession.addEventListener('error',function(e)
	{
	  	alert("Cannot connect to server (" + e.errorcode + "): " + e.errorstring);
	  	return 0;
	});
	
	repositorySession.addEventListener('success',function(e)
	{
		Alloy.Globals.repositorySession = repositorySession;
		
	  	Ti.API.info("Connected to server: " + e.servername);
	  	
	  	Ti.App.fireEvent('cleartabs');
	  	
		//Switch to repo tab
		Alloy.Globals.tabGroup.setActiveTab(1);
		
		//$.loginButton.enabled = false;
		
		return 1;
	});    
}

