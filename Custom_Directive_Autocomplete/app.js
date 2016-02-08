(function() {
    'use strict';

    angular.module('autoComplete', [])

        .controller('testController', testController)
        .filter('testFilter', testFilter)
        .directive('testDirective', testDirective);

    function testDirective() {
        return {
            scope: {},
            restrict: 'E',
            replace: true,
            bindToController: {
                //searchParam: '',
                suggestions: '='
            },
            controller: 'testController as tc',
            templateUrl: './template.html'
        }
    }

    function testController() {
        var tc = this;
    }

    function testFilter() {

    }
})();