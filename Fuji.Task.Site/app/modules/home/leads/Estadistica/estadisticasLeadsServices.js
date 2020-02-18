angular.module('Task').factory('estadisticasLeadsServices', ['$http',
    function ($http) {
        var service = {};
        service.ObtenerEstadisticaLeads = function (data, callback) {
            $http.post(location.origin + '/api/estadisticas/ObtenerEstadisticaLeads',
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
        service.ObtenerEventos = function (data, callback) {
            $http.post(location.origin + '/api/catalogos/ObtenerEventos',
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
        service.ObtenerUsuariosEventos = function (data, callback) {
            $http.post(location.origin + '/api/catalogos/ObtenerUsuariosEventos',
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