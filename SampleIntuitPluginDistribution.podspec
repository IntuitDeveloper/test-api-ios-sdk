Pod::Spec.new do |spec|
  spec.name         = "SampleIntuitPluginDistribution"
  spec.version      = "0.0.2"
  spec.summary      = "Local host for Intuit xcframework dependencies"

  spec.description  = "Use to distribute Intuit binaries to a third party app."
  spec.homepage     = "http://github.intuit.com/jfang1/SampleIntuitPluginDistribution"
  spec.license      = { :type => 'Proprietary' }

  spec.author             = { 'Intuit Mobile Mission Team' => '' }
  spec.platform     = :ios
  spec.swift_version = '5.0'
  spec.ios.deployment_target = '14.0'

  spec.source       = { :http => "https://github.com/IntuitDeveloper/test-api-ios-sdk/releases/download/v2-test/Frameworks.zip" }
  spec.ios.vendored_frameworks = 'Frameworks/AFMobileAuthenticationInterface.xcframework',
                                 'Frameworks/AFMobileContextInterface.xcframework',
                                 'Frameworks/AFMobileAnalyticsInterface.xcframework',
                                 'Frameworks/AFMobileAnalytics.xcframework',
                                 'Frameworks/AFMobileShellCore.xcframework',
                                 'Frameworks/AppShellWidgetInterface.xcframework',
                                 'Frameworks/IntuitPlugin.xcframework',
                                 'Frameworks/SampleIntuitPlugin.xcframework',
                                 'Frameworks/SampleIntuitWidget.xcframework',
                                 'Frameworks/AFMobileLoggingInterface.xcframework',
                                 'Frameworks/AFMobileABTestingInterface.xcframework',
                                 'Frameworks/AFMobileDeepLinkInterface.xcframework',
                                 'Frameworks/AFMobileIntuitDataLayerInterface.xcframework',
                                 'Frameworks/AFMobileNetworkInterface.xcframework',
                                 'Frameworks/AFMobilePerformanceInterface.xcframework',
                                 'Frameworks/AFMobilePubSubInterface.xcframework',
                                 'Frameworks/AFMobileSmartLookInterface.xcframework',
                                 'Frameworks/AFMobileSubscriptionInterface.xcframework',
                                 'Frameworks/EventCollectionStandard.xcframework',
                                 'Frameworks/BillingiOSInterface.xcframework',
                                 'Frameworks/MobileEventsControllerInterface.xcframework'
                                 
  spec.preserve_paths = 'Frameworks/*.xcframework'
  
  spec.dependency 'GzipSwift'
  spec.dependency 'Analytics', '~> 4.1'

end
