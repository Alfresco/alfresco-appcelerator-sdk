function Controller() {
    function viewButtonChange() {
        allNodeTypes = !allNodeTypes;
    }
    function getFolder(repoSesh) {
        documentFolderService.initialiseWithSession(repoSesh);
        documentFolderService.retrieveRootFolder();
        documentFolderService.addEventListener("retrievedfolder", function() {
            $.folderLabel.text = " " + documentFolderService.getCurrentFolder().getName();
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
    var __defers = {};
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
        width: "100%",
        height: "40dp",
        id: "folderLabel"
    });
    $.__views.repoTab.add($.__views.folderLabel);
    $.__views.viewButton = Ti.UI.createSwitch({
        top: 0,
        left: "60%",
        width: "0%",
        backgroundColor: "#336699",
        id: "viewButton"
    });
    $.__views.repoTab.add($.__views.viewButton);
    viewButtonChange ? $.__views.viewButton.addEventListener("change", viewButtonChange) : __defers["$.__views.viewButton!change!viewButtonChange"] = true;
    var __alloyId35 = {};
    var __alloyId38 = [];
    var __alloyId39 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            bindId: "pic"
        }
    };
    __alloyId38.push(__alloyId39);
    var __alloyId40 = {
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
    __alloyId38.push(__alloyId40);
    var __alloyId41 = {
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
    __alloyId38.push(__alloyId41);
    var __alloyId37 = {
        properties: {
            name: "repoTemplate"
        },
        childTemplates: __alloyId38
    };
    __alloyId35["repoTemplate"] = __alloyId37;
    var __alloyId42 = [];
    $.__views.mainSection = Ti.UI.createListSection({
        id: "mainSection"
    });
    __alloyId42.push($.__views.mainSection);
    $.__views.folderList = Ti.UI.createListView({
        top: "40dp",
        left: 0,
        sections: __alloyId42,
        templates: __alloyId35,
        id: "folderList",
        defaultItemTemplate: "repoTemplate"
    });
    $.__views.repoTab.add($.__views.folderList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var mainSection = $.mainSection;
    var documentFolderService;
    var parentFolders = new Array();
    var allNodeTypes = true;
    Ti.App.addEventListener("cleartabs", function() {
        parentFolders = new Array();
        mainSection.deleteItemsAt(0, mainSection.getItems().length);
    });
    Ti.App.addEventListener("repopopulate", function() {
        if (null != Alloy.Globals.repositorySession && 0 == $.mainSection.getItems().length) {
            documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
            documentFolderService.addEventListener("error", function(e) {
                alert(e.errorstring);
            });
            Alloy.Globals.controllerNavigation($, documentFolderService, parentFolders, function(folder) {
                if (allNodeTypes) {
                    documentFolderService.setFolder(folder);
                    documentFolderService.retrieveChildrenInFolder();
                } else {
                    documentFolderService.setFolder(folder);
                    documentFolderService.retrieveDocumentsInFolder(folder);
                }
            }, function(document) {
                documentFolderService.saveDocument(document);
            });
            getFolder(Alloy.Globals.repositorySession);
        }
    });
    __defers["$.__views.viewButton!change!viewButtonChange"] && $.__views.viewButton.addEventListener("change", viewButtonChange);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;