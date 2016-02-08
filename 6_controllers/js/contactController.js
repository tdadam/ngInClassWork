(function(){
    'use strict';

    angular.module('contactController', [])
        .controller('contactController', contactController);

    contactController.$inject = [];

    function contactController()
    {
        var cc = this;
        cc.doSubmit = doSubmit;

        function doSubmit() {
            alert(cc.newName + " " + cc.newAddy + " " + cc.newPhone + " " + cc.newEmail);
        }
    }

}());