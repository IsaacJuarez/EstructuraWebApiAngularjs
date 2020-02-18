angular.module('TaskMDL').controller('direccionClienteController', ['$scope', '$rootScope', '$mdDialog', 'clientesServices', 'cliente',
    function ($scope, $rootScope, $mdDialog, clientesServices, cliente) {
        $scope.loading = false;
        $scope.existe = false;
        $scope.valid = true;
        $scope.colonias = [];
        $scope.cliente = cliente;
        $scope.TipoDireccion = [];
        $scope.direcciones = [];

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.hide();
        };

        $scope.abrirMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        function load() {
            $scope.loading = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Cliente: $scope.cliente
                };
                clientesServices.ObtenerDireccionesCliente(request, function (response) {
                    clientesServices.ObtenerTipoDireccion(request, function (responseTD) {
                        $scope.loading = false;
                        $scope.direcciones = response;
                        $scope.TipoDireccion = responseTD;
                    //if ($scope.direccion.vchCodigoPostal != "") {
                    //    $scope.CodigoPostal($scope.direccion.vchCodigoPostal);
                    //}
                    });
                });
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Existe un error: " + Exce.Message);
            }
        }
        load();

        $scope.CodigoPostal = function (codigoPostal) {
            if (codigoPostal != "" && codigoPostal != null) {
                var Request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    vchCodigoPostal: codigoPostal
                };
                clientesServices.VerificarCodigoPostal(Request, function (respose) {
                    if (respose.Success) {
                        $scope.poblaciones = respose.lstColonia;
                        $scope.direccion.vchEstado = respose.Estado;
                        $scope.direccion.vchMunicipio = respose.Municipio;
                    }
                    else {
                        $scope.direccion.vchEstado = "";
                        $scope.direccion.vchMunicipio = "";
                    }
                });
            }
        };

        $scope.AgregarDireccion = function (ev, direccion) {
            $scope.loading = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Direccion: direccion,
                    Cliente: $scope.cliente,
                    intUserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
                };
                clientesServices.AgregarDirCliente(request, function (response) {
                    $scope.loading = false;
                    if (response.Success) {
                        load();
                        $scope.direccion = {
                            intTipoDireccionID: 0,
                            vchCalleYNum: '',
                            vchColonia: '',
                            vchCodigoPostal: '',
                            vchEstado: '',
                            vchMunicipio: '',
                            intCodigoPostalID: 0
                        };
                    }

                    var alert = $mdDialog.alert({
                        title: 'Advertencia',
                        textContent: response.Message,
                        ok: 'Aceptar',
                        skipHide: true
                    });
                    $mdDialog.show(alert);
                });
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Error: " + Exce.Message);
            }
        };

        $scope.CopiarDireccion = function (ev, direccion) {
            $scope.loading = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    intCotizacionID: 0,
                    Direccion: direccion,
                    intUserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
                };
                clientesServices.CopiarDireccion(request, function (response) {
                    $scope.loading = false;
                    if (response.Success) {
                        load();
                        $scope.direccion = {
                            intTipoDireccionID: 0,
                            vchCalleYNum: '',
                            vchColonia: '',
                            vchCodigoPostal: '',
                            vchEstado: '',
                            vchMunicipio: '',
                            intCodigoPostalID: 0
                        };
                    }

                    var alert = $mdDialog.alert({
                        title: 'Advertencia',
                        textContent: response.Message,
                        ok: 'Aceptar',
                        skipHide: true
                    });
                    $mdDialog.show(alert);
                });
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Error: " + Exce.Message);
            }
        };
    }]);