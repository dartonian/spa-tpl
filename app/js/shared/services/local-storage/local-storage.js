;(function () {
    'use strict';
    angular
        .module('app')
        .service('localStorage', localStorage);
    ////////

    localStorage.$inject = ['localStorageService'];

    function localStorage(localStorageService) {

        var self = this;

        self.setWithExpiration = function (key, value, duration) {
            var expire = 0;

            if (duration > 0) {
                var d = new Date();
                expire = d.setTime(d.getTime() + duration * 1000);
            }

            localStorageService.set(key, {
                value: value,
                expire: expire
            });

        };

        self.getWithExpiration = function (key) {
            var item = localStorageService.get(key);
            
            if (item && item.expire !== undefined) {
                if (item.expire == 0 || item.expire >= new Date()) {
                    return item.value;
                } else {
                    localStorageService.remove(key);
                }
            }

        }

    }
})();