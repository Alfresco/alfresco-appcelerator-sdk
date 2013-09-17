var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.modelListeners = function(service, mainSection) {
    service.addEventListener("documentnode", function(e) {
        var doc = e.document;
        Ti.API.info("DOCUMENT: name = " + doc.name + ", title = " + doc.title + ", summary = " + doc.summary + ", MIME type = " + doc.contentMimeType);
        var icon = "mime_txt.png";
        null != doc.contentMimeType && (-1 !== doc.contentMimeType.indexOf("text/") ? icon = -1 !== doc.contentMimeType.indexOf("/plain") ? "mime_txt.png" : "mime_doc.png" : -1 !== doc.contentMimeType.indexOf("application/") ? -1 !== doc.contentMimeType.indexOf("/msword") || -1 !== doc.contentMimeType.indexOf("/vnd.openxmlformats-officedocument.wordprocessingml") ? icon = "mime_doc.png" : -1 !== doc.contentMimeType.indexOf("/vnd.openxmlformats-officedocument.spreadsheetml") : -1 !== doc.contentMimeType.indexOf("image/") && (icon = "mime_img.png"));
        var modified = new String() + doc.modifiedAt;
        modified = modified.substr(0, 21);
        var truncText = doc.name;
        var len = truncText.length;
        len > 22 && (truncText = doc.name.substr(0, 22) + "...");
        var mainDataSet = [];
        var data = {
            info: {
                text: truncText
            },
            es_info: {
                text: modified
            },
            pic: {
                image: icon
            },
            properties: {
                data: doc,
                folder: 0,
                name: doc.name,
                docobject: doc
            }
        };
        mainDataSet.push(data);
        mainSection.appendItems(mainDataSet);
    });
    service.addEventListener("foldernode", function(e) {
        var folder = e.folder;
        var folderName = folder.getName();
        Ti.API.info("FOLDER: name = " + folder.name + ", title = " + folder.title + ", summary = " + folder.summary + ". Folder name from object: " + folderName);
        var modified = new String() + folder.modifiedAt;
        modified = modified.substr(0, 21);
        var mainDataSet = [];
        var data = {
            info: {
                text: folder.name
            },
            es_info: {
                text: modified
            },
            pic: {
                image: "folder@2x.png"
            },
            properties: {
                data: folder,
                folder: 1,
                name: folder.name,
                folderobject: folder
            }
        };
        mainDataSet.push(data);
        mainSection.appendItems(mainDataSet);
    });
    service.addEventListener("retrieveddocument", function(e) {
        var contentFile = e.contentfile;
        Ti.UI.iOS.createDocumentViewer({
            url: contentFile.getPath()
        }).show();
    });
    service.addEventListener("progresseddocument", function(e) {
        e.bytes;
        e.total;
    });
    service.addEventListener("error", function(e) {
        alert("Operation failed (" + e.errorcode + "): " + e.errorstring);
    });
};

Alloy.Globals.sitesModelListener = function(service, section, sitetype) {
    service.addEventListener(sitetype, function(e) {
        var site = e.site;
        Ti.API.info(sitetype.toUpperCase() + ": name = " + site.shortName + ", title = " + site.title + ", summary = " + site.summary);
        var mainDataSet = [];
        var data = {
            info: {
                text: site.shortName
            },
            es_info: {
                text: site.title
            },
            pic: {
                image: "folder@2x.png"
            },
            properties: {
                data: site,
                name: site.shortName,
                siteObject: site
            }
        };
        mainDataSet.push(data);
        section.appendItems(mainDataSet);
    });
};

