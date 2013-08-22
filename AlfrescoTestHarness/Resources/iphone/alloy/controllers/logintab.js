function Controller() {
    function loginButtonClick() {
        var svr = $.serverEdit.value;
        var user = $.usernameEdit.value;
        var pwd = $.passwordEdit.value;
        0 == svr.length || 0 == user.length ? alert("Please enter values for all fields") : connect(svr, user, pwd);
    }
    function propsButtonChange() {
        Alloy.Globals.showProperties = $.propsButton.value;
    }
    function connect(serverUrl, serverUsername, serverPassword) {
        var repositorySession = Alloy.Globals.SDKModule.createRepositorySession({
            serverUrl: serverUrl,
            serverUsername: serverUsername,
            serverPassword: serverPassword
        });
        repositorySession.connect();
        repositorySession.addEventListener("paramerror", function(e) {
            Ti.API.info("Param error code: " + e.errorcode);
            return 0;
        });
        repositorySession.addEventListener("error", function(e) {
            alert("Cannot connect to server (" + e.errorcode + "): " + e.errorstring);
            return 0;
        });
        repositorySession.addEventListener("success", function(e) {
            Alloy.Globals.repositorySession = repositorySession;
            Ti.API.info("Connected to server: " + e.servername);
            Ti.App.fireEvent("cleartabs");
            Alloy.Globals.tabGroup.setActiveTab(1);
            return 1;
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "loginTab";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.loginWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        separatorColor: "white",
        navBarHidden: true,
        id: "loginWindow"
    });
    $.__views.loginWindow && $.addTopLevelView($.__views.loginWindow);
    $.__views.__alloyId24 = Ti.UI.createTableViewSection({
        id: "__alloyId24"
    });
    var __alloyId25 = [];
    __alloyId25.push($.__views.__alloyId24);
    $.__views.__alloyId26 = Ti.UI.createTableViewRow({
        id: "__alloyId26"
    });
    $.__views.__alloyId24.add($.__views.__alloyId26);
    $.__views.logoWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        separatorColor: "white",
        navBarHidden: true,
        width: "80%",
        height: Ti.UI.SIZE,
        id: "logoWindow"
    });
    $.__views.__alloyId26.add($.__views.logoWindow);
    $.__views.logoImage = Ti.UI.createImageView({
        left: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        image: "alfresco_logo_large.png",
        id: "logoImage"
    });
    $.__views.logoWindow.add($.__views.logoImage);
    $.__views.__alloyId27 = Ti.UI.createTableViewRow({
        id: "__alloyId27"
    });
    $.__views.__alloyId24.add($.__views.__alloyId27);
    $.__views.serverWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        separatorColor: "white",
        navBarHidden: true,
        height: Ti.UI.SIZE,
        id: "serverWindow"
    });
    $.__views.__alloyId27.add($.__views.serverWindow);
    $.__views.serverLabel = Ti.UI.createLabel({
        text: "Server address:",
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        top: 0,
        left: 0,
        width: Ti.UI.FILL,
        height: "40dp",
        id: "serverLabel"
    });
    $.__views.serverWindow.add($.__views.serverLabel);
    $.__views.serverEdit = Ti.UI.createTextField({
        value: "",
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        top: "40dp",
        left: 0,
        width: Ti.UI.FILL,
        height: "40dp",
        id: "serverEdit"
    });
    $.__views.serverWindow.add($.__views.serverEdit);
    $.__views.__alloyId28 = Ti.UI.createTableViewRow({
        id: "__alloyId28"
    });
    $.__views.__alloyId24.add($.__views.__alloyId28);
    $.__views.usernameWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        separatorColor: "white",
        navBarHidden: true,
        height: Ti.UI.SIZE,
        id: "usernameWindow"
    });
    $.__views.__alloyId28.add($.__views.usernameWindow);
    $.__views.usernameLabel = Ti.UI.createLabel({
        text: "User name:",
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        top: 0,
        left: 0,
        width: Ti.UI.FILL,
        height: "40dp",
        id: "usernameLabel"
    });
    $.__views.usernameWindow.add($.__views.usernameLabel);
    $.__views.usernameEdit = Ti.UI.createTextField({
        value: "admin",
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        top: "40dp",
        left: 0,
        width: Ti.UI.FILL,
        height: "40dp",
        id: "usernameEdit"
    });
    $.__views.usernameWindow.add($.__views.usernameEdit);
    $.__views.__alloyId29 = Ti.UI.createTableViewRow({
        id: "__alloyId29"
    });
    $.__views.__alloyId24.add($.__views.__alloyId29);
    $.__views.passwordWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        separatorColor: "white",
        navBarHidden: true,
        height: Ti.UI.SIZE,
        id: "passwordWindow"
    });
    $.__views.__alloyId29.add($.__views.passwordWindow);
    $.__views.passwordLabel = Ti.UI.createLabel({
        text: "Password:",
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        top: 0,
        left: 0,
        width: Ti.UI.FILL,
        height: "40dp",
        id: "passwordLabel"
    });
    $.__views.passwordWindow.add($.__views.passwordLabel);
    $.__views.passwordEdit = Ti.UI.createTextField({
        value: "password",
        passwordMask: true,
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        top: "40dp",
        left: 0,
        width: Ti.UI.FILL,
        height: "40dp",
        id: "passwordEdit"
    });
    $.__views.passwordWindow.add($.__views.passwordEdit);
    $.__views.__alloyId30 = Ti.UI.createTableViewRow({
        id: "__alloyId30"
    });
    $.__views.__alloyId24.add($.__views.__alloyId30);
    $.__views.buttonWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        separatorColor: "white",
        navBarHidden: true,
        id: "buttonWindow"
    });
    $.__views.__alloyId30.add($.__views.buttonWindow);
    $.__views.loginButton = Ti.UI.createButton({
        style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        left: 0,
        top: 50,
        width: Ti.UI.SIZE,
        title: "Log in",
        id: "loginButton"
    });
    $.__views.buttonWindow.add($.__views.loginButton);
    loginButtonClick ? $.__views.loginButton.addEventListener("click", loginButtonClick) : __defers["$.__views.loginButton!click!loginButtonClick"] = true;
    $.__views.propsButton = Ti.UI.createSwitch({
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        left: 200,
        top: 50,
        width: Ti.UI.SIZE,
        text: "Show properties",
        titleOn: "Properties Enabled",
        titleOff: "Properties Disabled",
        value: false,
        id: "propsButton"
    });
    $.__views.buttonWindow.add($.__views.propsButton);
    propsButtonChange ? $.__views.propsButton.addEventListener("change", propsButtonChange) : __defers["$.__views.propsButton!change!propsButtonChange"] = true;
    $.__views.loginTable = Ti.UI.createTableView({
        top: "2%",
        left: "2%",
        width: "96%",
        height: "96%",
        backgroundColor: "white",
        separatorColor: "white",
        data: __alloyId25,
        id: "loginTable"
    });
    $.__views.loginWindow.add($.__views.loginTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.serverEdit.value = "google_sdk" == Titanium.Platform.model || "Simulator" == Titanium.Platform.model ? "http://localhost:8080/alfresco" : "http://10.244.51.57:8080/alfresco";
    __defers["$.__views.loginButton!click!loginButtonClick"] && $.__views.loginButton.addEventListener("click", loginButtonClick);
    __defers["$.__views.propsButton!change!propsButtonChange"] && $.__views.propsButton.addEventListener("change", propsButtonChange);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;