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
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.addEventListener("populate", function() {
        1 > Alloy.Globals.AlfrescoSDKVersion && ($.info.text = "Not available in this SDK version");
        null != Alloy.Globals.repositorySession;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;