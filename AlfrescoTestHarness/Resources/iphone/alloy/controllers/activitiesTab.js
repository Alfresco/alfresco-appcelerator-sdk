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
    var __alloyId7 = {};
    var __alloyId10 = [];
    var __alloyId11 = {
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
    __alloyId10.push(__alloyId11);
    var __alloyId12 = {
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
    __alloyId10.push(__alloyId12);
    var __alloyId13 = {
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
    __alloyId10.push(__alloyId13);
    var __alloyId9 = {
        properties: {
            name: "activityTemplate"
        },
        childTemplates: __alloyId10
    };
    __alloyId7["activityTemplate"] = __alloyId9;
    var __alloyId14 = [];
    $.__views.activities = Ti.UI.createListSection({
        headerTitle: "Activities",
        id: "activities"
    });
    __alloyId14.push($.__views.activities);
    $.__views.activityList = Ti.UI.createListView({
        top: 0,
        left: 0,
        height: "45%",
        sections: __alloyId14,
        templates: __alloyId7,
        id: "activityList",
        defaultItemTemplate: "activityTemplate"
    });
    $.__views.activitiesTab.add($.__views.activityList);
    var __alloyId16 = {};
    var __alloyId19 = [];
    var __alloyId20 = {
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
    __alloyId19.push(__alloyId20);
    var __alloyId21 = {
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
    __alloyId19.push(__alloyId21);
    var __alloyId22 = {
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
    __alloyId19.push(__alloyId22);
    var __alloyId18 = {
        properties: {
            name: "activityPropertiesTemplate"
        },
        childTemplates: __alloyId19
    };
    __alloyId16["activityPropertiesTemplate"] = __alloyId18;
    var __alloyId23 = [];
    $.__views.properties = Ti.UI.createListSection({
        headerTitle: "Properties",
        id: "properties"
    });
    __alloyId23.push($.__views.properties);
    $.__views.activityProperties = Ti.UI.createListView({
        backgroundColor: "#DDDDDD",
        top: "55%",
        left: 0,
        height: "45%",
        sections: __alloyId23,
        templates: __alloyId16,
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
        var activityCreatorIndex;
        var personService = Alloy.Globals.SDKModule.createPersonService();
        personService.initWithSession(Alloy.Globals.repositorySession);
        personService.addEventListener("personnode", function(e) {
            var person = e.person;
            Ti.API.info("Person: " + person.fullName);
            personService.retrieveAvatarForPerson(person);
            personService.addEventListener("retrievedavatar", function(e) {
                var contentFile = e.contentfile;
                Ti.API.info("Image: " + contentFile.getPath());
                var item = $.properties.getItemAt(activityCreatorIndex);
                item.pic.image = contentFile.getPath();
                $.properties.updateItemAt(activityCreatorIndex, item);
            });
        });
        if (Alloy.Globals.AlfrescoSDKVersion >= 1 && null != Alloy.Globals.repositorySession && 0 == $.activities.getItems().length) {
            var activityService = Alloy.Globals.SDKModule.createActivityService();
            activityService.initWithSession(Alloy.Globals.repositorySession);
            activityService.retrieveActivityStream();
            Alloy.Globals.activitiesModelListener(activityService, $.activities);
            $.activityList.addEventListener("itemclick", function(e) {
                var item = e.section.getItemAt(e.itemIndex);
                var mainDataSet = [];
                $.properties.deleteItemsAt(0, $.properties.getItems().length);
                activityCreatorImage = "";
                Alloy.Globals.recurseProperties(item.properties, "", function(name, value) {
                    if ("createdBy" == name) {
                        Ti.API.info("Person id: " + value);
                        personService.retrievePersonWithIdentifier(value);
                        activityCreatorIndex = mainDataSet.length;
                    }
                    data = {
                        info: {
                            text: name + ":"
                        },
                        es_info: {
                            text: value
                        },
                        pic: {
                            image: "default_entry_icon.png"
                        }
                    };
                    mainDataSet.push(data);
                });
                $.properties.appendItems(mainDataSet);
            });
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;