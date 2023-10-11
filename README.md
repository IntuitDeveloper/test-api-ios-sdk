# test-api-ios-sdk

This is a test repo to host binaries for a sample IntuitPlugin sdk and its dependencies. All of the binaries are stored in the Frameworks folder as xcframeworks. This repo is used to test pulling down Intuit dependency binaries hosted externally (public git repo) into a third party sample app.

## Steps for a third party app to get the sample IntuitPlugin sdk

Referring to this sample [third party app](https://github.intuit.com/jfang1/ThirdPartyApp), a third party developer would use the pod `SampleIntuitPluginDistribution` in their Podfile:

```ruby
  # Pods for ThirdPartyApp
  pod 'SampleIntuitPluginDistribution', :git => 'https://github.com/IntuitDeveloper/test-api-ios-sdk.git'
```

~*Currently we are using git to source the podspec as a POC.*~

When the developer does a `pod install`, the xcframeworks will be downloaded from this zipped source:

```ruby
:http => "https://github.com/IntuitDeveloper/test-api-ios-sdk/releases/download/v1-test/Frameworks.zip"
```

The [v1-test](https://github.com/IntuitDeveloper/test-api-ios-sdk/releases/tag/v1-test) tag/release is used to hold the versions of the binaries and allow the podspec to grab the specific Frameworks zip.

~*Note: In the future, each release should document which versions of each dependency binary are packaged so third party developers are aware of the state of the source code in the framework.*~