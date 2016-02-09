(function(){
    'use strict';

    angular.module('homeController', [])
        .controller('homeController', homeController);

    homeController.$inject = [];

    function homeController() {

        // grid (and its data) are in the service for persistence
        var hc = this;
        hc.loading = undefined;
        hc.upload = upload;

        function upload (files, event, rejectedFiles, anotherCustomParam) {

            for (var r in rejectedFiles) {
                console.log(rejectedFiles[r]);
            }
            hc.loading = true;

            if (anotherCustomParam !== undefined) {
                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        (function (index) {
                            var file = files[i];
                            hc.upload[index] = Upload.upload({
                                url: cfg.apiBase + 'Documents/Upload', // webapi url
                                method: 'POST',
                                data: { fileUploadObj: anotherCustomParam.ID },
                                file: file
                            }).progress(function (evt) {
                                // set upload percentage
                                file.progress = parseInt(100.0 * evt.loaded / evt.total);
                            }).success(function (data, status, headers, config) {
                                // file is uploaded successfully
                                file.complete = true;
                            }).error(function (data, status, headers, config) {
                                // file failed to upload
                                file.error = true;
                                console.log(data);
                                console.log(status);
                            });
                        })(i);
                    }
                }
            }
        }
    }

}());