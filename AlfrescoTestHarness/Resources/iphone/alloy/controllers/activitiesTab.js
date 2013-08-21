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
                fontSize: "16dp",
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
            top: "25dp",
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
        height: "45%",
        sections: __alloyId7,
        templates: __alloyId0,
        id: "activityList",
        defaultItemTemplate: "activityTemplate"
    });
    $.__views.activitiesTab.add($.__views.activityList);
    var __alloyId9 = {};
    var __alloyId12 = [];
    var __alloyId13 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            bindId: "pic"
        }
    };
    __alloyId12.push(__alloyId13);
    var __alloyId14 = {
        type: "Ti.UI.Label",
        bindId: "info",
        properties: {
            color: "black",
            font: {
                fontFamily: "Arial",
                fontSize: "16dp",
                fontWeight: "bold"
            },
            left: "60dp",
            top: 7,
            bindId: "info"
        }
    };
    __alloyId12.push(__alloyId14);
    var __alloyId15 = {
        type: "Ti.UI.Label",
        bindId: "es_info",
        properties: {
            font: {
                fontFamily: "Arial",
                fontSize: "16dp"
            },
            left: "60dp",
            top: "25dp",
            bindId: "es_info"
        }
    };
    __alloyId12.push(__alloyId15);
    var __alloyId11 = {
        properties: {
            name: "activityPropertiesTemplate"
        },
        childTemplates: __alloyId12
    };
    __alloyId9["activityPropertiesTemplate"] = __alloyId11;
    var __alloyId16 = [];
    $.__views.properties = Ti.UI.createListSection({
        headerTitle: "Properties",
        id: "properties"
    });
    __alloyId16.push($.__views.properties);
    $.__views.activityProperties = Ti.UI.createListView({
        backgroundColor: "#DDDDDD",
        top: "55%",
        left: 0,
        height: "45%",
        sections: __alloyId16,
        templates: __alloyId9,
        id: "activityProperties",
        defaultItemTemplate: "activityPropertiesTemplate"
    });
    $.__views.activitiesTab.add($.__views.activityProperties);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.addEventListener("cleartabs", function() {
        $.activities.deleteItemsAt(0, $.activities.getItems().length);
        $.properties.deleteItemsAt(0, $.properties.getItems().length);
    });
    Ti.App.addEventListener("activitiespopulate", function() {
        if (Alloy.Globals.AlfrescoSDKVersion >= 1 && null != Alloy.Globals.repositorySession && 0 == $.activities.getItems().length) {
            var activityService = Alloy.Globals.SDKModule.createActivityService();
            activityService.initWithSession(Alloy.Globals.repositorySession);
            activityService.retrieveActivityStream();
            Alloy.Globals.activitiesModelListener(activityService, $.activities, "activitynode");
            $.activityList.addEventListener("itemclick", function(e) {
                var item = e.section.getItemAt(e.itemIndex);
                var mainDataSet = [];
                $.properties.deleteItemsAt(0, $.properties.getItems().length);
                var data = {
                    info: {
                        text: "data.title:"
                    },
                    es_info: {
                        text: item.properties.title
                    },
                    pic: {
                        image: "default_entry_icon.png"
                    }
                };
                mainDataSet.push(data);
                data = {
                    info: {
                        text: "siteShortName:"
                    },
                    es_info: {
                        text: item.properties.siteShortName
                    },
                    pic: {
                        image: "default_entry_icon.png"
                    }
                };
                mainDataSet.push(data);
                data = {
                    info: {
                        text: "createdAt:"
                    },
                    es_info: {
                        text: item.properties.createdAt
                    },
                    pic: {
                        image: "default_entry_icon.png"
                    }
                };
                mainDataSet.push(data);
                data = {
                    info: {
                        text: "createdBy:"
                    },
                    es_info: {
                        text: item.properties.createdBy
                    },
                    pic: {
                        image: "default_entry_icon.png"
                    }
                };
                mainDataSet.push(data);
                data = {
                    info: {
                        text: "type:"
                    },
                    es_info: {
                        text: item.properties.type
                    },
                    pic: {
                        image: "default_entry_icon.png"
                    }
                };
                mainDataSet.push(data);
                data = {
                    info: {
                        text: "identifier:"
                    },
                    es_info: {
                        text: item.properties.identifier
                    },
                    pic: {
                        image: "default_entry_icon.png"
                    }
                };
                mainDataSet.push(data);
                $.properties.appendItems(mainDataSet);
            });
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;