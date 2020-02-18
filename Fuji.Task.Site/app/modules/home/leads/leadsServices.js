angular.module('Task').factory('leadsServices', ['$http',
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
        service.ObtenerProductos = function (data, callback) {
            $http.post(location.origin + '/api/eventos/ObtenerProductos',
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
        service.AgregarProspecto = function (data, callback) {
            $http.post(location.origin + '/api/eventos/AgregarProspecto',
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
        service.ActualizarUserSeguimiento = function (data, callback) {
            $http.post(location.origin + '/api/eventos/ActualizarUserSeguimiento',
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
        service.ObtenerReporteAsistentes = function (data, callback) {
            $http.post(location.origin + '/api/eventos/ObtenerReporteAsistentes',
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
        service.ObtenerEstados = function (data, callback) {
            $http.post(location.origin + '/api/catalogos/ObtenerEstados',
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
            $http.post(location.origin + '/api/catalogos/ObtenerAgenteVentas',
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