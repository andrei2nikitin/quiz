/**
 * модальное окно(попап)
 * @param {{selector: {string}, onShow: Function}} options
 * @returns {{show: Function, close: Function}}
 */
var modal = function (options) {
    var
        /**
         * селектор в котором содержимое попапа
         * @type {string}
         */
        selector = options && options.selector,

        /**
         * коллбэк функция вызываемая после показа попапа
         * @type {function}
         */
        onShow = options && options.onShow,

        /**
         * оверлэй попапа
         * @type {jQuery}
         */
        $overlay = jQuery('.js-overlay'),

        /**
         * jQuery нода попапа
         * @type {jQuery}
         */
        $modal = jQuery(selector),

        /**
         * jQuery кнопки "закрыть"
         * @type {jQuery}
         */
        $close = $modal.find('.js-close'),
        /**
         * Коды клваиш которые отследиваем для запрета скролла.
         * @type {{37: number, 38: number, 39: number, 40: number}}
         */
        keys = {37: 1, 38: 1, 39: 1, 40: 1},

        /**
         * Запрет скролла по нажатиям клавиш.
         * @param e
         * @return {boolean}
         */
        preventDefaultForScrollKeys = function(e) {
            if (keys[e.keyCode]) {
                preventDefault(e);
                return false;
            }
        },

        /**
         * @param {Event} e
         */
        preventDefault = function(e) {
            e = e || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        },

        /**
         * Запрещаем скролл.
         */
        disableScroll = function() {
            if (window.addEventListener) {
                window.addEventListener('DOMMouseScroll', preventDefault, false);
            }
            window.onwheel = preventDefault; // modern standard
            window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
            window.ontouchmove  = preventDefault; // mobile
            document.onkeydown  = preventDefaultForScrollKeys;
        },

        /**
         * Разрешаем скролл.
         */
        enableScroll = function() {
            if (window.removeEventListener) {
                window.removeEventListener('DOMMouseScroll', preventDefault, false);
            }
            window.onmousewheel = document.onmousewheel = null;
            window.onwheel = null;
            window.ontouchmove = null;
            document.onkeydown = null;
        },

        /**
         * показывает попап
         */
        show = function () {

            /**
             * показыываем оверлэй
             */
            $overlay.show();

            /**
             * - добавляем попапу класс .hidden чтобы высчитать его размеры без отрисовки
             * - добавляем смещение для позиционирования по центру
             * - удаляем класс .hidden
             * - показываем попап
             */
            $modal
                .addClass('hidden')
                .css({
                    'margin-top': '-' + Math.floor($modal.outerHeight() / 2) + 'px',
                    'margin-left': '-' + Math.floor($modal.outerWidth() / 2) + 'px'
                })
                .removeClass('hidden')
                .show();

            disableScroll();

            if (jQuery.isFunction(onShow)) {
                onShow.apply(this);
            }
        },

        /**
         * закрывает попап
         */
        close = function () {
            $overlay.hide();
            $modal.hide();

            /**
             * очищаем внешний объект попапа
             * @type {boolean}
             */
            window.initedModal = false;

            enableScroll();
        };

    /**
     * закрываем попап при клике на оверлее
     */
    $overlay.click(function (e) {
        close();
    });

    /**
     * закрываем попап при клике "закрыть"
     */
    $close.click(function (e) {
        close();
    });

    /**
     * при создании нового попапа закрываем и очищаем старый
     */
    window.initedModal && window.initedModal.close();
    window.initedModal = {
        show: function () {
            show();
        },

        close: function () {
            close();
        }
    };

    return window.initedModal;
};
