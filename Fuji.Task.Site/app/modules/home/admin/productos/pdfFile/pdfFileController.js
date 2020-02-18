angular.module('TaskMDL').controller('pdfFileController', ['$scope', '$rootScope', '$mdDialog', 'producto',
    function ($scope, $rootScope, $mdDialog, producto) {
        $scope.loading = false;
        $scope.producto = producto;

        function load() {
            $scope.loading = true;
            $scope.loading = false;
            var blob = new Blob([$scope.producto.vbFolleto], { type: 'application/pdf' });
            var url = URL.createObjectURL(blob);
            var iFrame = angular.element(document.querySelector('#iFrame'));
            $scope.url = url;
        }
        load();

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }]);