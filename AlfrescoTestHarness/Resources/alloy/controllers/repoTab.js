function Controller() {
    function createNodeList() {
        mainSection = $.mainSection;
        $.folderList.addEventListener("itemclick", function(e) {
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
    function getFolder(repoSesh) {
        documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
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
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
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
        id: "folderLabel"
    });
    $.__views.repoTab.add($.__views.folderLabel);
    $.__views.folderList = Ti.UI.createListView({
        id: "folderList"
    });
    $.__views.repoTab.add($.__views.folderList);
    $.__views.__alloyId9 = Ti.UI.createTemplate({
        id: "__alloyId9"
    });
    $.__views.folderList.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createItemTemplate({
        name: "template",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.picImage = Ti.UI.createImageView({
        id: "picImage",
        bindId: "pic"
    });
    $.__views.__alloyId10.add($.__views.picImage);
    $.__views.infoLabel = Ti.UI.createLabel({
        id: "infoLabel",
        bindId: "info"
    });
    $.__views.__alloyId10.add($.__views.infoLabel);
    $.__views.esinfoLabel = Ti.UI.createLabel({
        id: "esinfoLabel",
        bindId: "es_info"
    });
    $.__views.__alloyId10.add($.__views.esinfoLabel);
    $.__views.mainSection = Ti.UI.createListSection({
        id: "mainSection"
    });
    $.__views.folderList.add($.__views.mainSection);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var mainSection;
    var documentFolderService;
    var parentFolders = new Array();
    var folderLabel;
    if (null != Alloy.Globals.repositorySession) {
        createNodeList();
        getFolder(repositorySession);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;