An example is given here to get you started. Additionally, please refer to the Class Reference below for full API documentation.

Please ignore the 'ComAlfresco...' naming convention of each object in the Class Reference, as this is an internal native representation.
The example code shows how these are represented in Javascript, and all Appcelerator API objects are created using the SDK module, as in:

    var SDKModule = require('com.alfresco.appcelerator.module.sdk');
    SDKModule.createExampleAPIObject();

There is also an Appcelerator project, 'AlfrescoUI' containing a basic HelloRepo example, and a more complete test harness, 'AlfrescoTestHarness'.

 
#Javascript example:#
    var SDKModule = require('com.alfresco.appcelerator.module.sdk');
    var properties  = {serverUrl: "http://localhost:8080/alfresco",  serverUsername: "admin",  serverPassword: "pwd"};
    var repoSession = SDKModule.createRepositorySession(properties);
 
    repoSession.connect();

    repoSession.addEventListener('error', function(e) { alert("Cannot connect to server (" + e.errorcode + "): " + e.errorstring); } );
    repoSession.addEventListener('success',function(e)
    {
        Ti.API.info("Connected to server: " + e.servername);
        var documentFolderService = SDKModule.createDocumentFolderService();
        documentFolderService.addEventListener('error', function(e) { alert(e.errorstring); });
        documentFolderService.initialiseWithSession(repoSession);
        documentFolderService.retrieveRootFolder();
        documentFolderService.addEventListener('retrievedfolder', function(e)
        {
            documentFolderService.retrieveChildrenInFolder();
            
            documentFolderService.addEventListener('documentnode', function(e) { var doc = e.document; --your code here-- } );
            documentFolderService.addEventListener('foldernode', function(e) { var folder = e.folder; --your code here-- } );
        });
    });
