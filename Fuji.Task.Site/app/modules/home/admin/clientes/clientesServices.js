angular.module('TaskMDL').factory('clientesServices', ['$http', function ($http) {
    var service = {};
    service.ObtenerClientes = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/ObtenerClientes',
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
    service.BuscarCliente = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/BuscarCliente',
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
    service.VerificarCodigoPostal = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/VerificarCodigoPostal',
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
    service.AgregarCliente = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/AgregarCliente',
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
    service.ActualizarCliente = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/ActualizarCliente',
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
    service.ObtenerDocumentosCliente = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/ObtenerDocumentosCliente',
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
    service.EnviarDocumentos = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/EnviarDocumentos',
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
    service.EliminarCliente = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/EliminarCliente',
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
    service.ObtenerAgenteCobranza = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerAgenteCobranza',
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
    service.ObtenerTipoCliente = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerTipoCliente',
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
    service.ObtenerTipoClienteFiscal = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerTipoClienteFiscal',
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
    service.ObtenerAgenteVentas = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerAgenteVentas',
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
    service.ObtenerTipoDireccion = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerTipoDireccion',
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
    service.AgregarDirCliente = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/AgregarDirCliente',
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
    service.ObtenerDireccionesCliente = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/ObtenerDireccionesCliente',
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
    service.ModificarCodigoSAP = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/ModificarCodigoSAP',
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
    service.AceptarCliente = function (data, callback) {
        $http.post(location.origin +  '/api/clientes/AceptarCliente',
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
        $http.post(location.origin + '/api/cotizaciones/GeneraDetalleCliente',
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
        $http.post(location.origin + '/api/cotizaciones/SolicitarAltaCliente',
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
    service.CopiarDireccion = function (data, callback) {
        $http.post(location.origin + '/api/cotizaciones/CopiarDireccion',
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
    service.CargarDocA = function (data, callback) {
        $http({
            method: 'POST',
            url: location.origin + '/api/clientes/CargarDoc',
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