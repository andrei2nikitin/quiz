jQuery(function() {
    var nodeId = 'tf-banner';
    var iframe = document.createElement('iframe');
    iframe.frameBorder = 0;
    iframe.width = 990;
    iframe.height = 270;
    iframe.src = '//topface.com/reg-banner/';
    iframe.onload = function() {
        console.log('iframe load!');
    };
    document.getElementById(nodeId).appendChild(iframe);
});
