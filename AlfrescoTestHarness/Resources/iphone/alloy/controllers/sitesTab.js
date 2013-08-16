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
    var __alloyId22 = {};
    var __alloyId25 = [];
    var __alloyId26 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            bindId: "pic"
        }
    };
    __alloyId25.push(__alloyId26);
    var __alloyId27 = {
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
    __alloyId25.push(__alloyId27);
    var __alloyId28 = {
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
    __alloyId25.push(__alloyId28);
    var __alloyId24 = {
        properties: {
            name: "siteTemplate"
        },
        childTemplates: __alloyId25
    };
    __alloyId22["siteTemplate"] = __alloyId24;
    var __alloyId29 = [];
    $.__views.mySites = Ti.UI.createListSection({
        headerTitle: "My Sites",
        id: "mySites"
    });
    __alloyId29.push($.__views.mySites);
    $.__views.allSites = Ti.UI.createListSection({
        headerTitle: "All Sites",
        id: "allSites"
    });
    __alloyId29.push($.__views.allSites);
    $.__views.favSites = Ti.UI.createListSection({
        headerTitle: "Favourite Sites",
        id: "favSites"
    });
    __alloyId29.push($.__views.favSites);
    $.__views.siteList = Ti.UI.createListView({
        top: 0,
        left: 0,
        height: "45%",
        sections: __alloyId29,
        templates: __alloyId22,
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
    var __alloyId33 = {};
    var __alloyId36 = [];
    var __alloyId37 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            bindId: "pic"
        }
    };
    __alloyId36.push(__alloyId37);
    var __alloyId38 = {
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
    __alloyId36.push(__alloyId38);
    var __alloyId39 = {
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
    __alloyId36.push(__alloyId39);
    var __alloyId35 = {
        properties: {
            name: "repoTemplate"
        },
        childTemplates: __alloyId36
    };
    __alloyId33["repoTemplate"] = __alloyId35;
    var __alloyId40 = [];
    $.__views.repo = Ti.UI.createListSection({
        headerTitle: "Repository",
        id: "repo"
    });
    __alloyId40.push($.__views.repo);
    $.__views.folderList = Ti.UI.createListView({
        backgroundColor: "#DDDDDD",
        top: "55%",
        left: 0,
        height: "45%",
        sections: __alloyId40,
        templates: __alloyId33,
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
            siteService.initWithSession(Alloy.Globals.repositorySession);
            siteService.retrieveSites();
            Alloy.Globals.sitesModelListener(siteService, $.mySites, "mysitesnode");
            siteService.retrieveAllSites();
            Alloy.Globals.sitesModelListener(siteService, $.allSites, "allsitesnode");
            siteService.retrieveFavoriteSites();
            Alloy.Globals.sitesModelListener(siteService, $.favSites, "favsitesnode");
            documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
            documentFolderService.initWithSession(Alloy.Globals.repositorySession);
            Alloy.Globals.modelListeners(documentFolderService, $.repo);
            $.siteList.addEventListener("itemclick", function(e) {
                var item = e.section.getItemAt(e.itemIndex);
                var name = item.properties.name;
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