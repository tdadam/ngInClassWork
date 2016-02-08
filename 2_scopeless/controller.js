(function(){
    'use strict';

    angular.module('basicApp', [])
        .controller('basicController', basicController);

    basicController.$inject = [];

    function basicController() {

        var bc = this;

        bc.doSomething = doSomething;

        function doSomething() {
            bc.sometext = '';
        }
    }

}());