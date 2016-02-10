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
                controller.$validators.integer = function (modelValue, viewValue) {
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
                controller.$asyncValidators.myusername = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return $q.when();
                    }
                    var def = $q.defer();
                    $timeout(function () {
                        if (usernames.indexOf(modelValue) == -1) {
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
    })
    .directive('overwriteEmail', function () {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i;
        return {
            require: 'ngModel',
            restrict: "A",
            link: function (scope, element, attrs, controller) {
                //Only apply with ngModel and Angular's email validation
                if (controller && controller.$validators.email) {
                    //Overwrite default Ang email validation
                    controller.$validators.email = function(modelValue, viewValue){
                        return controller.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
                    }
                }
            }
        }
    })
    .directive('contenteditable', function (){
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, controller){
                //view to model
                element.on('blur', function () {
                    controller.$setViewValue(element.html());
                });
                //model to view
                controller.$render = function(){
                    element.html(controller.$viewValue);
                };
            }
        };
    });