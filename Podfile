# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target 'Concrete' do
  # Uncomment the next line if you're using Swift or would like to use dynamic frameworks
  # use_frameworks!

  # Pods for Concrete


  psod 'RNGestureHandler', :path => '../node_modules/react-native-gesture-handler'
  pod 'FacebookSDK'
  pod 'React', :path => '../node_modules/react-native', :subspecs => [
    'Core',
    'CxxBridge',
    'DevSupport',
    # the following ones are the ones taken from "Libraries" in Xcode:
    'RCTAnimation',
    'RCTActionSheet',
    'RCTBlob',
    'RCTGeolocation',
    'RCTImage',
    'RCTLinkingIOS',
    'RCTNetwork',
    'RCTSettings',
    'RCTText',
    'RCTVibration',
    'RCTWebSocket'
  ]
  pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'
  pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
  pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'
  pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/GLog.podspec'

  # pod 'react-native-fbsdk', :path => '../node_modules/react-native-fbsdk'
  pod 'react-native-fast-image', :path => '../node_modules/react-native-fast-image'


  post_install do |installer_representation|
    installer_representation.pods_project.targets.each do |target|
        if target.name == "React"
            target.remove_from_project
        end
    end
  end
end
