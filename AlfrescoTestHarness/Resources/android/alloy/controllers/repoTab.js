function Controller() {
    function addClickListener() {
        $.folderList.addEventListener("itemclick", function(e) {
            var item = e.section.getItemAt(e.itemIndex);
            item.properties.name;
            if (item.properties.folder > 0) {
                var folder;
                if (2 == item.properties.folder) folder = parentFolders.pop(); else {
                    parentFolders.push(documentFolderService.getCurrentFolder());
                    folder = item.properties.folderobject;
                }
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
            Alloy.Globals.createServiceListeners(documentFolderService, mainSection);
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
    var __alloyId11 = {};
    var __alloyId14 = [];
    var __alloyId15 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            bindId: "pic"
        }
    };
    __alloyId14.push(__alloyId15);
    var __alloyId16 = {
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
    __alloyId14.push(__alloyId16);
    var __alloyId17 = {
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
    __alloyId14.push(__alloyId17);
    var __alloyId13 = {
        properties: {
            name: "repoTemplate"
        },
        childTemplates: __alloyId14
    };
    __alloyId11["repoTemplate"] = __alloyId13;
    var __alloyId18 = [];
    $.__views.mainSection = Ti.UI.createListSection({
        id: "mainSection"
    });
    __alloyId18.push($.__views.mainSection);
    $.__views.folderList = Ti.UI.createListView({
        top: "40dp",
        left: 0,
        sections: __alloyId18,
        templates: __alloyId11,
        id: "folderList",
        defaultItemTemplate: "repoTemplate"
    });
    $.__views.repoTab.add($.__views.folderList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var mainSection = $.mainSection;
    var documentFolderService;
    var parentFolders = new Array();
    Ti.App.addEventListener("populate", function() {
        if (null != Alloy.Globals.repositorySession) {
            parentFolders = new Array();
            mainSection.deleteItemsAt(0, mainSection.getItems().length);
            addClickListener();
            getFolder(Alloy.Globals.repositorySession);
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;