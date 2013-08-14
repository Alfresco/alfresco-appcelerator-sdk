function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "sitesTab";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.sitesTab = Ti.UI.createWindow({
        backgroundColor: "white",
        separatorColor: "white",
        navBarHidden: true,
        id: "sitesTab"
    });
    $.__views.sitesTab && $.addTopLevelView($.__views.sitesTab);
    $.__views.info = Ti.UI.createLabel({
        text: "Not loaded",
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        top: 5,
        left: 5,
        width: Ti.UI.FILL,
        height: "40dp",
        color: "#336699",
        id: "info"
    });
    $.__views.sitesTab.add($.__views.info);
    var __alloyId21 = {};
    var __alloyId24 = [];
    var __alloyId25 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            bindId: "pic"
        }
    };
    __alloyId24.push(__alloyId25);
    var __alloyId26 = {
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
    __alloyId24.push(__alloyId26);
    var __alloyId27 = {
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
    __alloyId24.push(__alloyId27);
    var __alloyId23 = {
        properties: {
            name: "siteTemplate"
        },
        childTemplates: __alloyId24
    };
    __alloyId21["siteTemplate"] = __alloyId23;
    var __alloyId28 = [];
    $.__views.mysites = Ti.UI.createListSection({
        title: "My Sites",
        id: "mysites"
    });
    __alloyId28.push($.__views.mysites);
    $.__views.allsites = Ti.UI.createListSection({
        title: "All Sites",
        id: "allsites"
    });
    __alloyId28.push($.__views.allsites);
    $.__views.favsites = Ti.UI.createListSection({
        title: "Favourite Sites",
        id: "favsites"
    });
    __alloyId28.push($.__views.favsites);
    $.__views.siteList = Ti.UI.createListView({
        sections: __alloyId28,
        templates: __alloyId21,
        id: "siteList",
        defaultItemTemplate: "siteTemplate"
    });
    $.__views.sitesTab.add($.__views.siteList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.addEventListener("populate", function() {
        if (1 > Alloy.Globals.AlfrescoSDKVersion) $.info.text = "Not available in this SDK version"; else {
            $.info.text = "Loaded";
            if (null != Alloy.Globals.repositorySession) {
                var siteService = Alloy.Globals.SDKModule.createSiteService();
                siteService.initWithSession(Alloy.Globals.repositorySession);
                siteService.retrieveSites();
                Alloy.Globals.modelListeners(siteService, $.mysites);
                siteService.retrieveAllSites();
                Alloy.Globals.modelListeners(siteService, $.allsites);
                siteService.retrieveFavoriteSites();
                Alloy.Globals.modelListeners(siteService, $.favsites);
            }
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;