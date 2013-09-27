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
            });
            commentService = Alloy.Globals.SDKModule.createCommentService();
            commentService.addEventListener("error", function(e) {
                alert("commentService:\r\n" + e.errorstring);
            });
            commentService.addEventListener("endenumeration", function() {
                $.comments.appendItems(commentsDataSet);
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
            personService.addEventListener("endenumeration", function() {});
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
            versionService = Alloy.Globals.SDKModule.createVersionService();
            Alloy.Globals.modelListeners(versionService, $.folderList);
            $.propList.addEventListener("itemclick", function(e) {
                e.section == $.folderList;
            });
            versionService.addEventListener("error", function(e) {
                alert("versionService:\r\n" + e.errorstring);
            });
            versionService.addEventListener("endenumeration", function() {});
            documentFolderService.initialiseWithSession(Alloy.Globals.repositorySession);
            personService.initialiseWithSession(Alloy.Globals.repositorySession);
            commentService.initialiseWithSession(Alloy.Globals.repositorySession);
            taggingService.initialiseWithSession(Alloy.Globals.repositorySession);
            versionService.initialiseWithSession(Alloy.Globals.repositorySession);
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
    var __alloyId22 = {};
    var __alloyId25 = [];
    var __alloyId26 = {
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
    __alloyId25.push(__alloyId26);
    var __alloyId27 = {
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
    __alloyId25.push(__alloyId27);
    var __alloyId28 = {
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
    __alloyId25.push(__alloyId28);
    var __alloyId24 = {
        properties: {
            name: "propsTemplate"
        },
        childTemplates: __alloyId25
    };
    __alloyId22["propsTemplate"] = __alloyId24;
    var __alloyId29 = [];
    $.__views.properties = Ti.UI.createListSection({
        headerTitle: "Properties",
        id: "properties"
    });
    __alloyId29.push($.__views.properties);
    $.__views.permissions = Ti.UI.createListSection({
        headerTitle: "Permissions",
        id: "permissions"
    });
    __alloyId29.push($.__views.permissions);
    $.__views.comments = Ti.UI.createListSection({
        headerTitle: "Comments",
        id: "comments"
    });
    __alloyId29.push($.__views.comments);
    $.__views.tags = Ti.UI.createListSection({
        headerTitle: "Tags",
        id: "tags"
    });
    __alloyId29.push($.__views.tags);
    $.__views.folderList = Ti.UI.createListSection({
        headerTitle: "Versions",
        id: "folderList"
    });
    __alloyId29.push($.__views.folderList);
    $.__views.propList = Ti.UI.createListView({
        sections: __alloyId29,
        templates: __alloyId22,
        id: "propList",
        defaultItemTemplate: "propsTemplate"
    });
    $.__views.propertiesTab.add($.__views.propList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var creatorIndex;
    var documentFolderService = null;
    var commentService;
    var taggingService;
    var personService;
    var permissionsDataSet = [];
    var commentsDataSet = [];
    var tagsDataSet = [];
    var lastNode = null;
    new Array();
    Ti.App.addEventListener("cleartabs", function() {
        $.properties.deleteItemsAt(0, $.properties.getItems().length);
        $.permissions.deleteItemsAt(0, $.permissions.getItems().length);
        $.comments.deleteItemsAt(0, $.comments.getItems().length);
        $.tags.deleteItemsAt(0, $.tags.getItems().length);
        $.folderList.deleteItemsAt(0, $.folderList.getItems().length);
        propertiesDataSet = [];
        permissionsDataSet = [];
        commentsDataSet = [];
        tagsDataSet = [];
    });
    Ti.App.addEventListener("propspopulate", function() {
        if (null == Alloy.Globals.currentNode) return;
        if (null != lastNode && lastNode == Alloy.Globals.currentNode) return;
        init();
        lastNode = Alloy.Globals.currentNode;
        var node = lastNode;
        $.properties.deleteItemsAt(0, $.properties.getItems().length);
        $.permissions.deleteItemsAt(0, $.permissions.getItems().length);
        $.comments.deleteItemsAt(0, $.comments.getItems().length);
        $.tags.deleteItemsAt(0, $.tags.getItems().length);
        $.folderList.deleteItemsAt(0, $.folderList.getItems().length);
        propertiesDataSet = [];
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
        if (false == Alloy.Globals.nodeJustProperties) {
            documentFolderService.retrievePermissionsOfNode(node);
            commentService.retrieveCommentsForNode(node);
            taggingService.retrieveTagsForNode(node);
            if (node.isDocument) versionService.retrieveAllVersionsOfDocument(node); else {
                var versionsDataSet = [];
                versionsDataSet.push({
                    info: {
                        text: "Not applicable"
                    },
                    es_info: {
                        text: ""
                    },
                    pic: {
                        image: ""
                    }
                });
                $.folderList.appendItems(versionsDataSet);
            }
        } else {
            permissionsDataSet.push({
                info: {
                    text: "Not applicable"
                },
                es_info: {
                    text: ""
                },
                pic: {
                    image: ""
                }
            });
            $.permissions.appendItems(permissionsDataSet);
            commentsDataSet.push({
                info: {
                    text: "Not applicable"
                },
                es_info: {
                    text: ""
                },
                pic: {
                    image: ""
                }
            });
            $.comments.appendItems(commentsDataSet);
            tagsDataSet.push({
                info: {
                    text: "Not applicable"
                },
                es_info: {
                    text: ""
                },
                pic: {
                    image: ""
                }
            });
            $.tags.appendItems(tagsDataSet);
            var versionsDataSet = [];
            versionsDataSet.push({
                info: {
                    text: "Not applicable"
                },
                es_info: {
                    text: ""
                },
                pic: {
                    image: ""
                }
            });
            $.folderList.appendItems(versionsDataSet);
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;