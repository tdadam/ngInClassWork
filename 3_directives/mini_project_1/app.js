/**
 * Created by tdadam on 12/9/15.
 */
(function(){
    var app = angular.module('form', []);
    app.controller('ChildController', function() {
this.children=[];
        this.kidName='';
        this.kidDate='';
         this.setKid = function() {
            children.push({name:kidName,bdate:kidDate});
            kidName='';
            kidDate='';
        }
    })
})();