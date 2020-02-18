angular.module('TaskMDL').controller('autorizadoresController', ['$scope', '$rootScope', '$mdDialog', 'usuariosServices', 'usuario',
    function ($scope, $rootScope, $mdDialog, usuariosServices, usuario) {
        $scope.loading = false;
        $scope.usuario = usuario;
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.autorizadoresRegistrados = [];
        function load() {
            $scope.loading = true;
            var request = {
                token: $rootScope.Globals.CurrentUserCot.Token,
                usuario: $scope.usuario.intUsuarioID
            };
            usuariosServices.ObtenerPosiblesAutorizadores(request, function (response) {
                $scope.posiblesAutorizadores = [];
                $scope.autorizadorSelected = null;
                $scope.searchText = null;
                $scope.autorizador = null;
                $scope.posiblesAutorizadores = response;
                usuariosServices.ObtenerAutorizadores(request, function (response) {
                    $scope.loading = false;
                    $scope.autorizadoresRegistrados = response;
                });
            });
        }
        load();

        $scope.AgregarAutorizador = function (ev) {
            $scope.loading = true;
            var Request = {
                usuario: $scope.usuario.intUsuarioID,
                autorizador: $scope.autorizador.intUsuarioID,
                token: $rootScope.Globals.CurrentUserCot.Token,
                UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
            };
            usuariosServices.AgregarAutorizador(Request, function (response) {
                $scope.loading = false;
                var alert = $mdDialog.alert({
                    title: 'Advertencia',
                    textContent: response.Message,
                    ok: 'Aceptar',
                    skipHide: true
                });
                $mdDialog.show(alert).then(function () { load(); });
            });
        };
        $scope.EliminarAutorizador = function (ev, autorizadorItem) {
            $scope.loading = true;
            var Request = {
                autorizador: autorizadorItem.intAutorizadorID,
                token: $rootScope.Globals.CurrentUserCot.Token,
                UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
            };
            usuariosServices.EliminarAutorizador(Request, function (response) {
                $scope.loading = false;
                var alert = $mdDialog.alert({
                    title: 'Advertencia',
                    textContent: response.Message,
                    ok: 'Aceptar',
                    skipHide: true
                });
                $mdDialog.show(alert).then(function () { load(); });
            });
        };
        $scope.posiblesAutorizadores = [];
        $scope.autorizador;
        $scope.querySearch = function (query) {
            return query ? $scope.posiblesAutorizadores.filter(createFilterFor(query)) : $scope.posiblesAutorizadores;
        };
        function createFilterFor(query) {
            var uppercaseQuery = angular.uppercase(query);
            return function filterFn(autorizador) {
                return autorizador.vchNombre.includes(uppercaseQuery);
            };
        }
        $scope.selectedItemChange = function (item) {
            $scope.autorizador = item == undefined ? null : item;
        };
    }]);