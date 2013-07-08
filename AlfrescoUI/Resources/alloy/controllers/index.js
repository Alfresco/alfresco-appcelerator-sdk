function Controller() {
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
            templates: {
                template: myTemplate
            },
            defaultItemTemplate: "template"
        });
        mainSection = Ti.UI.createListSection({
            headerTitle: "Repository"
        });
        var sections = [];
        sections.push(mainSection);
        leftpane.sections = sections;
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
                documentFolderService.setFolder(folder);
                documentFolderService.retrieveChildrenInFolder();
            } else {
                var docobject = item.properties.docobject;
                documentFolderService.saveDocument(docobject);
            }
        });
    }
    function connect() {
        var repositorySession = SDKModule.createRepositorySession({
            serverUrl: "http://localhost:8080/alfresco",
            serverUsername: "admin",
            serverPassword: "password"
        });
        repositorySession.connect();
        repositorySession.addEventListener("paramerror", function(e) {
            Ti.API.info("Param error code: " + e.errorcode);
        });
        repositorySession.addEventListener("error", function(e) {
            alert("Cannot connect to server, error code: " + e.errorcode);
        });
        repositorySession.addEventListener("success", function(e) {
            Ti.API.info("Connected to server: " + e.servername);
            getFolder(repositorySession);
        });
    }
    function getFolder(repoSesh) {
        documentFolderService = SDKModule.createDocumentFolderService();
        documentFolderService.initWithSession(repoSesh);
        documentFolderService.retrieveRootFolder();
        documentFolderService.addEventListener("retrievedfolder", function() {
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
                var file = e.document;
                var readContents;
                var readFile = Titanium.Filesystem.getFile(file.path);
                if (readFile.exists()) {
                    readContents = readFile.read();
                    Ti.API.info("File Exists");
                }
                var doc = readContents.text;
                alert(doc);
            });
            documentFolderService.addEventListener("progresseddocument", function(e) {
                e.bytes;
                e.total;
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
    createNodeList();
    connect();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;