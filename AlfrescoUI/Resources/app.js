/*
 ******************************************************************************
 * Copyright (C) 2005-2013 Alfresco Software Limited.
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

var SDKModule = require('com.alfresco.appcelerator.module.sdk');

var window;
var mainSection;
var documentFolderService;
var parentFolders = new Array();
var folderLabel;

main();

function main()
{
	window = Ti.UI.createWindow({
		backgroundColor: 'white'
	});
	// Ensure status bar is given enough room on iOS newer than 6
	if (iOSVersionNewerThan(6))
	{
		window.top = 20;
	}

	loginPane();
}

function loginPane()
{
	var data = [];
	
	// This provides convenient defaults while testing.
	var serverDefault = "";
	if (Titanium.Platform.model == 'google_sdk' ||  Titanium.Platform.model == 'Simulator')
	{
		// Running on Simulator/Emulator. Assume local server on the PC/Mac.
		serverDefault = "http://localhost:8080/alfresco";
	}
	
	var logoRow = Ti.UI.createTableViewRow({left: 0, clickName:'banner', editable:false});
	var logoView = Ti.UI.createView({left: '10%', width: '80%', height: Ti.UI.SIZE});
	var logo = Ti.UI.createImageView({left: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, image:"alfresco_logo_large.png"});
	logoView.add(logo);
	logoRow.add(logoView);
	data.push(logoRow);
	
	var serverRow = Ti.UI.createTableViewRow({left: 0, width: Ti.UI.FILL, clickName:'User', editable:false, selectionStyle:'none'});
	var serverView = Ti.UI.createView({left: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE});
	var serverLabel = Ti.UI.createLabel({text: "Server address:", font: { fontFamily:'Arial', fontSize: '18dp', fontWeight:'bold' }, top: 0, left: 0, width: Ti.UI.FILL, height: '40dp'});
	var serverTextField = Ti.UI.createTextField({value: serverDefault, font: { fontFamily:'Arial', fontSize: '18dp', fontWeight:'bold' }, borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED, color: '#336699', top: '40dp', left: 0, width: Ti.UI.FILL, height: '40dp'});	
	serverView.add(serverLabel);
	serverView.add(serverTextField);
	serverRow.add(serverView);
	serverRow.classname = 'serverRow';
	data.push(serverRow);
	
	var usernameRow = Ti.UI.createTableViewRow({left: 0, width: Ti.UI.FILL, clickName:'User', editable:false, selectionStyle:'none'});
	var usernameView = Ti.UI.createView({left: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE});
	var usernameLabel = Ti.UI.createLabel({text: "User name:", font: { fontFamily:'Arial', fontSize: '18dp', fontWeight:'bold' }, top: 0, left: 0, width: Ti.UI.FILL, height: '40dp'});
	var usernameTextField = Ti.UI.createTextField({value: "admin", font: { fontFamily:'Arial', fontSize: '18dp', fontWeight:'bold' }, borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED, color: '#336699', top: '40dp', left: 0, width: Ti.UI.FILL, height: '40dp', autocorrect:false});	
	usernameView.add(usernameLabel);
	usernameView.add(usernameTextField);
	usernameRow.add(usernameView);
	usernameRow.classname = 'userRow';
	data.push(usernameRow);
	
	var passwordRow = Ti.UI.createTableViewRow({left: 0, width: Ti.UI.FILL, clickName:'Password', editable:false, selectionStyle:'none'});
	var passwordView = Ti.UI.createView({left: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE});
	var passwordLabel = Ti.UI.createLabel({text: "Password:", font: { fontFamily:'Arial', fontSize: '18dp', fontWeight:'bold' }, top: 0, left: 0, width: Ti.UI.FILL, height: '40dp'});
	var passwordTextField = Ti.UI.createTextField({value: "admin", font: { fontFamily:'Arial', fontSize: '18dp', fontWeight:'bold' }, passwordMask:true, borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED, color: '#336699', top: '40dp', left: 0, width: Ti.UI.FILL, height: '40dp'});	
	passwordView.add(passwordLabel);
	passwordView.add(passwordTextField);
	passwordRow.add(passwordView);
	passwordRow.classname = 'pwdRow';
	data.push(passwordRow);
	
	var buttonRow = Ti.UI.createTableViewRow({left: 0, clickName:'Buttons', editable:false, selectionStyle:'none'});
	var buttonView = Ti.UI.createView({left: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE});
	var button = Ti.UI.createButton({style: Ti.UI.iPhone.SystemButtonStyle.BORDERED, font: { fontFamily:'Arial', fontSize: '18dp', fontWeight:'bold' }, left: 0, top: 50, width: Ti.UI.SIZE, title: "Log in", clickName:'Login'});
	buttonView.add(button);
	buttonRow.add(buttonView);
	data.push(buttonRow);
	
	button.addEventListener('click', function(e)
	{
		var svr = serverTextField.value;
		var user = usernameTextField.value;
		var pwd = passwordTextField.value;
		
		if (svr.length == 0 || user.length == 0)
		{
			alert("Please enter values for all fields");
		}
		else
		{
			// Connect to repo and fill the Node List with nodes from the root of the repository
			connect(svr, user, pwd);
		}
	});
	
	Ti.UI.backgroundColor = 'white';
	var table = Ti.UI.createTableView({data: data, top: '2%', left: '2%', width: '96%', height: '96%'});
	table.separatorColor = 'white';
	
	window.add(table);
	window.open();
}

function createNodeList()
{
	// Create a custom template that displays an image on the left, 
	// then a title next to it with a subtitle below it.
	var myTemplate = {
	    childTemplates: [
	        {                            // Image justified left
	            type: 'Ti.UI.ImageView', // Use an image view for the image
	            bindId: 'pic',           // Maps to a custom pic property of the item data
	            properties: {            // Sets the image view  properties
	                width: '35dp', height: '35dp', left: 5
	            }
	        },
	        {                            // Title 
	            type: 'Ti.UI.Label',     // Use a label for the title 
	            bindId: 'info',          // Maps to a custom info property of the item data
	            properties: {            // Sets the label properties
	                color: 'black',
	                font: { fontFamily:'Arial', fontSize: '18dp', fontWeight:'bold' },
	                left: '60dp', top: '1dp',
	                height: '20dp',
	                minimumFontSize: 18, // Workaround a label vertical offset bug in iOS 7
	                ellipsize: true
	            }
	        },
	        {                            // Subtitle
	            type: 'Ti.UI.Label',     // Use a label for the subtitle
	            bindId: 'es_info',       // Maps to a custom es_info property of the item data
	            properties: {            // Sets the label properties
	                color: 'gray',
	                font: { fontFamily:'Arial', fontSize: '11dp' },
	                left: '60dp', top: '25dp'
	            }
	        }
	    ]
	};
	
	folderLabel = Ti.UI.createLabel({text: "", color: 'white', font: { fontFamily:'Arial', fontSize: '18dp', fontWeight:'bold' }, backgroundColor: '#336699', top: 0, left: 0, width: Ti.UI.FILL, height: '40dp' });
	var leftpane = Ti.UI.createListView( {top: '40dp', left: 0, templates: { 'template': myTemplate }, defaultItemTemplate: 'template'} );
	
	mainSection = Ti.UI.createListSection({ headerTitle: ''});
	
	var sections = [];
	sections.push(mainSection);
	leftpane.sections = sections;
	
	window.add(folderLabel);
	window.add(leftpane);
	
	leftpane.addEventListener('itemclick', function(e)
	{
		var item = e.section.getItemAt(e.itemIndex);
		var name = item.properties.name;
		
		if (item.properties.folder > 0)
		{
			var folder;
			if (item.properties.folder == 2)
			{
				// 'Up' folder item press.
				folder = parentFolders.pop();
			}
			else
			{
				parentFolders.push(documentFolderService.getCurrentFolder());
				folder = item.properties.folderobject;
			}
			
			Ti.API.info("Folder name from object: " + folder.getName());
			
			// Empty list, and add 'Back' item if we're not at root folder.
			mainSection.deleteItemsAt(0,mainSection.getItems().length);
			if (parentFolders.length > 0)
			{
				var mainDataSet = [];
				var data = {info: {text: "Back"}, es_info: {text: "Previous folder"}, pic: {image: 'wm_back.png'},  properties: {folder: 2, name: null, folderobject: null} };		
				mainDataSet.push(data);
				mainSection.appendItems(mainDataSet);
			}
			
			folderLabel.text = " " + folder.getName();
			documentFolderService.setFolder(folder);
			// Events will be fired for 'foldernode's and 'documentnode's.
			documentFolderService.retrieveChildrenInFolder();
		}
		else
		{
			var docobject = item.properties.docobject;
			// Event will be fired when 'retrieveddocument'
			documentFolderService.saveDocument (docobject);	    	
		}
	});
}


function connect(serverUrl, serverUsername, serverPassword)
{
	var repositorySession = SDKModule.createRepositorySession({serverUrl: serverUrl, serverUsername: serverUsername, serverPassword: serverPassword});
	
	repositorySession.addEventListener('paramerror', function(e)
	{
		Ti.API.info("Param error code: " + e.errorcode);
		return 0;
	});
	
	repositorySession.addEventListener('error', function(e)
	{
		alert("Cannot connect to server (" + e.errorcode + "): " + e.errorstring);
		return 0;
	});
	
	repositorySession.addEventListener('success', function(e)
	{
		Ti.API.info("Connected to server: " + e.servername);
		
		//Remove the login pane
		window.remove(window.children[0]);
		
		// Create a ListView ready for nodes.
		createNodeList();
		
		getFolder(repositorySession);
		
		return 1;
	});

	repositorySession.connect();
}


function getFolder(repoSession)
{
	documentFolderService = SDKModule.createDocumentFolderService();
	documentFolderService.initialiseWithSession(repoSession);

	documentFolderService.addEventListener('retrievedfolder',function(e)
	{
		folderLabel.text = " " + documentFolderService.getCurrentFolder().getName();
		
		documentFolderService.retrieveChildrenInFolder();
	
		documentFolderService.addEventListener('documentnode',function(e)
		{
			var doc = e.document;
			
			Ti.API.info("DOCUMENT: name = " + doc.name + ", title = " + doc.title + ", summary = " + doc.summary + ", MIME type = " + doc.contentMimeType);
			
			var icon = "mime_txt.png";
			if (doc.contentMimeType.indexOf("text/") !== -1)
			{
				icon = "mime_txt.png";
			}
			else if (doc.contentMimeType.indexOf("application/") !== -1)
			{
				if (doc.contentMimeType.indexOf("/msword") !== -1  ||
					doc.contentMimeType.indexOf("/vnd.openxmlformats-officedocument.wordprocessingml") !== -1)
				{
					icon = "mime_doc.png";
				}
				else if (doc.contentMimeType.indexOf("/vnd.ms-excel") !== -1  ||
					doc.contentMimeType.indexOf("/vnd.openxmlformats-officedocument.spreadsheetml.sheet") !== -1)
				{
					icon = "mime_xls.png";
				}
				else if (doc.contentMimeType.indexOf("/vnd.ms-powerpoint") !== -1  ||
					doc.contentMimeType.indexOf("/vnd.openxmlformats-officedocument.presentationml.presentation") !== -1)
				{
					icon = "mime_ppt.png";
				}
				else if (doc.contentMimeType.indexOf("/pdf") !== -1)
				{
					icon = "mime_pdf.png";
				}
			}
			else if (doc.contentMimeType.indexOf("image/") !== -1)
			{
				icon="mime_img.png";
			}
			else if (doc.contentMimeType.indexOf("video/") !== -1)
			{
				icon="mime_video.png";
			}
			else
			{
				icon="mime_generic.png";
			}
			
			var modified = new String + doc.modifiedAt;
			modified = modified.substr(0,21);
			
			var mainDataSet = [];
			var data = {info: {text: doc.name}, es_info: {text: modified}, pic: {image: icon},  properties: {folder: 0, name: doc.name, docobject: doc} };
			mainDataSet.push(data);
			mainSection.appendItems(mainDataSet);
		});
		
		documentFolderService.addEventListener('foldernode',function(e)
		{
			var folder = e.folder;
			var folderName = folder.getName();
			
			Ti.API.info("FOLDER: name = " + folder.name + ", title = " + folder.title + ", summary = " + folder.summary + ". Folder name from object: "+ folderName);
			
			var modified = new String + folder.modifiedAt;
			modified = modified.substr(0,21);
			
			var mainDataSet = [];
			var data = {info: {text: folder.name}, es_info: {text: modified}, pic: {image: 'folder.png'},  properties: {folder: 1, name: folder.name, folderobject: folder} };
			
			mainDataSet.push(data);
			mainSection.appendItems(mainDataSet);
	  	});
		
		documentFolderService.addEventListener('retrieveddocument',function(e)
		{
			var contentFile = e.contentfile;
			
			if (Ti.Platform.name == 'iPhone OS')
			{
				Ti.UI.iOS.createDocumentViewer({url:contentFile.getPath()}).show();
			}
			else if (Ti.Platform.name == 'android')
			{
				Ti.Android.currentActivity.startActivity(Ti.Android.createIntent( { action: Ti.Android.ACTION_VIEW, type: contentFile.getMIMEType(), data: contentFile.getPath() } ));
			}
		});
		
		documentFolderService.addEventListener('progresseddocument',function(e)
		{
			var bytes = e.bytes;
			var total = e.total;
		});
		
		documentFolderService.addEventListener('error',function(e)
		{
			alert("Operation failed (" + e.errorcode + "): " + e.errorstring);
		});
	});
	
	documentFolderService.retrieveRootFolder();
}

// Function to test if device is iOS 7 or later
function iOSVersionNewerThan(minimum)
{
	if (Titanium.Platform.name == 'iPhone OS')
	{
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0], 10);

		if (major > minimum)
		{
			return true;
		}
	}
	return false;
}
