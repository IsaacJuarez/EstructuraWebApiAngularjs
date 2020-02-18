angular.module('TaskMDL').factory('usuariosServices', ['$http', function ($http) {
    var service = {};
    service.ObtenerUsuarios = function (data, callback) {
        $http.post(location.origin +  '/api/usuarios/ObtenerUsuarios',
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
    service.ObtenerTipoUsuario = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerTipoUsuario',
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
    service.ObtenerTipoVenta = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerTipoVenta',
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
    service.AgregarUsuario = function (data, callback) {
        $http.post(location.origin +  '/api/usuarios/AgregarUsuario',
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
    service.evaluarCorreo = function (data, callback) {
        $http.post(location.origin +  '/api/usuarios/evaluarCorreo',
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
    service.ActualizarUsuario = function (data, callback) {
        $http.post(location.origin +  '/api/usuarios/ActualizarUsuario',
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
    service.ModificarPermiso = function (data, callback) {
        $http.post(location.origin +  '/api/usuarios/ModificarPermiso',
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
    service.ObtenerAccesosUsuario = function (data, callback) {
        $http.post(location.origin +  '/api/usuarios/ObtenerAccesosUsuario',
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
    service.EliminarUsuario = function (data, callback) {
        $http.post(location.origin +  '/api/usuarios/EliminarUsuario',
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
    service.BuscarUsuario = function (data, callback) {
        $http.post(location.origin +  '/api/usuarios/BuscarUsuario',
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
    service.ObtenerPosiblesAutorizadores = function (data, callback) {
        $http.post(location.origin +  '/api/usuarios/ObtenerPosiblesAutorizadores',
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
    service.ObtenerAutorizadores = function (data, callback) {
        $http.post(location.origin +  '/api/usuarios/ObtenerAutorizadores',
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
    service.AgregarAutorizador = function (data, callback) {
        $http.post(location.origin +  '/api/usuarios/AgregarAutorizador',
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
    service.EliminarAutorizador = function (data, callback) {
        $http.post(location.origin +  '/api/usuarios/EliminarAutorizador',
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