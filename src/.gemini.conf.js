module.exports = {
    rootUrl: 'http://localhost',
    browsers: {
        'chrome-big': {
            windowSize: '1811x1080',
            desiredCapabilities: {
                browserName: 'chrome'
            }
        },
        'chrome-medium': {
            windowSize: '1366x768',
            desiredCapabilities: {
                browserName: 'chrome'
            }
        },
        // 'chrome-emulate-iphone6': {
        //     desiredCapabilities: {
        //         browserName: 'chrome',
        //         calibrate: false,
        //         chromeOptions: {
        //             mobileEmulation: {
        //                 userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
        //                 deviceMetrics: {
        //                     width: 375,
        //                     height: 667,
        //                     pixelRatio: 2
        //                 }
        //             }
        //         }
        //     }
        // },
        // 'chrome-emulate-galaxys5': {
        //     desiredCapabilities: {
        //         browserName: 'chrome',
        //         chromeOptions: {
        //             mobileEmulation: {
        //                 deviceName: 'Nexus 6'
        //                 // userAgent: "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Mobile Safari/537.36",
        //                 // deviceMetrics: {
        //                 //     width: 360,
        //                 //     height: 640,
        //                     // pixelRatio: 3
        //                 // }
        //             }
        //         }
        //     }
        // },
        // PhantomJS: {
        //     gridUrl: 'http://localhost:4444',
        //     desiredCapabilities: {
        //         browserName: 'phantomjs'
        //     }
        // }
    }
};