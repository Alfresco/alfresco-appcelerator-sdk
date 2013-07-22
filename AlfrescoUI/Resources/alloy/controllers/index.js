function Controller() {
    function loginPane() {
        var data = [];
        var serverDefault;
        serverDefault = "google_sdk" == Titanium.Platform.model || "Simulator" == Titanium.Platform.model ? "http://localhost:8080/alfresco" : "http://192.168.1.91:8080/alfresco";
        var logoRow = Ti.UI.createTableViewRow({
            left: 0,
            clickName: "banner",
            editable: false
        });
        var logoView = Ti.UI.createView({
            left: 0,
            width: "80%",
            height: Ti.UI.SIZE
        });
        var logo = Ti.UI.createImageView({
            left: 0,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            image: "alfresco_logo_large.png"
        });
        logoView.add(logo);
        logoRow.add(logoView);
        data.push(logoRow);
        var serverRow = Ti.UI.createTableViewRow({
            left: 0,
            width: Ti.UI.FILL,
            clickName: "User",
            editable: false
        });
        var serverView = Ti.UI.createView({
            left: 0,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });
        var serverLabel = Ti.UI.createLabel({
            text: "Server address:",
            top: 0,
            left: 0,
            width: Ti.UI.FILL,
            height: 40
        });
        var serverTextField = Ti.UI.createTextField({
            value: serverDefault,
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            color: "#336699",
            top: 40,
            left: 0,
            width: Ti.UI.FILL,
            height: 40
        });
        serverView.add(serverLabel);
        serverView.add(serverTextField);
        serverRow.add(serverView);
        serverRow.classname = "serverRow";
        data.push(serverRow);
        var usernameRow = Ti.UI.createTableViewRow({
            left: 0,
            width: Ti.UI.FILL,
            clickName: "User",
            editable: false
        });
        var usernameView = Ti.UI.createView({
            left: 0,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });
        var usernameLabel = Ti.UI.createLabel({
            text: "User name:",
            top: 0,
            left: 0,
            width: Ti.UI.FILL,
            height: 40
        });
        var usernameTextField = Ti.UI.createTextField({
            value: "admin",
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            color: "#336699",
            top: 40,
            left: 0,
            width: Ti.UI.FILL,
            height: 40
        });
        usernameView.add(usernameLabel);
        usernameView.add(usernameTextField);
        usernameRow.add(usernameView);
        usernameRow.classname = "userRow";
        data.push(usernameRow);
        var passwordRow = Ti.UI.createTableViewRow({
            left: 0,
            width: Ti.UI.FILL,
            clickName: "Password",
            editable: false
        });
        var passwordView = Ti.UI.createView({
            left: 0,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });
        var passwordLabel = Ti.UI.createLabel({
            text: "Password:",
            top: 0,
            left: 0,
            width: Ti.UI.FILL,
            height: 40
        });
        var passwordTextField = Ti.UI.createTextField({
            value: "password",
            passwordMask: true,
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            color: "#336699",
            top: 40,
            left: 0,
            width: Ti.UI.FILL,
            height: 40
        });
        passwordView.add(passwordLabel);
        passwordView.add(passwordTextField);
        passwordRow.add(passwordView);
        passwordRow.classname = "pwdRow";
        data.push(passwordRow);
        var buttonRow = Ti.UI.createTableViewRow({
            left: 0,
            clickName: "Buttons",
            editable: false
        });
        var buttonView = Ti.UI.createView({
            left: 0,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });
        var button = Ti.UI.createButton({
            style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
            left: 0,
            top: 50,
            width: Ti.UI.SIZE,
            title: "Log in",
            clickName: "Login"
        });
        buttonView.add(button);
        buttonRow.add(buttonView);
        data.push(buttonRow);
        button.addEventListener("click", function() {
            var svr = serverTextField.value;
            var user = usernameTextField.value;
            var pwd = passwordTextField.value;
            0 == svr.length || 0 == user.length ? alert("Please enter values for all fields") : connect(svr, user, pwd);
        });
        Ti.UI.backgroundColor = "white";
        var table = Ti.UI.createTableView({
            data: data,
            top: "2%",
            left: "2%",
            width: "96%",
            height: "96%"
        });
        table.separatorColor = "white";
        $.index.add(table);
    }
    function createNodeList() {
        var myTemplate = {
            childTemplates: [ {
                type: "Ti.UI.ImageView",
                bindId: "pic",
                properties: {
                    width: "35dp",
                    height: "35dp",
                    left: 5
                }
            }, {
                type: "Ti.UI.Label",
                bindId: "info",
                properties: {
                    color: "black",
                    font: {
                        fontFamily: "Arial",
                        fontSize: "18dp",
                        fontWeight: "bold"
                    },
                    left: "60dp",
                    top: 0
                }
            }, {
                type: "Ti.UI.Label",
                bindId: "es_info",
                properties: {
                    color: "gray",
                    font: {
                        fontFamily: "Arial",
                        fontSize: "11dp"
                    },
                    left: "60dp",
                    top: "25dp"
                }
            } ]
        };
        var leftpane = Ti.UI.createListView({
            top: 33,
            left: 0,
            templates: {
                template: myTemplate
            },
            defaultItemTemplate: "template"
        });
        folderLabel = Ti.UI.createLabel({
            text: "",
            color: "white",
            backgroundColor: "#336699",
            top: 0,
            left: 0,
            width: Ti.UI.FILL,
            height: 30
        });
        mainSection = Ti.UI.createListSection({
            headerTitle: ""
        });
        var sections = [];
        sections.push(mainSection);
        leftpane.sections = sections;
        $.index.add(folderLabel);
        $.index.add(leftpane);
        leftpane.addEventListener("itemclick", function(e) {
            var item = e.section.getItemAt(e.itemIndex);
            item.properties.name;
            if (item.properties.folder > 0) {
                var folder;
                if (2 == item.properties.folder) folder = parentFolders.pop(); else {
                    parentFolders.push(documentFolderService.getCurrentFolder());
                    folder = item.properties.folderobject;
                }
                Ti.API.info("Folder name from object: " + folder.getFolderName());
                mainSection.deleteItemsAt(0, mainSection.getItems().length);
                if (parentFolders.length > 0) {
                    var mainDataSet = [];
                    var data = {
                        info: {
                            text: "Back"
                        },
                        es_info: {
                            text: "Previous folder"
                        },
                        pic: {
                            image: "wm_back.png"
                        },
                        properties: {
                            folder: 2,
                            name: null,
                            folderobject: null
                        }
                    };
                    mainDataSet.push(data);
                    mainSection.appendItems(mainDataSet);
                }
                folderLabel.text = " " + folder.getFolderName();
                documentFolderService.setFolder(folder);
                documentFolderService.retrieveChildrenInFolder();
            } else {
                var docobject = item.properties.docobject;
                documentFolderService.saveDocument(docobject);
            }
        });
    }
    function connect(serverUrl, serverUsername, serverPassword) {
        var repositorySession = SDKModule.createRepositorySession({
            serverUrl: serverUrl,
            serverUsername: serverUsername,
            serverPassword: serverPassword
        });
        repositorySession.connect();
        repositorySession.addEventListener("paramerror", function(e) {
            Ti.API.info("Param error code: " + e.errorcode);
            return 0;
        });
        repositorySession.addEventListener("error", function(e) {
            alert("Cannot connect to server (" + e.errorcode + "): " + e.errorstring);
            return 0;
        });
        repositorySession.addEventListener("success", function(e) {
            Ti.API.info("Connected to server: " + e.servername);
            $.index.remove($.index.children[0]);
            createNodeList();
            getFolder(repositorySession);
            return 1;
        });
    }
    function getFolder(repoSesh) {
        documentFolderService = SDKModule.createDocumentFolderService();
        documentFolderService.initWithSession(repoSesh);
        documentFolderService.retrieveRootFolder();
        documentFolderService.addEventListener("retrievedfolder", function() {
            folderLabel.text = " " + documentFolderService.getCurrentFolder().getFolderName();
            documentFolderService.retrieveChildrenInFolder();
            documentFolderService.addEventListener("documentnode", function(e) {
                Ti.API.info("DOCUMENT: name = " + e.name + ", title = " + e.title + ", summary = " + e.summary + ", MIME type = " + e.contentMimeType);
                var icon = "mime_txt.png";
                -1 !== e.contentMimeType.indexOf("text/") ? icon = -1 !== e.contentMimeType.indexOf("/plain") ? "mime_txt.png" : "mime_doc.png" : -1 !== e.contentMimeType.indexOf("application/") ? -1 !== e.contentMimeType.indexOf("/msword") || -1 !== e.contentMimeType.indexOf("/vnd.openxmlformats-officedocument.wordprocessingml") ? icon = "mime_doc.png" : -1 !== e.contentMimeType.indexOf("/vnd.openxmlformats-officedocument.spreadsheetml") : -1 !== e.contentMimeType.indexOf("image/") && (icon = "mime_img.png");
                var modified = new String() + e.modifiedAt;
                modified = modified.substr(0, 21);
                var mainDataSet = [];
                var data = {
                    info: {
                        text: e.name
                    },
                    es_info: {
                        text: modified
                    },
                    pic: {
                        image: icon
                    },
                    properties: {
                        folder: 0,
                        name: e.name,
                        docobject: e.document
                    }
                };
                mainDataSet.push(data);
                mainSection.appendItems(mainDataSet);
            });
            documentFolderService.addEventListener("foldernode", function(e) {
                var folder = e.folder;
                var folderName = folder.getFolderName();
                Ti.API.info("FOLDER: name = " + e.name + ", title = " + e.title + ", summary = " + e.summary + ". Folder name from object: " + folderName);
                var modified = new String() + e.modifiedAt;
                modified = modified.substr(0, 21);
                var mainDataSet = [];
                var data = {
                    info: {
                        text: e.name
                    },
                    es_info: {
                        text: modified
                    },
                    pic: {
                        image: "folder@2x.png"
                    },
                    properties: {
                        folder: 1,
                        name: e.name,
                        folderobject: e.folder
                    }
                };
                mainDataSet.push(data);
                mainSection.appendItems(mainDataSet);
            });
            documentFolderService.addEventListener("retrieveddocument", function(e) {
                var file = Ti.Filesystem.getFile(e.filename);
                var path = file.getNativePath();
                Ti.Platform.canOpenURL(path) ? Ti.Platform.openURL(path) : alert("No app installed to open this kind of document");
            });
            documentFolderService.addEventListener("progresseddocument", function(e) {
                e.bytes;
                e.total;
            });
            documentFolderService.addEventListener("error", function(e) {
                alert("Error getting folders (" + e.errorcode + "): " + e.errorstring);
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    var SDKModule = require("com.alfresco.appcelerator.module.sdk");
    var mainSection;
    var documentFolderService;
    var parentFolders = new Array();
    var folderLabel;
    loginPane();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;