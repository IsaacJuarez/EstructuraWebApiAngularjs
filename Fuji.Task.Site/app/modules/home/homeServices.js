angular.module('TaskMDL').factory('homeServices', ['$http',
    function ($http) {
        var service = {};
        service.EditarUsuario = function (data, callback) {
            $http.post(location.origin + '/api/usuarios/EditarUsuario',
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
        service.ObtenerProximosEventos = function (data, callback) {
            $http.post(location.origin + '/api/Eventos/ObtenerProximosEventos',
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
        service.ObtenerCotizacionesNum = function (data, callback) {
            $http.post(location.origin + '/api/cotizaciones/ObtenerCotizacionesNum',
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
        service.ObtenerAvisos = function (data, callback) {
            $http.post(location.origin + '/api/sistemas/ObtenerAvisos',
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
        service.ObtenerDetalleAutorizacionDir = function (data, callback) {
            $http.post(location.origin + '/api/sistemas/ObtenerDetalleAutorizacionDir',
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
        service.AutorizarDireccion = function (data, callback) {
            $http.post(location.origin + '/api/sistemas/AutorizarDireccion',
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
        service.MarcarLeido = function (data, callback) {
            $http.post(location.origin + '/api/sistemas/MarcarLeido',
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
        return service;
    }]);