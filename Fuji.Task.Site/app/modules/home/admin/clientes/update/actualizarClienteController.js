﻿angular.module('TaskMDL').controller('actualizarClienteController', ['$scope', '$rootScope', '$mdDialog', 'clientesServices','cliente',
    function ($scope, $rootScope, $mdDialog, clientesServices, cliente) {
        $scope.user = $rootScope.Globals.CurrentUserCot;
        $scope.AdminClient = false;
        $scope.loading = false;
        $scope.existe = false;
        $scope.valid = true;
        $scope.colonias = [];
        $scope.cliente = cliente;

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.managers = [];
        $scope.perfiles = [];

        try {
            $scope.AdminClient = $scope.user.Permiso.find(x => x.vchClave == 'AdminClient').bitAcceso;
        }
        catch (Exce) {
            console.log("Error al obtener accesos: " + Exce.Message);
        }

        function load() {
            $scope.loading = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token
                };
                clientesServices.ObtenerAgenteVentas(request, function (responseVentas) {
                    clientesServices.ObtenerAgenteCobranza(request, function (responseCob) {
                        clientesServices.ObtenerTipoCliente(request, function (responseTipoCliente) {
                            clientesServices.ObtenerTipoClienteFiscal(request, function (responseTipoClienteFiscal) {
                                $scope.loading = false;
                                $scope.ventas = responseVentas;
                                $scope.cobranzas = responseCob;
                                $scope.precios = responseTipoCliente;
                                $scope.TipoCliente = responseTipoClienteFiscal;
                                if (cliente.vchCodigoPostal != "") {
                                    $scope.CodigoPostal(cliente.vchCodigoPostal);
                                }
                                if ($rootScope.Globals.CurrentUserCot.intTipoUsuarioID > 1) {
                                    $scope.cliente.intAgenteVentas = $rootScope.Globals.CurrentUserCot.intUsuarioID;
                                }
                            });
                        });
                    });
                });
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Existe un error: " + Exce.Message);
            }
        }
        load();

        $scope.ActualizarCliente = function (cliente, ev) {
            $scope.loading = true;
            var Request = {
                Cliente: cliente,
                token: $rootScope.Globals.CurrentUserCot.Token,
                intUserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
            };
            clientesServices.ActualizarCliente(Request, function (response) {
                $scope.loading = false;
                if (response.Success)
                    $mdDialog.hide(response);
                else {
                    var alert = $mdDialog.alert({
                        title: 'Advertencia',
                        textContent: response.Message,
                        ok: 'Aceptar',
                        skipHide: true
                    });
                    $mdDialog.show(alert);
                }
            });
        };

        $scope.CodigoPostal = function (codigoPostal) {
            var Request = {
                token: $rootScope.Globals.CurrentUserCot.Token,
                vchCodigoPostal: codigoPostal
            };
            clientesServices.VerificarCodigoPostal(Request, function (respose) {
                if (respose.Success) {
                    $scope.poblaciones = respose.lstColonia;
                    $scope.cliente.vchEstado = respose.Estado;
                    $scope.cliente.vchMunicipio = respose.Municipio;
                }
                else {
                    $scope.cliente.vchEstado = "";
                    $scope.cliente.vchMunicipio = "";
                }
            });
        };

        $scope.validarRFC = function (rfc) {
            try {
                if (rfc.length > 10) {
                    var rfcCorrecto = rfcValido(rfc);   // ⬅️ Acá se comprueba
                    if (rfcCorrecto) {
                        valido = "Válido";
                        $scope.valid = true;
                    } else {
                        valido = "No válido";
                        $scope.valid = false;
                    }
                }
                else {
                    if (rfc.length > 1) {
                        $scope.valid = false;
                    }
                }
            }
            catch (Ex) {
                console.log("Error: " + Ex.Message);
            }
        };


        //Función para validar un RFC
        // Devuelve el RFC sin espacios ni guiones si es correcto
        // Devuelve false si es inválido
        // (debe estar en mayúsculas, guiones y espacios intermedios opcionales)
        function rfcValido(rfc, aceptarGenerico = true) {
            const re = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
            var validado = rfc.match(re);

            if (!validado)  //Coincide con el formato general del regex?
                return false;

            //Separar el dígito verificador del resto del RFC
            const digitoVerificador = validado.pop(),
                rfcSinDigito = validado.slice(1).join(''),
                len = rfcSinDigito.length,

                //Obtener el digito esperado
                diccionario = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
                indice = len + 1;
            var suma,
                digitoEsperado;

            if (len == 12) suma = 0
            else suma = 481; //Ajuste para persona moral

            for (var i = 0; i < len; i++)
                suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
            digitoEsperado = 11 - suma % 11;
            if (digitoEsperado == 11) digitoEsperado = 0;
            else if (digitoEsperado == 10) digitoEsperado = "A";

            //El dígito verificador coincide con el esperado?
            // o es un RFC Genérico (ventas a público general)?
            if ((digitoVerificador != digitoEsperado)
                && (!aceptarGenerico || rfcSinDigito + digitoVerificador != "XAXX010101000"))
                return false;
            else if (!aceptarGenerico && rfcSinDigito + digitoVerificador == "XEXX010101000")
                return false;
            return rfcSinDigito + digitoVerificador;
        }

    }]);