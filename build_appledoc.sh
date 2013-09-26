#!/bin/bash

# remove previous generated documentation
if [ -d AlfrescoAppceleratorSDKHelp ]; then
  rm -R AlfrescoAppceleratorSDKHelp
fi

# create directory
mkdir AlfrescoAppceleratorSDKHelp

# Build documentation if appledoc is installed
if type -p appledoc &>/dev/null; then
    appledoc --project-name AlfrescoAppceleratorSDK --project-company "Alfresco" --company-id com.alfresco --output AlfrescoAppceleratorSDKHelp --keep-intermediate-files --exit-threshold 2 --ignore .m iOSSDKModule/Classes
else
    echo "appledoc executable can not be found, you can find installation instructions at https://github.com/tomaz/appledoc"
fi
