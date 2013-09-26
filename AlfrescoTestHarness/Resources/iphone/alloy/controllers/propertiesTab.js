function Controller() {
    function init() {
        if (null == documentFolderService) {
            documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
            documentFolderService.addEventListener("error", function(e) {
                alert("documentFolderService:\r\n" + e.errorstring);
            });
            documentFolderService.addEventListener("retrievedpermissions", function(e) {
                Alloy.Globals.recurseProperties(e.permissions, "", function(name, value) {
                    permissionsDataSet.push({
                        info: {
                            text: name + ":"
                        },
                        es_info: {
                            text: value
                        },
                        pic: {
                            image: "default_entry_icon.png"
                        }
                    });
                });
                $.permissions.appendItems(permissionsDataSet);
                --inUseCounter;
            });
            commentService = Alloy.Globals.SDKModule.createCommentService();
            commentService.addEventListener("error", function(e) {
                alert("commentService:\r\n" + e.errorstring);
            });
            commentService.addEventListener("endenumeration", function() {
                $.comments.appendItems(commentsDataSet);
                --inUseCounter;
            });
            commentService.addEventListener("commentnode", function(e) {
                commentsDataSet.push({
                    info: {
                        text: e.comment.name
                    },
                    es_info: {
                        text: e.comment.content
                    },
                    pic: {
                        image: "default_entry_icon.png"
                    }
                });
            });
            taggingService = Alloy.Globals.SDKModule.createTaggingService();
            taggingService.addEventListener("error", function(e) {
                alert("taggingService:\r\n" + e.errorstring);
            });
            taggingService.addEventListener("endenumeration", function() {
                $.tags.appendItems(tagsDataSet);
                --inUseCounter;
            });
            taggingService.addEventListener("tagnode", function(e) {
                tagsDataSet.push({
                    info: {
                        text: e.tag.identifier
                    },
                    es_info: {
                        text: e.tag.value
                    },
                    pic: {
                        image: "default_entry_icon.png"
                    }
                });
            });
            personService = Alloy.Globals.SDKModule.createPersonService();
            personService.addEventListener("error", function(e) {
                alert("personService:\r\n" + e.errorstring);
            });
            personService.addEventListener("endenumeration", function() {
                --inUseCounter;
            });
            personService.addEventListener("personnode", function(e) {
                var person = e.person;
                Ti.API.info("Person: " + person.fullName);
                personService.retrieveAvatarForPerson(person);
            });
            personService.addEventListener("retrievedavatar", function(e) {
                var contentFile = e.contentfile;
                Ti.API.info("Image: " + contentFile.getPath());
                var item = $.properties.getItemAt(creatorIndex);
                item.pic.image = contentFile.getPath();
                $.properties.updateItemAt(creatorIndex, item);
            });
            documentFolderService.initialiseWithSession(Alloy.Globals.repositorySession);
            personService.initialiseWithSession(Alloy.Globals.repositorySession);
            commentService.initialiseWithSession(Alloy.Globals.repositorySession);
            taggingService.initialiseWithSession(Alloy.Globals.repositorySession);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "propertiesTab";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.propertiesTab = Ti.UI.createWindow({
        backgroundColor: "black",
        navBarHidden: true,
        id: "propertiesTab"
    });
    $.__views.propertiesTab && $.addTopLevelView($.__views.propertiesTab);
    var __alloyId31 = {};
    var __alloyId34 = [];
    var __alloyId35 = {
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
    __alloyId34.push(__alloyId35);
    var __alloyId36 = {
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
    __alloyId34.push(__alloyId36);
    var __alloyId37 = {
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
    __alloyId34.push(__alloyId37);
    var __alloyId33 = {
        properties: {
            name: "propsTemplate"
        },
        childTemplates: __alloyId34
    };
    __alloyId31["propsTemplate"] = __alloyId33;
    var __alloyId38 = [];
    $.__views.properties = Ti.UI.createListSection({
        headerTitle: "Properties",
        id: "properties"
    });
    __alloyId38.push($.__views.properties);
    $.__views.permissions = Ti.UI.createListSection({
        headerTitle: "Permissions",
        id: "permissions"
    });
    __alloyId38.push($.__views.permissions);
    $.__views.comments = Ti.UI.createListSection({
        headerTitle: "Comments",
        id: "comments"
    });
    __alloyId38.push($.__views.comments);
    $.__views.tags = Ti.UI.createListSection({
        headerTitle: "Tags",
        id: "tags"
    });
    __alloyId38.push($.__views.tags);
    $.__views.propList = Ti.UI.createListView({
        sections: __alloyId38,
        templates: __alloyId31,
        id: "propList",
        defaultItemTemplate: "propsTemplate"
    });
    $.__views.propertiesTab.add($.__views.propList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var creatorIndex;
    var inUseCounter = 0;
    var documentFolderService = null;
    var commentService;
    var taggingService;
    var personService;
    var permissionsDataSet = [];
    var commentsDataSet = [];
    var tagsDataSet = [];
    var lastNode = null;
    Ti.App.addEventListener("cleartabs", function() {
        $.properties.deleteItemsAt(0, $.properties.getItems().length);
        $.permissions.deleteItemsAt(0, $.permissions.getItems().length);
        $.comments.deleteItemsAt(0, $.comments.getItems().length);
        $.tags.deleteItemsAt(0, $.tags.getItems().length);
        propertiesDataSet = [];
        permissionsDataSet = [];
        commentsDataSet = [];
        tagsDataSet = [];
    });
    Ti.App.addEventListener("propspopulate", function() {
        if (null == Alloy.Globals.currentNode) return;
        if (null != lastNode && lastNode.name == Alloy.Globals.currentNode.name) return;
        init();
        inUseCounter = 4;
        lastNode = Alloy.Globals.currentNode;
        var node = lastNode;
        $.properties.deleteItemsAt(0, $.properties.getItems().length);
        $.permissions.deleteItemsAt(0, $.permissions.getItems().length);
        $.comments.deleteItemsAt(0, $.comments.getItems().length);
        $.tags.deleteItemsAt(0, $.tags.getItems().length);
        permissionsDataSet = [];
        commentsDataSet = [];
        tagsDataSet = [];
        Alloy.Globals.recurseProperties(node, "", function(name, value) {
            var propertiesDataSet = [];
            propertiesDataSet.push({
                info: {
                    text: name + ":"
                },
                es_info: {
                    text: value
                },
                pic: {
                    image: "default_entry_icon.png"
                }
            });
            $.properties.appendItems(propertiesDataSet);
            if ("createdBy" == name) {
                Ti.API.info("Person id: " + value);
                personService.retrievePersonWithIdentifier(value);
                creatorIndex = $.properties.getItems().length - 1;
            }
        });
        documentFolderService.retrievePermissionsOfNode(node);
        commentService.retrieveCommentsForNode(node);
        taggingService.retrieveTagsForNode(node);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;