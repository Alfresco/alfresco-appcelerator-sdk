function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
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
    $.__views.index.addTab($.__views.loginTab);
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
    $.__views.index.addTab($.__views.repoTab);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.SDKModule = require("com.alfresco.appcelerator.module.sdk");
    Alloy.Globals.tabGroup = $.index;
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;