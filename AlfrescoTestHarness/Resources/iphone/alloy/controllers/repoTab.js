function Controller() {
    function createNodeList() {
        mainSection = $.mainSection;
        $.folderList.addEventListener("itemclick", function(e) {
            var item = mainSection.getItemAt(e.itemIndex);
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
                $.folderLabel.text = " " + folder.getFolderName();
                documentFolderService.setFolder(folder);
                documentFolderService.retrieveChildrenInFolder();
            } else {
                var docobject = item.properties.docobject;
                documentFolderService.saveDocument(docobject);
            }
        });
    }
    function getFolder(repoSesh) {
        documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
        documentFolderService.initWithSession(repoSesh);
        documentFolderService.retrieveRootFolder();
        documentFolderService.addEventListener("retrievedfolder", function() {
            $.folderLabel.text = " " + documentFolderService.getCurrentFolder().getFolderName();
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
                var contentFile = e.contentfile;
                var file = Ti.Filesystem.getFile("file:/" + contentFile.getPath());
                var newFile = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, contentFile.getName());
                newFile.write(file.read());
                file.deleteFile();
                require("es.smartaccess.documentviewer");
                var documentViewerProxy = require("es.smartaccess.documentviewer");
                documentViewer = documentViewerProxy.createDocumentViewer({
                    url: newFile.getNativePath()
                });
                documentViewer.show();
            });
            documentFolderService.addEventListener("progresseddocument", function(e) {
                e.bytes;
                e.total;
            });
            documentFolderService.addEventListener("error", function(e) {
                alert("Operation failed (" + e.errorcode + "): " + e.errorstring);
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "repoTab";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.repoTab = Ti.UI.createWindow({
        backgroundColor: "white",
        separatorColor: "white",
        navBarHidden: true,
        id: "repoTab"
    });
    $.__views.repoTab && $.addTopLevelView($.__views.repoTab);
    $.__views.folderLabel = Ti.UI.createLabel({
        text: "",
        color: "white",
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        backgroundColor: "#336699",
        top: 0,
        left: 0,
        width: Ti.UI.FILL,
        height: "40dp",
        id: "folderLabel"
    });
    $.__views.repoTab.add($.__views.folderLabel);
    var __alloyId10 = {};
    var __alloyId13 = [];
    var __alloyId14 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            bindId: "pic"
        }
    };
    __alloyId13.push(__alloyId14);
    var __alloyId15 = {
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
            top: 0,
            bindId: "info"
        }
    };
    __alloyId13.push(__alloyId15);
    var __alloyId16 = {
        type: "Ti.UI.Label",
        bindId: "es_info",
        properties: {
            color: "gray",
            font: {
                fontFamily: "Arial",
                fontSize: "11dp"
            },
            left: "60dp",
            top: "25dp",
            bindId: "es_info"
        }
    };
    __alloyId13.push(__alloyId16);
    var __alloyId12 = {
        properties: {
            name: "repoTemplate"
        },
        childTemplates: __alloyId13
    };
    __alloyId10["repoTemplate"] = __alloyId12;
    var __alloyId17 = [];
    $.__views.mainSection = Ti.UI.createListSection({
        id: "mainSection"
    });
    __alloyId17.push($.__views.mainSection);
    $.__views.folderList = Ti.UI.createListView({
        top: "40dp",
        left: 0,
        sections: __alloyId17,
        templates: __alloyId10,
        id: "folderList",
        defaultItemTemplate: "repoTemplate"
    });
    $.__views.repoTab.add($.__views.folderList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var mainSection;
    var documentFolderService;
    var parentFolders = new Array();
    Ti.App.addEventListener("populate", function() {
        if (null != Alloy.Globals.repositorySession) {
            parentFolders = new Array();
            $.mainSection.deleteItemsAt(0, $.mainSection.getItems().length);
            createNodeList();
            getFolder(Alloy.Globals.repositorySession);
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;