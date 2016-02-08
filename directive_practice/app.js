angular.module('isolate-scope', [])

    .controller('IsolatedScopeController', function ($scope) {
        $scope.name = 'Bill';
        $scope.clickMe = function (param) {
            console.log('I was clicked! Param value = ' + param);
        };
    })

    .directive('customerName', function () {
        return {
            scope: {
                names: '=',
                action: '&'
            },
            template: '<span>Customer name (from directive): <input ng-model="names"/>' +
            '<input type="button" ng-click="action()(names)" value="Click Me!"/></span>'
            //'<input type="button" ng-click="action({message:name})" value="Click Me!"/></span>'
        };
    });
