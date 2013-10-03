function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.logintab = Alloy.createController("accountTab", {
        id: "logintab"
    });
    $.__views.loginTab = Ti.UI.createTab({
        window: $.__views.logintab.getViewEx({
            recurse: true
        }),
        id: "loginTab",
        title: "Account",
        icon: "KS_nav_login.png"
    });
    $.__views.index.addTab($.__views.loginTab);
    $.__views.repotab = Alloy.createController("repoTab", {
        id: "repotab"
    });
    $.__views.repoTab = Ti.UI.createTab({
        window: $.__views.repotab.getViewEx({
            recurse: true
        }),
        id: "repoTab",
        title: "Repository",
        icon: "KS_nav_folder.png"
    });
    $.__views.index.addTab($.__views.repoTab);
    $.__views.sitestab = Alloy.createController("sitesTab", {
        id: "sitestab"
    });
    $.__views.sitesTab = Ti.UI.createTab({
        window: $.__views.sitestab.getViewEx({
            recurse: true
        }),
        id: "sitesTab",
        title: "Sites",
        icon: "KS_nav_sites.png"
    });
    $.__views.index.addTab($.__views.sitesTab);
    $.__views.activitiestab = Alloy.createController("activitiesTab", {
        id: "activitiestab"
    });
    $.__views.activitiesTab = Ti.UI.createTab({
        window: $.__views.activitiestab.getViewEx({
            recurse: true
        }),
        id: "activitiesTab",
        title: "Activities",
        icon: "KS_nav_ui.png"
    });
    $.__views.index.addTab($.__views.activitiesTab);
    $.__views.searchtab = Alloy.createController("searchTab", {
        id: "searchtab"
    });
    $.__views.searchTab = Ti.UI.createTab({
        window: $.__views.searchtab.getViewEx({
            recurse: true
        }),
        id: "searchTab",
        title: "Search",
        icon: "KS_nav_search.png"
    });
    $.__views.index.addTab($.__views.searchTab);
    $.__views.propstab = Alloy.createController("propertiesTab", {
        id: "propstab"
    });
    $.__views.propsTab = Ti.UI.createTab({
        window: $.__views.propstab.getViewEx({
            recurse: true
        }),
        id: "propsTab",
        title: "Properties",
        icon: "KS_nav_ui.png"
    });
    $.__views.index.addTab($.__views.propsTab);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.AlfrescoSDKVersion = 1;
    Alloy.Globals.SDKModule = require("com.alfresco.appcelerator.module.sdk");
    Alloy.Globals.tabGroup = $.index;
    Alloy.Globals.currentNode = null;
    Alloy.Globals.nodeJustProperties = false;
    $.index.open();
    $.index.addEventListener("focus", function(e) {
        1 == e.index ? Ti.App.fireEvent("repopopulate") : 2 == e.index && Ti.App.fireEvent("sitespopulate");
        3 == e.index && Ti.App.fireEvent("activitiespopulate");
        4 == e.index ? Ti.App.fireEvent("searchinit") : 5 == e.index && Ti.App.fireEvent("propspopulate");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;