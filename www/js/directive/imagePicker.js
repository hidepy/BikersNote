(function () {
    'use strict';
    var module = angular.module(APP_CONFIGS.NAME); //新規モジュールを定義
    // ディレクティブの定義
    module.directive("imagePickerDirective", function () {
        return {
            restrict: "A",
            scope: {},
            templateUrl: "partials/imagePicker.html",
            link: function (scope, element, attrs) {
                console.log("in directive link. element=");
                outlog(element);
                outlog(attrs);
                element.bind("click", function (l_event) {
                    console.log("click event driven!");
                    if (l_event.target.tagName.toLowerCase() == "ons-button") {
                        navigator.camera.getPicture(function (imageData) {
                            var image = (l_event.target.parentNode.querySelector("img"));
                            var image_data = "data:image/jpeg;base64," + imageData;
                            image.setAttribute("ng-src", image_data);
                            attrs.$set("image_data", image_data);
                        }, function (message) {
                            alert('Failed because: ' + message);
                        }, {
                            quality: 50,
                            destinationType: Camera.DestinationType.DATA_URL
                        });
                    }
                });
            }
        };
    });
})();
