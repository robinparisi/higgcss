var APP = (function($, window, document, undefined) {
    'use strict';

    $(document).ready(function() {
        APP.init();
    });

    var PRIVATE_CONSTANT = 'bar';

    var privateVar = 'foo';

    function init() {
        /*
         * Init main components
         * ex : menu, responsive, etc...
         */
    }

    function privateMethod() {
        // private code
    }

    return {
        init: init
    }

})(typeof Zepto === 'function' ? Zepto : jQuery, this, this.document);
