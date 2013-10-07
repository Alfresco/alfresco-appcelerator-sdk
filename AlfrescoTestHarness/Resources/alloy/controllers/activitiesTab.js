function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "activitiesTab";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.activitiesTab = Ti.UI.createWindow({
        backgroundColor: "black",
        navBarHidden: true,
        fullscreen: true,
        id: "activitiesTab"
    });
    $.__views.activitiesTab && $.addTopLevelView($.__views.activitiesTab);
    var __alloyId0 = {};
    var __alloyId3 = [];
    var __alloyId4 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            top: 7,
            bindId: "pic"
        }
    };
    __alloyId3.push(__alloyId4);
    var __alloyId5 = {
        type: "Ti.UI.Label",
        bindId: "info",
        properties: {
            color: "black",
            font: {
                fontFamily: "Arial",
                fontSize: "14dp",
                fontWeight: "bold"
            },
            left: "60dp",
            top: 7,
            bindId: "info"
        }
    };
    __alloyId3.push(__alloyId5);
    var __alloyId6 = {
        type: "Ti.UI.Label",
        bindId: "es_info",
        properties: {
            font: {
                fontFamily: "Arial",
                fontSize: "16dp"
            },
            left: "60dp",
            top: "50dp",
            bindId: "es_info"
        }
    };
    __alloyId3.push(__alloyId6);
    var __alloyId2 = {
        properties: {
            name: "activityTemplate"
        },
        childTemplates: __alloyId3
    };
    __alloyId0["activityTemplate"] = __alloyId2;
    var __alloyId7 = [];
    $.__views.activities = Ti.UI.createListSection({
        headerTitle: "Activities",
        id: "activities"
    });
    __alloyId7.push($.__views.activities);
    $.__views.activityList = Ti.UI.createListView({
        top: 0,
        left: 0,
        height: "100%",
        sections: __alloyId7,
        templates: __alloyId0,
        id: "activityList",
        defaultItemTemplate: "activityTemplate"
    });
    $.__views.activitiesTab.add($.__views.activityList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.addEventListener("cleartabs", function() {
        $.activities.deleteItemsAt(0, $.activities.getItems().length);
    });
    Ti.App.addEventListener("activitiespopulate", function() {
        if (Alloy.Globals.AlfrescoSDKVersion >= 1 && null != Alloy.Globals.repositorySession && 0 == $.activities.getItems().length) {
            var activityService = Alloy.Globals.SDKModule.createActivityService();
            activityService.addEventListener("error", function(e) {
                alert(e.errorstring);
            });
            activityService.initialiseWithSession(Alloy.Globals.repositorySession);
            activityService.retrieveActivityStream();
            Alloy.Globals.activitiesModelListener(activityService, $.activities);
            $.activityList.addEventListener("itemclick", function(e) {
                var item = e.section.getItemAt(e.itemIndex);
                Alloy.Globals.currentNode = item.properties;
                Alloy.Globals.nodeJustProperties = true;
            });
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;