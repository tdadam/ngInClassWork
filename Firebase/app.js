// define our app and dependencies (remember to include firebase!)
var app = angular.module("sampleApp", ["firebase"]);

// this factory returns a synchronized array of chat messages
app.factory("chatMessages", ["$firebaseArray",
    function ($firebaseArray) {
        // create a reference to the database location where we will store our data
        var randomRoomId = Math.round(Math.random() * 100000000);
        var ref = new Firebase("http://burning-torch-7958.firebaseio.com/myRoom");

        // this uses AngularFire to create the synchronized array
        return $firebaseArray(ref);
    }
]);

app.controller("ChatCtrl", ["$scope", "chatMessages", "authService",
    // we pass our new chatMessages factory into the controller
    function ($scope, chatMessages, authService) {
        $scope.showUser = true;

        // we add chatMessages array to the scope to be used in our ng-repeat
        $scope.messages = chatMessages;

        // a method to create new messages; called by ng-submit
        $scope.addMessage = function () {
            // calling $add on a synchronized array is like Array.push(),
            // except that it saves the changes to our database!
            $scope.messages.$add({
                from: $scope.user,
                content: $scope.message
            });

            // reset the message input
            $scope.message = "";
        };

        // if the messages are empty, add something for fun!
        $scope.messages.$loaded(function () {
            if ($scope.messages.length === 0) {
                $scope.messages.$add({
                    from: "Firebase Docs",
                    content: "Hello world!"
                });
            }
        });
    }
]);

app.factory("authService", ["$firebaseAuth",
    function ($firebaseAuth) {
        var ref = new Firebase("https://burning-torch-7958.firebaseio.com");

        return $firebaseAuth(ref);
    }
]);

app.controller("authController", ["$scope", "authService",
    function ($scope, authService) {
//$scope.log = authService;
        $scope.login = function () {
            authService.$authWithPassword({
                email: $scope.uEmail,
                password: $scope.uPass
            }).then(function (authData) {
                console.log("Logged in as:", authData.uid);
            }).catch(function (error) {
                console.error("Authentication failed:", error);
            });
        };

        $scope.addUser = function () {

        }
    }
]);