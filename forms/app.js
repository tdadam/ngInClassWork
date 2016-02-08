angular.module('formExample', [])
    .controller('ExampleController', ['$scope', function ($scope) {
        $scope.master = {};

        $scope.update = function (user) {
            $scope.master = angular.copy(user);
        };

        $scope.reset = function () {
            $scope.user = angular.copy($scope.master);
        };

        $scope.reset();
    }])

    .directive('integer', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, controller) {
                controller.$validators.integer = function (modelValue, viewValue){
                    var INTEGER_REGEXP = /^[-+]?\d+$/;
                    if (INTEGER_REGEXP.test(viewValue)) {
                        return true;
                    }
                   return false;
                };
            }
        };
    })

    .directive('myusername', function ($q, $timeout) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, controller) {
                var usernames = ["Mike", "Zac", "Wes", "Tyler", "Tim", "Kris"];
                controller.$asyncValidators.myusername = function (modelValue, viewValue){
                    if (controller.$isEmpty(modelValue)){
                        return $q.when();
                    }
                    var def = $q.defer();
                    $timeout(function() {
                        if (usernames.indexOf(modelValue) == -1){
                            def.resolve();
                        }
                        else {
                            def.reject();
                        }
                    }, 2000);
                    return def.promise;
                };
            }
        };
    });