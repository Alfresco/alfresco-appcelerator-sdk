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
    var __alloyId65 = {};
    var __alloyId68 = [];
    var __alloyId69 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            bindId: "pic"
        }
    };
    __alloyId68.push(__alloyId69);
    var __alloyId70 = {
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
    __alloyId68.push(__alloyId70);
    var __alloyId71 = {
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
    __alloyId68.push(__alloyId71);
    var __alloyId67 = {
        properties: {
            name: "siteTemplate"
        },
        childTemplates: __alloyId68
    };
    __alloyId65["siteTemplate"] = __alloyId67;
    var __alloyId72 = [];
    $.__views.mySites = Ti.UI.createListSection({
        headerTitle: "My Sites",
        id: "mySites"
    });
    __alloyId72.push($.__views.mySites);
    $.__views.allSites = Ti.UI.createListSection({
        headerTitle: "All Sites",
        id: "allSites"
    });
    __alloyId72.push($.__views.allSites);
    $.__views.favSites = Ti.UI.createListSection({
        headerTitle: "Favourite Sites",
        id: "favSites"
    });
    __alloyId72.push($.__views.favSites);
    $.__views.siteList = Ti.UI.createListView({
        top: 0,
        left: 0,
        height: "45%",
        sections: __alloyId72,
        templates: __alloyId65,
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
    var __alloyId76 = {};
    var __alloyId79 = [];
    var __alloyId80 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            bindId: "pic"
        }
    };
    __alloyId79.push(__alloyId80);
    var __alloyId81 = {
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
    __alloyId79.push(__alloyId81);
    var __alloyId82 = {
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
    __alloyId79.push(__alloyId82);
    var __alloyId78 = {
        properties: {
            name: "repoTemplate"
        },
        childTemplates: __alloyId79
    };
    __alloyId76["repoTemplate"] = __alloyId78;
    var __alloyId83 = [];
    $.__views.repo = Ti.UI.createListSection({
        headerTitle: "Repository",
        id: "repo"
    });
    __alloyId83.push($.__views.repo);
    $.__views.folderList = Ti.UI.createListView({
        backgroundColor: "#DDDDDD",
        top: "55%",
        left: 0,
        height: "45%",
        sections: __alloyId83,
        templates: __alloyId76,
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
                Alloy.Globals.recursePropertiesAndAlert("Site properties", item.properties.data);
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