// define our app and dependencies (remember to include firebase!)
var app = angular.module("sampleApp", ["ngResource"]);

// this factory returns a synchronized array of chat messages
app.factory("chatMessages", ["$resource",
    function ($resource) {
        // create a reference to the database location where we will store our data
        //var ref = new Firebase("http://burning-torch-7958.firebaseio.com/resourceRoom");

        var resource = $resource("https://burning-torch-7958.firebaseio.com/resourceRoom/messages/:id.json",
            {id: '@id'},
            {
                update: {method: 'PATCH'}
            }
        );

        // this uses AngularFire to create the synchronized array
        return resource;
    }
]);

app.controller("ChatCtrl", ["$scope", "chatMessages",
    // we pass our new chatMessages factory into the controller
    function ($scope, chatMessages) {
        $scope.showUser = true;

        // we add chatMessages array to the scope to be used in our ng-repeat
        $scope.messages = chatMessages.get();

        // a method to create new messages; called by ng-submit
        $scope.addMessage = function () {
            // calling $add on a synchronized array is like Array.push(),
            // except that it saves the changes to our database!
            //$scope.messages.$add({
            //    from: $scope.user,
            //    content: $scope.message
            //});

            chatMessages.save({from: $scope.user, content: $scope.message}, function() {
                $scope.messages = chatMessages.get();
            });


            // reset the message input
            $scope.message = "";
        };

        $scope.deleteMessage = function (key) {
            console.log("testing " + key);
            (new chatMessages()).$remove({id: key}).then(function(){
                console.log("success");
                $scope.messages = chatMessages.get();
            });




            //$scope.entry = chatMessages.get({id: key}, function() {
            //    $scope.entry.$remove({id: key}, function() {
            //        console.log("success");
            //        $scope.messages = chatMessages.get();
            //    });
            //})

        };

        $scope.updateMessage = function(key){
          var newVal = window.prompt("New value?");
            $scope.entry = chatMessages.get({id:key}, function() {
                $scope.entry.content = newVal;
                $scope.entry.$update({id: key}, function(){
                    $scope.messages = chatMessages.get();
                })
            });
            //    .then(function(){
            //    console.log("success update");
            //    $scope.messages = chatMessages.get();
            //})
        };

        // if the messages are empty, add something for fun!
        //$scope.messages.$loaded(function () {
        //    if ($scope.messages.length === 0) {
        //        $scope.messages.$add({
        //            from: "Firebase Docs",
        //            content: "Hello world!"
        //        });
        //    }
        //});
    }
]);

//app.factory("authService", ["$firebaseAuth",
//    function ($firebaseAuth) {
//        var ref = new Firebase("https://burning-torch-7958.firebaseio.com");
//
//        return $firebaseAuth(ref);
//    }
//]);

//app.controller("authController", ["$scope", "authService",
//    function ($scope, authService) {
////$scope.log = authService;
//        $scope.login = function () {
//            authService.$authWithPassword({
//                email: $scope.uEmail,
//                password: $scope.uPass
//            }).then(function (authData) {
//                console.log("Logged in as:", authData.uid);
//            }).catch(function (error) {
//                console.error("Authentication failed:", error);
//            });
//        };
//
//        $scope.addUser = function () {
//
//        }
//    }
//]);