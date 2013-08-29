var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.modelListeners = function(service, mainSection) {
    service.addEventListener("documentnode", function(e) {
        Ti.API.info("DOCUMENT: name = " + e.name + ", title = " + e.title + ", summary = " + e.summary + ", MIME type = " + e.contentMimeType);
        var icon = "mime_txt.png";
        null != e.contentMimeType && (-1 !== e.contentMimeType.indexOf("text/") ? icon = -1 !== e.contentMimeType.indexOf("/plain") ? "mime_txt.png" : "mime_doc.png" : -1 !== e.contentMimeType.indexOf("application/") ? -1 !== e.contentMimeType.indexOf("/msword") || -1 !== e.contentMimeType.indexOf("/vnd.openxmlformats-officedocument.wordprocessingml") ? icon = "mime_doc.png" : -1 !== e.contentMimeType.indexOf("/vnd.openxmlformats-officedocument.spreadsheetml") : -1 !== e.contentMimeType.indexOf("image/") && (icon = "mime_img.png"));
        var modified = new String() + e.modifiedAt;
        modified = modified.substr(0, 21);
        var truncText = e.name;
        var len = truncText.length;
        len > 22 && (truncText = e.name.substr(0, 22) + "...");
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
                data: e,
                folder: 0,
                name: e.name,
                docobject: e.document
            }
        };
        mainDataSet.push(data);
        mainSection.appendItems(mainDataSet);
    });
    service.addEventListener("foldernode", function(e) {
        var folder = e.folder;
        var folderName = folder.getFolderName();
        Ti.API.info("FOLDER: name = " + e.name + ", title = " + e.title + ", summary = " + e.summary + ". Folder name from object: " + folderName);
        var modified = new String() + e.modifiedAt;
        modified = modified.substr(0, 21);
        var mainDataSet = [];
        var data = {
            info: {
                text: e.name
            },
            es_info: {
                text: modified
            },
            pic: {
                image: "folder@2x.png"
            },
            properties: {
                data: e,
                folder: 1,
                name: e.name,
                folderobject: e.folder
            }
        };
        mainDataSet.push(data);
        mainSection.appendItems(mainDataSet);
    });
    service.addEventListener("retrieveddocument", function(e) {
        var contentFile = e.contentfile;
        var file = Ti.Filesystem.getFile("file:/" + contentFile.getPath());
        var newFile = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, contentFile.getName());
        newFile.write(file.read());
        file.deleteFile();
        require("es.smartaccess.documentviewer");
        var documentViewerProxy = require("es.smartaccess.documentviewer");
        documentViewer = documentViewerProxy.createDocumentViewer({
            url: newFile.getNativePath()
        });
        documentViewer.show();
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
        Ti.API.info(sitetype.toUpperCase() + ": name = " + e.shortName + ", title = " + e.title + ", summary = " + e.summary);
        var mainDataSet = [];
        var data = {
            info: {
                text: e.shortName
            },
            es_info: {
                text: e.title
            },
            pic: {
                image: "folder@2x.png"
            },
            properties: {
                data: e,
                name: e.shortName,
                siteObject: e.site
            }
        };
        mainDataSet.push(data);
        section.appendItems(mainDataSet);
    });
};

Alloy.Globals.activitiesModelListener = function(service, section, sitetype) {
    service.addEventListener(sitetype, function(e) {
        var title = e.data.title;
        var siteName = e.siteShortName;
        0 == siteName.length && (name = "No site name present in this field");
        Ti.API.info(sitetype.toUpperCase() + ": title = " + title + ", type = " + e.type + ", created by = " + e.createdBy);
        var creationDate = new String() + e.createdAt;
        creationDate = creationDate.substr(0, 21);
        var mainDataSet = [];
        var data = {
            info: {
                text: title
            },
            es_info: {
                text: creationDate + " by " + e.createdBy
            },
            pic: {
                image: "default_entry_icon.png"
            },
            properties: {
                data: e.data,
                title: title,
                siteShortName: siteName,
                identifier: e.identifier,
                createdAt: e.createdAt,
                createdBy: e.createdBy,
                type: e.type
            }
        };
        mainDataSet.push(data);
        section.appendItems(mainDataSet);
    });
};

Alloy.Globals.controllerNavigation = function(view, service, parentFolders, onFolder, onDocument) {
    view.folderList.addEventListener("itemclick", function(e) {
        var mainSection = e.section;
        var item = e.section.getItemAt(e.itemIndex);
        item.properties.name;
        if (item.properties.folder > 0) {
            var folder;
            if (2 == item.properties.folder) folder = parentFolders.pop(); else {
                Alloy.Globals.recursePropertiesAndAlert(item.properties.data);
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
            view.folderLabel.text = " " + folder.getFolderName();
            onFolder(folder);
        } else {
            Alloy.Globals.recursePropertiesAndAlert(item.properties.data);
            onDocument(item.properties.docobject);
        }
    });
};

Alloy.Globals.recursePropertiesAndAlert = function recurseProperties(properties) {
    if (Alloy.Globals.showProperties) {
        var alertString = "";
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
            if (valueAsString.indexOf("ComAlfresco") >= 0 || propertyName.toUpperCase().indexOf("BUBBLE") >= 0) continue;
            var subName;
            subName = propertiesName.length > 0 ? propertiesName + "." + propertyName : propertyName;
            callForEachProperty(subName, propertyValue);
        }
    }
};

Alloy.createController("index");