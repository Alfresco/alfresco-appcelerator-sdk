# Alfresco Mobile Modules for Appcelerator

This source code repository contains the iOS and Android modules for [Appcelerator](http://www.appcelerator.com/), in particular [Titanium Studio](http://www.appcelerator.com/titanium/).

## Documentation

Both HTML and (Xcode) Docset versions of the auto-generated documentation can be downloaded from the [GitHub Releases](https://github.com/mikeh/alfresco-appcelerator-sdk/releases) area of this project.

More information about Alfresco's various Mobile offerings is on our [website](http://www.alfresco.com/products/mobile).

## Project structure

There are four projects within this repository. Two binary modules that you import into Appcelerator Titanium in order to access the Alfresco SDKs from your projects (`iOSSDKModule` and the `AndroidSDKModule`) and also two sample projects you can refer to to see how to call into the SDK modules (`AlfrescoUI` and `AlfrescoTestHarness`).

### AlfrescoUI
**Important**  When running this sample app on Android platforms, **Appcelerator Titanium v3.2.0** or newer must be used due to known issues with list view classes in v3.1.3 and earlier.

This is a basic "Hello Repo" example of calling the Android and iOS Modules to navigate an Alfresco repository, using standard Titanium.

### AlfrescoTestHarness
**Important**  When running this sample app on Android platforms, **Appcelerator Titanium v3.2.0** or newer must be used due to known issues with list view classes in v3.1.3 and earlier.

This project utilises the Alloy UI framework in order to refine the design (MVC architecture) and aid in the addition of future API tests.
It is intended that this project will contain tests / example calls for most of the Alfresco API's currently implemented.

### iOSSDKModule
The Alfresco Appcelerator Module for the iOS SDK, which allows the native iOS SDK to be used from JavaScript.

### AndroidSDKModule
The Alfresco Appcelerator Module for the Android SDK, which allows the native iOS SDK to be used from JavaScript.



## Building

You will need to build this on an OS-X machine to get Android AND iOS builds.  Xcode and Android SDK are required, along with Appcelerator Titanium.

The Appcelerator modules must be built at the command line with 'build.py' and 'ant' accordingly. The resultant zips must then be copied into Titaniums library folder, and the 'AlfrescoUI' Titanium project should then pick them up while building.  Please see the following for setting up your build environment to build modules:

  iOS  -  [iOS Module Development Guide](https://wiki.appcelerator.org/display/guides/iOS+Module+Development+Guide)<br />
  Android  -  [Android Module SDK](http://developer.appcelerator.com/doc/mobile/android/module_sdk)

*Note: The zip of the module gets unpacked into the /library folder (mac). I have found that this can accumulate junk from previous builds, in particular old Jar versions from the Android Alfresco SDK import. This can result in duplicate symbols for older libraries that still get included. Make sure you remove this unpacked version if you ever need to re-build the Android Module with new libraries present. When you re-copy the resultant zip, it will get unpacked automatically on next build inside Titanium Studio.*

### Licence Validation

You may receive an error from the TiVerify component within Titanium, just after the line

    TiVerify: (Timer-0) [3891,4995] Verifying module licenses...

The error may state that a *Licence violation* has been detected. If you encounter this error you need to navigate to the Appcelerator Product Market and ensure you have downloaded the Alfresco modules (i.e. you are subscribed to them).
- [Alfresco for iOS](https://marketplace.appcelerator.com/apps/7620#!overview) market page
- [Alfresco for Android](https://marketplace.appcelerator.com/apps/7621#!overview) market page

