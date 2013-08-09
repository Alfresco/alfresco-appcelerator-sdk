var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.createServiceListeners = function(service, mainSection) {
    service.addEventListener("documentnode", function(e) {
        Ti.API.info("DOCUMENT: name = " + e.name + ", title = " + e.title + ", summary = " + e.summary + ", MIME type = " + e.contentMimeType);
        var icon = "mime_txt.png";
        -1 !== e.contentMimeType.indexOf("text/") ? icon = -1 !== e.contentMimeType.indexOf("/plain") ? "mime_txt.png" : "mime_doc.png" : -1 !== e.contentMimeType.indexOf("application/") ? -1 !== e.contentMimeType.indexOf("/msword") || -1 !== e.contentMimeType.indexOf("/vnd.openxmlformats-officedocument.wordprocessingml") ? icon = "mime_doc.png" : -1 !== e.contentMimeType.indexOf("/vnd.openxmlformats-officedocument.spreadsheetml") : -1 !== e.contentMimeType.indexOf("image/") && (icon = "mime_img.png");
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
                image: icon
            },
            properties: {
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
        Ti.Android.currentActivity.startActivity(Ti.Android.createIntent({
            action: Ti.Android.ACTION_VIEW,
            type: contentFile.getMIMEType(),
            data: newFile.getNativePath()
        }));
    });
    service.addEventListener("progresseddocument", function(e) {
        e.bytes;
        e.total;
    });
    service.addEventListener("error", function(e) {
        alert("Operation failed (" + e.errorcode + "): " + e.errorstring);
    });
};

Alloy.createController("index");