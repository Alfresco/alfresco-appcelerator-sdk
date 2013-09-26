alfresco-appcelerator-sdk
=========================

Private repo for hybrid mobile project work

Project structure:
------------------

AlfrescoUI  -  
The Titanium project to build a basic cross-platform app for Android and iOS (currently).
This is a basic Hello Repo example of calling the Android and iOS Modules to navigate the repo, using standard Titanium.

AlfrescoTestHarness -   
The Titanium 'Alloy' project to build a test harness UI for Android and iOS (currently).
This project utilises Alloy in order to refine the design (MVC architecture) and aid in the addition of future API tests.
It is intended that this project will contain tests / example calls for most of the Alfresco API's currently implemented.

iOSSDKModule -  
The iOS Alfresco SDK Proxy, for calling from Javascript.

AndroidSDKModule -  
The Android Alfresco SDK Proxy, for calling from Javascript.


Building:
---------

You will need to build this on an OS-X machine to get Android AND iOS builds.  Xcode and Android SDK are required, along with Appcelerator Titanium.

The Appcelerator modules must be built at the command line with 'build.py' and 'ant' accordingly. The resultant zips must then be copied into Titaniums library folder, and the 'AlfrescoUI' Titanium project should then pick them up while building.  Please see the following for setting up your build environment to build modules:

  iOS  -  https://wiki.appcelerator.org/display/guides/iOS+Module+Development+Guide
  Android  -  http://developer.appcelerator.com/doc/mobile/android/module_sdk


NB: The zip of the module gets unpacked into the /library folder (mac).  I have found that this can accumulate junk from previous builds, in particular old Jar versions from the Android Alfresco SDK import!  This can result in duplicate symbols for older libraries that still get included.  Make sure you remove this unpacked version if you ever need to re-build the Android Module with new libraries present.  When you re-copy the resultant zip, it will get unpacked automatically on next build inside Ti Studio.


