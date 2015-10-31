(function() {
    var collection = {
        s990_270: [
            { type: App.Sbn.BannerTypes.IFRAME, url: '//topface.com/reg-banner/' }
        ]
    };
    var places = {
        top: 's990_270'
        //bottom: 's728_90',
    };
    if (!Core.Data.get('image')) {
        places.left = 's240_400';
        places.right = 's240_400';
    }

    var mainLandingBannerConfig = {
        collection: collection,
        places: places
    };

    App.Sbn.setBannerConfig(mainLandingBannerConfig);
})();
