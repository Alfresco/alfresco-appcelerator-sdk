function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId1 = [];
    $.__views.logintab = Alloy.createController("logintab", {
        id: "logintab"
    });
    $.__views.loginTab = Ti.UI.createTab({
        window: $.__views.logintab.getViewEx({
            recurse: true
        }),
        id: "loginTab",
        title: "Account",
        icon: "KS_nav_ui.png"
    });
    __alloyId1.push($.__views.loginTab);
    $.__views.repotab = Alloy.createController("repotab", {
        id: "repotab"
    });
    $.__views.repoTab = Ti.UI.createTab({
        window: $.__views.repotab.getViewEx({
            recurse: true
        }),
        id: "repoTab",
        title: "Repository",
        icon: "KS_nav_views.png"
    });
    __alloyId1.push($.__views.repoTab);
    $.__views.sitestab = Alloy.createController("sitestab", {
        id: "sitestab"
    });
    $.__views.sitesTab = Ti.UI.createTab({
        window: $.__views.sitestab.getViewEx({
            recurse: true
        }),
        id: "sitesTab",
        title: "Sites",
        icon: "KS_nav_views.png"
    });
    __alloyId1.push($.__views.sitesTab);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId1,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.AlfrescoSDKVersion = .1;
    Alloy.Globals.SDKModule = require("com.alfresco.appcelerator.module.sdk");
    Alloy.Globals.tabGroup = $.index;
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;