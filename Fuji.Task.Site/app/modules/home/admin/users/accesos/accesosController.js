angular.module('TaskMDL').controller('accesosController', ['$scope', '$rootScope', '$mdDialog', 'usuariosServices', 'usuario',
    function ($scope, $rootScope, $mdDialog, usuariosServices, usuario) {
        $scope.loading = false;
        $scope.usuario = usuario;
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        function load() {
            $scope.loading = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    usuario: $scope.usuario.intUsuarioID
                };
                usuariosServices.ObtenerAccesosUsuario(request, function (response) {
                    $scope.accesos = [];
                    $scope.accesos = response;
                    $scope.loading = false;
                });
            }
            catch (exce) {
                console.log("Error : " + exce.Message);
                $scope.loading = false;
            }
        }
        load();


        $scope.ModificarPermiso = function (ev, permiso) {
            $scope.loading = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    permiso: permiso,
                    UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
                };
                usuariosServices.ModificarPermiso(request, function (response) {
                    if (response.Success)
                        load();
                    var alert = $mdDialog.alert({
                        title: 'Mensaje del sistema',
                        textContent: response.Message,
                        ok: 'Aceptar',
                        skipHide: true
                    });
                    $mdDialog.show(alert); 
                });
            }
            catch (exce) {
                console.log("Error : " + exce.Message);
                $scope.loading = false;
            }
        };
    }]);