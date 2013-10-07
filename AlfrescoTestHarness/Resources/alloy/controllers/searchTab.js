function Controller() {
    function searchButtonClick() {
        listingContext.initialiseWithMaxItemsAndSkipCount(5, skipCount);
        var searchTerm = "SELECT * FROM cmis:document WHERE cmis:name LIKE '%" + $.searchEdit.value + "%'";
        parentFolders = new Array();
        mainSection.deleteItemsAt(0, mainSection.getItems().length);
        if (null != Alloy.Globals.repositorySession) {
            Alloy.Globals.controllerNavigation($, documentFolderService, parentFolders, function(folder) {
                documentFolderService.setFolder(folder);
                documentFolderService.retrieveChildrenInFolder();
            }, function(document) {
                documentFolderService.saveDocument(document);
            });
            Alloy.Globals.modelListeners(searchService, mainSection);
            searchService.searchWithStatement(searchTerm);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "searchTab";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.searchWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        separatorColor: "white",
        navBarHidden: true,
        fullscreen: true,
        top: 0,
        left: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        id: "searchWindow"
    });
    $.__views.searchWindow && $.addTopLevelView($.__views.searchWindow);
    $.__views.searchEdit = Ti.UI.createTextField({
        value: "",
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        top: "2%",
        left: "2%",
        width: "96%",
        height: "40dp",
        id: "searchEdit"
    });
    $.__views.searchWindow.add($.__views.searchEdit);
    $.__views.searchButton = Ti.UI.createButton({
        style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        left: 0,
        top: 0,
        width: Ti.UI.FILL,
        height: "40dp",
        title: "Go",
        id: "searchButton"
    });
    $.__views.searchWindow.add($.__views.searchButton);
    searchButtonClick ? $.__views.searchButton.addEventListener("click", searchButtonClick) : __defers["$.__views.searchButton!click!searchButtonClick"] = true;
    $.__views.folderLabel = Ti.UI.createLabel({
        id: "folderLabel"
    });
    $.__views.searchWindow.add($.__views.folderLabel);
    var __alloyId36 = {};
    var __alloyId39 = [];
    var __alloyId40 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            bindId: "pic"
        }
    };
    __alloyId39.push(__alloyId40);
    var __alloyId41 = {
        type: "Ti.UI.Label",
        bindId: "info",
        properties: {
            color: "black",
            font: {
                fontFamily: "Arial",
                fontSize: "18dp",
                fontWeight: "bold"
            },
            left: "60dp",
            top: 0,
            bindId: "info"
        }
    };
    __alloyId39.push(__alloyId41);
    var __alloyId42 = {
        type: "Ti.UI.Label",
        bindId: "es_info",
        properties: {
            color: "gray",
            font: {
                fontFamily: "Arial",
                fontSize: "11dp"
            },
            left: "60dp",
            top: "25dp",
            bindId: "es_info"
        }
    };
    __alloyId39.push(__alloyId42);
    var __alloyId38 = {
        properties: {
            name: "repoTemplate"
        },
        childTemplates: __alloyId39
    };
    __alloyId36["repoTemplate"] = __alloyId38;
    var __alloyId43 = [];
    $.__views.mainSection = Ti.UI.createListSection({
        id: "mainSection"
    });
    __alloyId43.push($.__views.mainSection);
    $.__views.folderList = Ti.UI.createListView({
        top: 0,
        left: 0,
        sections: __alloyId43,
        templates: __alloyId36,
        id: "folderList",
        defaultItemTemplate: "repoTemplate"
    });
    $.__views.searchWindow.add($.__views.folderList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var mainSection = $.mainSection;
    var documentFolderService;
    var searchService;
    var listingContext;
    var parentFolders = new Array();
    var skipCount = 0;
    Ti.App.addEventListener("searchinit", function() {
        if (null != Alloy.Globals.repositorySession) {
            documentFolderService = Alloy.Globals.SDKModule.createDocumentFolderService();
            documentFolderService.initialiseWithSession(Alloy.Globals.repositorySession);
            searchService = Alloy.Globals.SDKModule.createSearchService();
            searchService.addEventListener("error", function(e) {
                alert(e.errorstring);
            });
            searchService.initialiseWithSession(Alloy.Globals.repositorySession);
            listingContext = Alloy.Globals.SDKModule.createListingContext();
        }
    });
    Ti.App.addEventListener("cleartabs", function() {
        parentFolders = new Array();
        mainSection.deleteItemsAt(0, mainSection.getItems().length);
    });
    __defers["$.__views.searchButton!click!searchButtonClick"] && $.__views.searchButton.addEventListener("click", searchButtonClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;