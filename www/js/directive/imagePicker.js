(function () {
    'use strict';
    var module = angular.module(APP_CONFIGS.NAME, ['onsen']); //新規モジュールを定義
    // ディレクティブの定義
    module.directive("imagePickerDirective", function () {
        return {
            restrict: "A",
            scope: {},
            templateurl: "../../partials/imagePicker.html",
            link: function (scope, element, attrs) {
                console.log("in directive link. element=");
                outlog(element);
                outlog(attrs);
                element.bind("click", function (l_event) {
                    console.log("click event driven!");
                    if (l_event.target.tagName.toLowerCase() == "ons-button") {
                        navigator.camera.getPicture(function (imageData) {
                            var image = document.getElementById('myImage');
                            image.src = "data:image/jpeg;base64," + imageData;
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
});
