function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "sitesTab";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.sitesTab = Ti.UI.createWindow({
        backgroundColor: "black",
        navBarHidden: true,
        id: "sitesTab"
    });
    $.__views.sitesTab && $.addTopLevelView($.__views.sitesTab);
    var __alloyId57 = {};
    var __alloyId60 = [];
    var __alloyId61 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            bindId: "pic"
        }
    };
    __alloyId60.push(__alloyId61);
    var __alloyId62 = {
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
    __alloyId60.push(__alloyId62);
    var __alloyId63 = {
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
    __alloyId60.push(__alloyId63);
    var __alloyId59 = {
        properties: {
            name: "siteTemplate"
        },
        childTemplates: __alloyId60
    };
    __alloyId57["siteTemplate"] = __alloyId59;
    var __alloyId64 = [];
    $.__views.mySites = Ti.UI.createListSection({
        headerTitle: "My Sites",
        id: "mySites"
    });
    __alloyId64.push($.__views.mySites);
    $.__views.allSites = Ti.UI.createListSection({
        headerTitle: "All Sites",
        id: "allSites"
    });
    __alloyId64.push($.__views.allSites);
    $.__views.favSites = Ti.UI.createListSection({
        headerTitle: "Favourite Sites",
        id: "favSites"
    });
    __alloyId64.push($.__views.favSites);
    $.__views.siteList = Ti.UI.createListView({
        top: 0,
        left: 0,
        height: "45%",
        sections: __alloyId64,
        templates: __alloyId57,
        id: "siteList",
        defaultItemTemplate: "siteTemplate"
    });
    $.__views.sitesTab.add($.__views.siteList);
    $.__views.folderLabel = Ti.UI.createLabel({
        text: "",
        color: "black",
        font: {
            fontFamily: "Arial",
            fontSize: "12dp",
            fontWeight: "bold"
        },
        backgroundColor: "black",
        top: "47%",
        left: 0,
        width: Ti.UI.FILL,
        id: "folderLabel"
    });
    $.__views.sitesTab.add($.__views.folderLabel);
    var __alloyId68 = {};
    var __alloyId71 = [];
    var __alloyId72 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            bindId: "pic"
        }
    };
    __alloyId71.push(__alloyId72);
    var __alloyId73 = {
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
    __alloyId71.push(__alloyId73);
    var __alloyId74 = {
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
    __alloyId71.push(__alloyId74);
    var __alloyId70 = {
        properties: {
            name: "repoTemplate"
        },
        childTemplates: __alloyId71
    };
    __alloyId68["repoTemplate"] = __alloyId70;
    var __alloyId75 = [];
    $.__views.repo = Ti.UI.createListSection({
        headerTitle: "Repository",
        id: "repo"
    });
    __alloyId75.push($.__views.repo);
    $.__views.folderList = Ti.UI.createListView({
        backgroundColor: "#DDDDDD",
        top: "55%",
        left: 0,
        height: "45%",
        sections: __alloyId75,
        templates: __alloyId68,
        id: "folderList",
        defaultItemTemplate: "repoTemplate"
    });
    $.__views.sitesTab.add($.__views.folderList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var documentFolderService;
    var parentFolders = new Array();
    Ti.App.addEventListener("cleartabs", function() {
        $.mySites.deleteItemsAt(0, $.mySites.getItems().length);
        $.allSites.deleteItemsAt(0, $.allSites.getItems().length);
        $.favSites.deleteItemsAt(0, $.favSites.getItems().length);
        $.repo.deleteItemsAt(0, $.repo.getItems().length);
    });
    Ti.App.addEventListener("sitespopulate", function() {
        if (Alloy.Globals.AlfrescoSDKVersion >= 1 && null != Alloy.Globals.repositorySession && 0 == $.allSites.getItems().length) {
            var siteService = Alloy.Globals.SDKModule.createSiteService();
            siteService.addEventListener("error", function(e) {
                alert(e.errorstring);
            });
            siteService.initialiseWithSession(Alloy.Globals.repositorySession);
            siteService.retrieveSites();
            Alloy.Globals.sitesModelListener(siteService, $.mySites, "mysitesnode");
            siteService.retrieveAllSites();
            Alloy.Globals.sitesModelListener(siteService, $.allSites, "allsitesnode");
            siteService.retrieveFavoriteSites();
            Alloy.Globals.sitesModelListener(siteService, $.favSites, "favsitesnode");
            documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
            documentFolderService.addEventListener("error", function(e) {
                alert(e.errorstring);
            });
            documentFolderService.initialiseWithSession(Alloy.Globals.repositorySession);
            Alloy.Globals.modelListeners(documentFolderService, $.repo);
            $.siteList.addEventListener("itemclick", function(e) {
                var item = e.section.getItemAt(e.itemIndex);
                var name = item.properties.name;
                Alloy.Globals.currentNode = item.properties.data;
                Alloy.Globals.nodeJustProperties = true;
                siteService.retrieveDocumentLibraryFolderForSite(name);
            });
            siteService.addEventListener("retrievedDocumentFolder", function(e) {
                $.repo.deleteItemsAt(0, $.repo.getItems().length);
                documentFolderService.setFolder(e.folder);
                documentFolderService.retrieveChildrenInFolder();
            });
            Alloy.Globals.controllerNavigation($, documentFolderService, parentFolders, function(folder) {
                documentFolderService.setFolder(folder);
                documentFolderService.retrieveChildrenInFolder();
            }, function(document) {
                documentFolderService.saveDocument(document);
            });
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;