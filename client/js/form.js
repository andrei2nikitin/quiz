/**
 * работа с формой
 * @param options
 */
var form = function (options) {
    var
        /**
         * кнопка отправки формы
         * @type {jQuery}
         */
        $submit = jQuery('.js-form-submit'),

        /**
         * инпуты формы
         * @type {jQuery}
         */
        $inputs = jQuery('.js-form-input'),

        /**
         * нода "Комментарий"
         * @type {jQuery}
         */
        $textarea = jQuery('.js-form-textarea'),

        /**
         * нода "подать заявку"
         * @type {jQuery}
         */
        $checkbox = jQuery('.js-checkbox'),

        /**
         * нода показа ошибок
         * @type {jQuery}
         */
        $error = jQuery('.js-form-error'),

        /**
         * тут текст ошибок
         */
        errorText,

        /**
         * заполненные поля формы
         * @type {object}
         */
        fields,

        /**
         * необходимые поля
         * @type {[]}
         */
        required = ['email', 'apply'],

        /**
         * ошибки формы
         * @type {{email: string}}
         */
        errors = {},

        /**
         * валидация формы
         * возвращает имена полей с неправильными данными
         * @returns {Array}
         */
        validate = function() {
            fields = jQuery('form').serializeArray();

            /**
             * функции валидации полей формы по input name
             * @type {{email: Function}}
             */
            var validators = {
                /**
                 * валидация строки на соответствие email
                 * @param {string} str
                 * @return {boolean}
                 */
                email: function (str) {
                    return !!/^[a-z0-9+._\-]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/.exec(str);
                }
            },

            errors = jQuery(fields).map(function(index, field) {
                if (~(required.indexOf(field.name))) {
                    return validators[field.name] && !validators[field.name](field.value, field) ? field.name : undefined;
                }
            });

            if ($checkbox.is(':checked') && !$textarea.val()) {
                errors.push('comment');
            }

            return errors;
        },

        /**
         * Вернет необходимый плейсхолдер для поля "Комментарии"
         * @param {bool} isChecked
         * @return {string}
         */
        getCommentPlaceholder = function(isChecked) {
            return isChecked ? 'В заявке укажите:\r\n\r\n\ 1. Имена частников команды\r\n\ 2. Краткое описание опыта и' +
            ' навыков участников\r\n\ 3. Дополнительные пожелания и предложения, если есть' : 'Напишите здесь ваш' +
            ' вопрос';
        },

        /**
         * Удаляет красный бордер для полей не рошедших валидацию.
         */
        removeError = function() {
            jQuery('.error').removeClass('error');
        };

    $inputs.focus(function() {
        $submit.removeClass('disabled');
        $error.html('').hide();
        removeError();
    });

    $checkbox.change(function(e) {
        $textarea.attr('placeholder', getCommentPlaceholder($checkbox.is(':checked')));
        removeError();
    });

    $submit.click(function () {
        if ($submit.is('.disabled')) {
            return false;
        }
        var findErrors = validate();
        if (!findErrors.length) {
//                jQuery.ajax({
//                    url: formUrl,
//                    method: 'post',
//                    data: fields,
//                    success: function() {
//                        (new modal({
//                            selector: '.js-modal-done'
//                        })).show()
//                    }
//                });

            (new modal({
                selector: '.js-modal-done'
            })).show()
        } else {
            $submit.addClass('disabled');
            jQuery(findErrors).map(function(index, error) {
                jQuery('[name="' + error + '"]').addClass('error');
            })

        }
    });
};