Alloy.Globals.activitiesModelListener = function(service, section) {
    service.addEventListener("activitynode", function(e) {
        var activity = e.activity;
        var title = activity.type;
        var siteName = activity.siteShortName;
        0 == siteName.length && (name = "No site name present in this field");
        Ti.API.info("ACTIVITY: title = " + title + ", type = " + activity.type + ", created by = " + activity.createdBy);
        var creationDate = new String() + activity.createdAt;
        creationDate = creationDate.substr(0, 21);
        var mainDataSet = [];
        var data = {
            info: {
                text: title
            },
            es_info: {
                text: creationDate + " by " + activity.createdBy
            },
            pic: {
                image: "default_entry_icon.png"
            },
            properties: {
                data: activity.data,
                title: title,
                siteShortName: siteName,
                identifier: activity.identifier,
                createdAt: activity.createdAt,
                createdBy: activity.createdBy,
                type: activity.type
            }
        };
        mainDataSet.push(data);
        section.appendItems(mainDataSet);
    });
};

Alloy.Globals.controllerNavigation = function(view, service, parentFolders, onFolder, onDocument) {
    service.addEventListener("retrievedpermissions", function(e) {
        Alloy.Globals.recursePropertiesAndAlert("Permissions", e.permissions);
    });
    view.folderList.addEventListener("itemclick", function(e) {
        var mainSection = e.section;
        var item = e.section.getItemAt(e.itemIndex);
        item.properties.name;
        if (item.properties.folder > 0) {
            var folder;
            if (2 == item.properties.folder) folder = parentFolders.pop(); else {
                Alloy.Globals.recursePropertiesAndAlert("Folder properties", item.properties.data);
                service.retrievePermissionsOfNode(item.properties.folderobject);
                Alloy.Globals.retrieveCommentsAndAlert(item.properties.folderobject);
                parentFolders.push(service.getCurrentFolder());
                folder = item.properties.folderobject;
            }
            mainSection.deleteItemsAt(0, mainSection.getItems().length);
            if (parentFolders.length > 0) {
                var mainDataSet = [];
                var data = {
                    info: {
                        text: "Back"
                    },
                    es_info: {
                        text: "Previous folder"
                    },
                    pic: {
                        image: "wm_back.png"
                    },
                    properties: {
                        folder: 2,
                        name: null,
                        folderobject: null
                    }
                };
                mainDataSet.push(data);
                mainSection.appendItems(mainDataSet);
            }
            view.folderLabel.text = " " + folder.getName();
            onFolder(folder);
        } else {
            Alloy.Globals.recursePropertiesAndAlert("Document properties", item.properties.docobject);
            service.retrievePermissionsOfNode(item.properties.docobject);
            Alloy.Globals.retrieveCommentsAndAlert(item.properties.docobject);
            onDocument(item.properties.docobject);
        }
    });
};

Alloy.Globals.recursePropertiesAndAlert = function recurseProperties(title, properties) {
    if (Alloy.Globals.showProperties) {
        var alertString = title + ":\r\n\r\n";
        Alloy.Globals.recurseProperties(properties, "", function(name, value) {
            alertString += name + " = " + value + "\r\n\r\n";
        });
        alert(alertString);
    }
};

Alloy.Globals.recurseProperties = function recurseProperties(properties, propertiesName, callForEachProperty) {
    for (var propertyName in properties) {
        var propertyValue = properties[propertyName];
        if (null != propertyValue && propertyValue.constructor == Object) recurseProperties(propertyValue, propertyName, callForEachProperty); else {
            var valueAsString = new String();
            valueAsString += propertyValue;
            if (propertyName.toUpperCase().indexOf("BUBBLE") >= 0) continue;
            var subName;
            subName = propertiesName.length > 0 ? propertiesName + "." + propertyName : propertyName;
            callForEachProperty(subName, propertyValue);
        }
    }
};

Alloy.Globals.retrieveCommentsAndAlert = function(docobject) {
    if (Alloy.Globals.showProperties) {
        var commentService = Alloy.Globals.SDKModule.createCommentService();
        commentService.initWithSession(Alloy.Globals.repositorySession);
        commentService.retrieveCommentsForNode(docobject);
        commentService.addEventListener("commentnode", function(e) {
            Alloy.Globals.recursePropertiesAndAlert("Comment", e.comment);
        });
    }
};

Alloy.createController("index");