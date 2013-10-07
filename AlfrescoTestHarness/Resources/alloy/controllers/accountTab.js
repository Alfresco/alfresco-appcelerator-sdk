function Controller() {
    function loginButtonClick() {
        var svr = $.serverEdit.value;
        var user = $.usernameEdit.value;
        var pwd = $.passwordEdit.value;
        0 == svr.length || 0 == user.length ? alert("Please enter values for all fields") : connect(svr, user, pwd);
    }
    function connect(serverUrl, serverUsername, serverPassword) {
        var repositorySession = Alloy.Globals.SDKModule.createRepositorySession({
            serverUrl: serverUrl,
            serverUsername: serverUsername,
            serverPassword: serverPassword
        });
        repositorySession.connect();
        repositorySession.addEventListener("error", function(e) {
            alert("Cannot connect to server (" + e.errorcode + "): " + e.errorstring);
            return 0;
        });
        repositorySession.addEventListener("success", function(e) {
            Alloy.Globals.repositorySession = repositorySession;
            Ti.API.info("Connected to server: " + e.servername);
            Alloy.Globals.tabGroup.setActiveTab(1);
            $.loginButton.enabled = false;
            return 1;
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "accountTab";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.loginContent = Ti.UI.createWindow({
        backgroundColor: "white",
        separatorColor: "white",
        navBarHidden: true,
        fullscreen: true,
        top: 0,
        left: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "loginContent"
    });
    $.__views.loginContent && $.addTopLevelView($.__views.loginContent);
    $.__views.scroller = Ti.UI.createScrollView({
        layout: "vertical",
        top: 0,
        left: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "scroller"
    });
    $.__views.loginContent.add($.__views.scroller);
    $.__views.logoImage = Ti.UI.createImageView({
        top: 0,
        left: "2%",
        width: "80%",
        height: Ti.UI.SIZE,
        image: "alfresco_logo_large.png",
        id: "logoImage"
    });
    $.__views.scroller.add($.__views.logoImage);
    $.__views.serverLabel = Ti.UI.createLabel({
        text: "Server address:",
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        top: 0,
        left: "2%",
        width: "96%",
        height: "40dp",
        id: "serverLabel"
    });
    $.__views.scroller.add($.__views.serverLabel);
    $.__views.serverEdit = Ti.UI.createTextField({
        value: "",
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        top: 0,
        left: "2%",
        width: "96%",
        height: "40dp",
        id: "serverEdit"
    });
    $.__views.scroller.add($.__views.serverEdit);
    $.__views.usernameLabel = Ti.UI.createLabel({
        text: "User name:",
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        top: 20,
        left: "2%",
        width: "96%",
        height: "40dp",
        id: "usernameLabel"
    });
    $.__views.scroller.add($.__views.usernameLabel);
    $.__views.usernameEdit = Ti.UI.createTextField({
        value: "admin",
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#336699",
        top: 0,
        left: "2%",
        width: "96%",
        height: "40dp",
        id: "usernameEdit"
    });
    $.__views.scroller.add($.__views.usernameEdit);
    $.__views.passwordLabel = Ti.UI.createLabel({
        text: "Password:",
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        top: 20,
        left: "2%",
        width: "96%",
        height: "40dp",
        id: "passwordLabel"
    });
    $.__views.scroller.add($.__views.passwordLabel);
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
        top: 0,
        left: "2%",
        width: "96%",
        height: "40dp",
        id: "passwordEdit"
    });
    $.__views.scroller.add($.__views.passwordEdit);
    $.__views.loginButton = Ti.UI.createButton({
        style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        top: 40,
        left: "2%",
        width: "96%",
        title: "Log in",
        id: "loginButton"
    });
    $.__views.scroller.add($.__views.loginButton);
    loginButtonClick ? $.__views.loginButton.addEventListener("click", loginButtonClick) : __defers["$.__views.loginButton!click!loginButtonClick"] = true;
    $.__views.loginButton = Ti.UI.createButton({
        style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        top: 40,
        left: "2%",
        width: "96%",
        title: "Log in",
        id: "loginButton"
    });
    $.__views.scroller.add($.__views.loginButton);
    loginButtonClick ? $.__views.loginButton.addEventListener("click", loginButtonClick) : __defers["$.__views.loginButton!click!loginButtonClick"] = true;
    $.__views.loginButton = Ti.UI.createButton({
        style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        top: 40,
        left: "2%",
        width: "96%",
        title: "Log in",
        id: "loginButton"
    });
    $.__views.scroller.add($.__views.loginButton);
    loginButtonClick ? $.__views.loginButton.addEventListener("click", loginButtonClick) : __defers["$.__views.loginButton!click!loginButtonClick"] = true;
    $.__views.loginButton = Ti.UI.createButton({
        style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
        font: {
            fontFamily: "Arial",
            fontSize: "18dp",
            fontWeight: "bold"
        },
        top: 40,
        left: "2%",
        width: "96%",
        title: "Log in",
        id: "loginButton"
    });
    $.__views.scroller.add($.__views.loginButton);
    loginButtonClick ? $.__views.loginButton.addEventListener("click", loginButtonClick) : __defers["$.__views.loginButton!click!loginButtonClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.serverEdit.value = "google_sdk" == Titanium.Platform.model || "Simulator" == Titanium.Platform.model ? "http://localhost:8080/alfresco" : "http://192.168.1.91:8080/alfresco";
    __defers["$.__views.loginButton!click!loginButtonClick"] && $.__views.loginButton.addEventListener("click", loginButtonClick);
    __defers["$.__views.loginButton!click!loginButtonClick"] && $.__views.loginButton.addEventListener("click", loginButtonClick);
    __defers["$.__views.loginButton!click!loginButtonClick"] && $.__views.loginButton.addEventListener("click", loginButtonClick);
    __defers["$.__views.loginButton!click!loginButtonClick"] && $.__views.loginButton.addEventListener("click", loginButtonClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;