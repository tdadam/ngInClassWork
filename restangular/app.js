// define our app and dependencies (remember to include firebase!)
var app = angular.module("sampleApp", ["restangular"]);

// this factory returns a synchronized array of chat messages
app.factory("chatMessages", ["Restangular",
    function (Restangular) {
        // create a reference to the database location where we will store our data
        //var ref = new Firebase("http://burning-torch-7958.firebaseio.com/resourceRoom");

       var restangular = Restangular.setBaseUrl("https://burning-torch-7958.firebaseio.com/restChat")
           .setRequestSuffix(".json")
           .setFullResponse(true)
           .service('messages');

        return restangular;
    }
]);

app.controller("ChatCtrl", ["$scope", "chatMessages",
    // we pass our new chatMessages factory into the controller
    function ($scope, chatMessages) {
        $scope.showUser = true;



        // we add chatMessages array to the scope to be used in our ng-repeat
        $scope.newList = function(){chatMessages.one().get().then(function(response){
            $scope.messages = response.data.plain();
            $scope.data = response.data;
        })};

        $scope.newList();

        // a method to create new messages; called by ng-submit
        $scope.addMessage = function () {
                chatMessages.post({
                    from: $scope.user,
                    content: $scope.message
                }).then(function(){
                    $scope.newList();
                    });
            $scope.message = "";
            };

        $scope.deleteMessage = function (key) {
        $scope.data.customDELETE(key).then(function() {
            $scope.newList();
        })
            };

        $scope.updateMessage = function(key){
          var newVal = window.prompt("New value?");
        $scope.data.customOperation('patch', key, null, null, {content: newVal}).then(function() {
            $scope.newList();
        })
        };

    }
]);
