angular.module('Task').controller('leadsController', ['$scope', '$rootScope', '$mdDialog', '$location', 'leadsServices',
    function ($scope, $rootScope, $mdDialog, $location, homeServices) {
        $scope.user = $rootScope.Globals.CurrentUserCot;
        $scope.loading = false;
        $scope.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        //$(function () {

        //    // elementos de la lista
        //    var menues = $(".navbar-nav li");

        //    // manejador de click sobre todos los elementos
        //    menues.click(function () {
        //        // eliminamos active de todos los elementos
        //        menues.removeClass("active");
        //        // activamos el elemento clicado.
        //        $(this).addClass("active");
        //    });
        //});


        $scope.EditarUsuario = function (ev) {
            $mdDialog.show({
                controller: 'editarUsuarioController',
                templateUrl: 'app/modules/home/user/update/editarUsuarioView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                skipHide: true
            }).then(function (response) {
                var alert = $mdDialog.alert({
                    title: 'Mensaje del sistema',
                    textContent: response.Message,
                    ok: 'Aceptar',
                    skipHide: true
                });
                $mdDialog.show(alert);
            });
        };

        $scope.MenuEventos = function (ev) {
            $mdDialog.show({
                controller: 'menuEventosController',
                templateUrl: 'app/modules/home/leads/menuEventos/menuEventosView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                skipHide: true
            });
        };
        $scope.AccesoDirectoNC = function (ev) {
            $location.path('/cotizacion/add');
        };

        $scope.AccesoDirectoAs = function (ev) {
            $location.path('/cotizacion');
        };

        $scope.AccesoDirectoSC = function (ev) {
            $location.path('/clientes/add');
        };
    }]);