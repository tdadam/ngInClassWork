(function(){
    'use strict';

    angular.module('basicApp', [])
        .controller('basicController', basicController);

    basicController.$inject = ['$scope'];

    function basicController($scope) {
        $scope.doSomething = function() {
            $scope.sometext = '';
        };
    }

}());