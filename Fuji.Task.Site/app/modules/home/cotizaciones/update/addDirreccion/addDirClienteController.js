angular.module('Task').controller('addDirClienteController', ['$scope', '$rootScope', '$mdDialog', 'clientesServices', 'cliente','cotizacionID',
    function ($scope, $rootScope, $mdDialog, clientesServices, cliente, cotizacionID) {
        $scope.loading = false;
        $scope.existe = false;
        $scope.valid = true;
        $scope.colonias = [];
        $scope.cliente = cliente;
        $scope.TipoDireccion = [];
        $scope.direcciones = [];
        $scope.intCotizacionID = cotizacionID;
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.direccion = {
            bitActivo: true,
            bitValidada: false,
            intClienteID: 0,
            intDireccionID: 0,
            intCodigoPostalID: 0,
            intTipoDireccionID: 0,
            intUserSys: 0,
            vchCodigoPostal: '',
            vchPoblacion: '',
            vchMunicipio: '',
            vchEstado: '',
            vchTipoDireccion: '',
            vchCalleyNum: '',
            vchColonia: ''
        };


        $scope.abrirMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        $scope.cancel = function () {
            $mdDialog.hide();
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
            try {
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
            }
            catch (Exce) {
                console.log("Error al buscar el codigo postal: " + Exce.Message);
            }
        };

        $scope.AgregarDireccion = function (ev, direccion) {
            $scope.loading = true;
            try {
                direccion.intTipoDireccionID = 2;
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Direccion: direccion,
                    Cliente: $scope.cliente,
                    intUserID: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                    intCotizacionID: $scope.intCotizacionID
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
                    intCotizacionID: $scope.intCotizacionID,
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

        $scope.CargarExcelDireccion = function (ev, cliente) {
            try {
                $mdDialog.show({
                    controller: 'addDocDirController',
                    templateUrl: 'app/modules/home/cotizaciones/update/addDocDir/addDocDirView.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: true,
                    skipHide: true,
                    locals: {
                        cliente: $scope.cliente
                    }
                }).then(function (response) {
                    if (response.Success) {
                        $scope.direccion.vchCodigoPostal = response.client.vchCodigoPostal;
                        $scope.CodigoPostal(response.client.vchCodigoPostal);
                        $scope.direccion.vchCalleyNum = response.client.vchCalleYNum;
                        $scope.direccion.vchColonia = response.client.vchColonia;
                        $scope.direccion.vchEntreCalles = response.client.vchEntreCalles;
                        $scope.direccion.intCodigoPostalID = response.client.intCodigoPostalID;
                        $scope.direccion.vchManzana = response.client.vchManzana;
                        $scope.direccion.vchPiso = response.client.vchPiso;
                    }
                    else {
                        var alert = $mdDialog.alert({
                            title: 'Mensaje del sistema',
                            textContent: response.Message,
                            ok: 'Aceptar',
                            skipHide: true
                        });
                        $mdDialog.show(alert).then(function () {
                            load();
                        });
                    }
                });
            }
            catch (Exce) {
                console.log("Error al cargar el documento: " + Exce.Message);
            }
        };
    }]);