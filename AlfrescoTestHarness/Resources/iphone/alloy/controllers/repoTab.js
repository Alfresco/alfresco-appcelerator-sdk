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
    var __alloyId31 = {};
    var __alloyId34 = [];
    var __alloyId35 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            bindId: "pic"
        }
    };
    __alloyId34.push(__alloyId35);
    var __alloyId36 = {
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
    __alloyId34.push(__alloyId36);
    var __alloyId37 = {
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
    __alloyId34.push(__alloyId37);
    var __alloyId33 = {
        properties: {
            name: "repoTemplate"
        },
        childTemplates: __alloyId34
    };
    __alloyId31["repoTemplate"] = __alloyId33;
    var __alloyId38 = [];
    $.__views.mainSection = Ti.UI.createListSection({
        id: "mainSection"
    });
    __alloyId38.push($.__views.mainSection);
    $.__views.folderList = Ti.UI.createListView({
        top: "40dp",
        left: 0,
        sections: __alloyId38,
        templates: __alloyId31,
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