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
        id: "searchWindow"
    });
    $.__views.searchWindow && $.addTopLevelView($.__views.searchWindow);
    $.__views.__alloyId52 = Ti.UI.createTableViewSection({
        id: "__alloyId52"
    });
    var __alloyId53 = [];
    __alloyId53.push($.__views.__alloyId52);
    $.__views.__alloyId54 = Ti.UI.createTableViewRow({
        id: "__alloyId54"
    });
    $.__views.__alloyId52.add($.__views.__alloyId54);
    $.__views.searchBarWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        separatorColor: "white",
        navBarHidden: true,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "searchBarWindow"
    });
    $.__views.__alloyId54.add($.__views.searchBarWindow);
    $.__views.searchEdit = Ti.UI.createTextField({
        value: "",
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        top: 0,
        left: 0,
        width: "80%",
        height: "40dp",
        id: "searchEdit"
    });
    $.__views.searchBarWindow.add($.__views.searchEdit);
    $.__views.searchButton = Ti.UI.createButton({
        style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        left: "85%",
        top: 0,
        width: "15%",
        height: "40dp",
        title: "Go",
        id: "searchButton"
    });
    $.__views.searchBarWindow.add($.__views.searchButton);
    searchButtonClick ? $.__views.searchButton.addEventListener("click", searchButtonClick) : __defers["$.__views.searchButton!click!searchButtonClick"] = true;
    $.__views.__alloyId55 = Ti.UI.createTableViewRow({
        id: "__alloyId55"
    });
    $.__views.__alloyId52.add($.__views.__alloyId55);
    $.__views.resultsWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        separatorColor: "white",
        navBarHidden: true,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "resultsWindow"
    });
    $.__views.__alloyId55.add($.__views.resultsWindow);
    $.__views.folderLabel = Ti.UI.createLabel({
        id: "folderLabel"
    });
    $.__views.resultsWindow.add($.__views.folderLabel);
    var __alloyId56 = {};
    var __alloyId59 = [];
    var __alloyId60 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "35dp",
            height: "35dp",
            left: 5,
            bindId: "pic"
        }
    };
    __alloyId59.push(__alloyId60);
    var __alloyId61 = {
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
    __alloyId59.push(__alloyId61);
    var __alloyId62 = {
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
    __alloyId59.push(__alloyId62);
    var __alloyId58 = {
        properties: {
            name: "repoTemplate"
        },
        childTemplates: __alloyId59
    };
    __alloyId56["repoTemplate"] = __alloyId58;
    var __alloyId63 = [];
    $.__views.mainSection = Ti.UI.createListSection({
        id: "mainSection"
    });
    __alloyId63.push($.__views.mainSection);
    $.__views.folderList = Ti.UI.createListView({
        top: 0,
        left: 0,
        sections: __alloyId63,
        templates: __alloyId56,
        id: "folderList",
        defaultItemTemplate: "repoTemplate"
    });
    $.__views.resultsWindow.add($.__views.folderList);
    $.__views.searchTable = Ti.UI.createTableView({
        top: "2%",
        left: "2%",
        width: "96%",
        height: "96%",
        backgroundColor: "white",
        separatorColor: "white",
        data: __alloyId53,
        id: "searchTable"
    });
    $.__views.searchWindow.add($.__views.searchTable);
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