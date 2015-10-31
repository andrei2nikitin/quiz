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

(function () {
    jQuery(function () {
        jQuery('.js-answer').click(function (e) {
            var $target = jQuery(e.target),
                $puzzle = $target.closest('.puzzle__item');
            if (!$target.is('.active')) {
                $target.addClass('active');
                $target.text('Скрыть ответ');
                $puzzle.find('.puzzle__item__answer__wrap').show();
                jQuery('.overlay').show();
                $puzzle.addClass('active');
            } else {
                $target.removeClass('active');
                $target.text('Узнать ответ');
                $puzzle.find('.puzzle__item__answer__wrap').hide();
                jQuery('.overlay').hide();
                $puzzle.removeClass('active');
            }
        });
    });
})();
