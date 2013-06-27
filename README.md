alfresco-appcelerator-sdk
=========================

Private repo for hybrid mobile project work

Project structure:
------------------

AlfrescoUI  -  
The Titanium project to build a cross-platform app for Android and iOS (currently).
This is a basic Hello Repo example of calling the Android and iOS Modules to navigate the repo.

iOSSDKModule -  
The iOS Alfresco SDK Proxy, for calling from Javascript.

AndroidSDKModule -  
The Android Alfresco SDK Proxy, for calling from Javascript.


Building:
---------

You will need to build this on an OS-X machine to get Android AND iOS builds.  Xcode and Android SDK are required, along with Appcelerator Titanium.

The Appcelerator modules must be built at the command line with 'build.py' and 'ant' accordingly. The resultant zips must then be copied into Titaniums library folder, and the 'AlfrescoUI' Titanium project should then pick them up while building.  Please see Appcelerators online documentation for information on building Modules.
