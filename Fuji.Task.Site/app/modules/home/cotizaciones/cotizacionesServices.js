angular.module('Task').factory('cotizacionesServices', ['$http', function ($http) {
    var service = {};
    service.ObtenerCotizaciones = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/ObtenerCotizaciones',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerCotizacionDetalle = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/ObtenerCotizacionDetalle',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerProductosBusqueda = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/ObtenerProductosBusqueda',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerDocumentosCotizacion = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/ObtenerDocumentosCotizacion',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.EnviarDocumentos = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/EnviarDocumentos',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerPaqueteProducts = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/ObtenerPaqueteProducts',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerProductos = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerProductos',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerLineaProd = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerLineaProd',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerMoneda = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerMoneda',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerFactorCambio = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerFactorCambio',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerFactorCambioFactorID = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerFactorCambioFactorID',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.AgregarCotizacion = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/AgregarCotizacion',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerDocumentosCargarCliente = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/ObtenerDocumentosCargarCliente',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerClientes = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerClientes',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerPlazo = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerPlazo',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerPerfiles = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerPerfiles',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerLineaProd = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerLineaProd',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerTipoCotizacion = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerTipoCotizacion',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerDetalleCliente = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/ObtenerDetalleCliente',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.EnviarCotizacionCliente = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/EnviarCotizacionCliente',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.AutorizarDescCotizacion = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/AutorizarDescCotizacion',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.RechazarCotizacion = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/RechazarCotizacion',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.SeleccionarDireccion = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/SeleccionarDireccion',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerHistorialCotizacion = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/ObtenerHistorialCotizacion',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.MarcarDireccionValida = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/MarcarDireccionValida',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.RechazarCotizacionDesc = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/RechazarCotizacionDesc',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.AutorizarCotizacion = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/AutorizarCotizacion',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.EnviarComite = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/EnviarComite',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ClienteAceptaCotizacion = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/ClienteAceptaCotizacion',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.AprobacionJefeDirecto = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/AprobacionJefeDirecto',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.AutorizarCotJefe = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/AutorizarCotJefe',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.RechazarCotJefe = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/RechazarCotJefe',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.RechazadaComite = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/RechazadaComite',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.AutorizadaComite = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/AutorizadaComite',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.Formalizada = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/Formalizada',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ValidarCliente = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/ValidarCliente',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerClienteDetalle = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/ObtenerClienteDetalle',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerDireccionesEntregaCliente = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/ObtenerDireccionesEntregaCliente',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerDireccionesFisicaCliente = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/ObtenerDireccionesFisicaCliente',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerDocumentoDetalleCliente = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/ObtenerDocumentoDetalleCliente',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.PrintEjercicio = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/PrintEjercicio',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerParametrosCot  = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/ObtenerParametrosCot ',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.ObtenerParametrosOpcionCompra  = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/ObtenerParametrosOpcionCompra ',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.SaveEjercicio = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/SaveEjercicio',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.GeneraDetalleCliente = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/GeneraDetalleCliente',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.SolicitarAltaCliente = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/SolicitarAltaCliente',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.EliminarCotizacion = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/EliminarCotizacion',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.EnviarSolAltaDirCliente = function (data, callback) {
        $http.post(location.origin +  '/api/cotizaciones/EnviarSolAltaDirCliente',
            data, { headers: { 'Content-Type': 'application/json' } }).then(
                function (response) {
                    callback(response.data);
                }, function (response) {
                    response = {
                        Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                        Success: false
                    };
                    callback(response);
                });
    };
    service.CargarDoc = function (data, callback) {
        $http({
            method: 'POST',
            url: location.origin + '/api/cotizaciones/CargarDoc',
            headers: {
                'Content-Type': undefined
            },
            data: data,
            transformRequest: function (data) {
                return data;
            }
        }).success(function (response) {
            callback(response);
        }).error(function (response) {
            response = {
                Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                Success: false
            };
            callback(response);
        });
    };
    service.CargarDocDir = function (data, callback) {
        $http({
            method: 'POST',
            url: location.origin + '/api/cotizaciones/CargarDocDir',
            headers: {
                'Content-Type': undefined
            },
            data: data,
            transformRequest: function (data) {
                return data;
            }
        }).success(function (response) {
            callback(response);
        }).error(function (response) {
            response = {
                Message: "Error al consumir el API: " + response.statusText + "(" + response.status + ")",
                Success: false
            };
            callback(response);
        });
    };
    return service;
}]);