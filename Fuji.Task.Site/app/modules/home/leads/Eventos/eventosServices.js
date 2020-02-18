angular.module('Task').factory('eventosServices', ['$http',
    function ($http) {
        var service = {};
        service.ObtenerEventos = function (data, callback) {
            $http.post(location.origin + '/api/eventos/ObtenerEventos',
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
            $http.post(location.origin + '/api/catalogos/ObtenerLineaProd',
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
        service.ObtenerPermisoEvento = function (data, callback) {
            $http.post(location.origin + '/api/eventos/ObtenerPermisoEvento',
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
        service.ObtenerAsistentesEvento = function (data, callback) {
            $http.post(location.origin + '/api/eventos/ObtenerAsistentesEvento',
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
        service.ObtenerUsuariosProspectos = function (data, callback) {
            $http.post(location.origin + '/api/estadisticas/ObtenerUsuariosProspectos',
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
        service.ObtenerProductosEventoEst = function (data, callback) {
            $http.post(location.origin + '/api/estadisticas/ObtenerProductosEventoEst',
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
        service.ObtenerAdicionalesEventEst = function (data, callback) {
            $http.post(location.origin + '/api/estadisticas/ObtenerAdicionalesEventEst',
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
        service.AgregarEvento = function (data, callback) {
            $http({
                method: 'POST',
                url: location.origin + '/api/eventos/AgregarEvento',
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
        service.EditarEvento = function (data, callback) {
            $http({
                method: 'POST',
                url: location.origin + '/api/eventos/EditarEvento',
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