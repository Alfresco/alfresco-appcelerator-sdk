function Controller() {
    function getFolder(repoSesh) {
        documentFolderService.initWithSession(repoSesh);
        documentFolderService.retrieveRootFolder();
        documentFolderService.addEventListener("retrievedfolder", function() {
            $.folderLabel.text = " " + documentFolderService.getCurrentFolder().getFolderName();
            documentFolderService.retrieveChildrenInFolder();
            Alloy.Globals.modelListeners(documentFolderService, mainSection);
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
    var __alloyId13 = {};
    var __alloyId16 = [];
    var __alloyId17 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            bindId: "pic"
        }
    };
    __alloyId16.push(__alloyId17);
    var __alloyId18 = {
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
    __alloyId16.push(__alloyId18);
    var __alloyId19 = {
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
    __alloyId16.push(__alloyId19);
    var __alloyId15 = {
        properties: {
            name: "repoTemplate"
        },
        childTemplates: __alloyId16
    };
    __alloyId13["repoTemplate"] = __alloyId15;
    var __alloyId20 = [];
    $.__views.mainSection = Ti.UI.createListSection({
        id: "mainSection"
    });
    __alloyId20.push($.__views.mainSection);
    $.__views.folderList = Ti.UI.createListView({
        top: "40dp",
        left: 0,
        sections: __alloyId20,
        templates: __alloyId13,
        id: "folderList",
        defaultItemTemplate: "repoTemplate"
    });
    $.__views.repoTab.add($.__views.folderList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var mainSection = $.mainSection;
    var documentFolderService;
    var parentFolders = new Array();
    Ti.App.addEventListener("cleartabs", function() {
        parentFolders = new Array();
        mainSection.deleteItemsAt(0, mainSection.getItems().length);
    });
    Ti.App.addEventListener("repopopulate", function() {
        if (null != Alloy.Globals.repositorySession && 0 == $.mainSection.getItems().length) {
            documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
            Alloy.Globals.controllerNavigation($, documentFolderService, parentFolders, function(folder) {
                documentFolderService.setFolder(folder);
                documentFolderService.retrieveChildrenInFolder();
            }, function(document) {
                documentFolderService.saveDocument(document);
            });
            getFolder(Alloy.Globals.repositorySession);
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;