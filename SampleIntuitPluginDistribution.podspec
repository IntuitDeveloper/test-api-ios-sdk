Pod::Spec.new do |spec|
  spec.name         = "SampleIntuitPluginDistribution"
  spec.version      = "0.0.1"
  spec.summary      = "Local host for Intuit xcframework dependencies"

  spec.description  = "Use to distribute Intuit binaries to a third party app."
  spec.homepage     = "http://github.intuit.com/jfang1/SampleIntuitPluginDistribution"
  spec.license      = { :type => 'Proprietary' }

  spec.author             = { 'Intuit Mobile Mission Team' => '' }
  spec.platform     = :ios
  spec.swift_version = '5.0'
  spec.ios.deployment_target = '14.0'

  spec.source       = { :http => "https://github.com/IntuitDeveloper/test-api-ios-sdk/releases/download/v1-test/Frameworks.zip" }
  spec.ios.vendored_frameworks = 'Frameworks/AFMobileAuthenticationInterface.xcframework',
                                 'Frameworks/AFMobileContextInterface.xcframework',
                                 'Frameworks/IntuitPlugin.xcframework',
                                 'Frameworks/SampleIntuitPlugin.xcframework',
                                 'Frameworks/SampleIntuitWidget.xcframework'
  spec.preserve_paths = 'Frameworks/*.xcframework'
  
  spec.dependency 'GzipSwift'

end
