angular.module('TaskMDL').factory('productosServices', ['$http', function ($http) {
    var service = {};
    service.ObtenerProductos = function (data, callback) {
        $http.post(location.origin +  '/api/productos/ObtenerProductos',
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
    service.ObtenerDetalleProducto = function (data, callback) {
        $http.post(location.origin +  '/api/productos/ObtenerDetalleProducto',
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
    service.ObtenerTipoProductos = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerTipoProductos',
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
    service.ObtenerProductosDiscponibles = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerProductosDiscponibles',
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
    service.ObtenerTipoUnidades = function (data, callback) {
        $http.post(location.origin +  '/api/catalogos/ObtenerTipoUnidades',
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
    service.AgregarProducto = function (data, callback) {
        $http.post(location.origin +  '/api/productos/AgregarProducto',
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
        $http.post(location.origin +  '/api/productos/evaluarCorreo',
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
        $http.post(location.origin +  '/api/productos/EliminarUsuario',
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
    service.BuscarProducto = function (data, callback) {
        $http.post(location.origin +  '/api/productos/BuscarProducto',
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
    service.AgregarSitioUsuario = function (data, callback) {
        $http.post(location.origin +  '/api/productos/AgregarSitioUsuario',
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
    service.EliminarRELSitio = function (data, callback) {
        $http.post(location.origin +  '/api/productos/EliminarRELSitio',
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
    service.ObtenerSitiosUsuario = function (data, callback) {
        $http.post(location.origin +  '/api/productos/ObtenerSitiosUsuario',
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
    service.ObtenerPosiblesSitios = function (data, callback) {
        $http.post(location.origin +  '/api/productos/ObtenerPosiblesSitios',
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
    service.ObtenerModalidadSitiosUser = function (data, callback) {
        $http.post(location.origin +  '/api/sitios/ObtenerModalidadSitiosUser',
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
    service.ObtenerPosiblesModalidadSitiosUser = function (data, callback) {
        $http.post(location.origin +  '/api/sitios/ObtenerPosiblesModalidadSitiosUser',
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
    service.AgregarModalidadUsuario = function (data, callback) {
        $http.post(location.origin +  '/api/productos/AgregarModalidadUsuario',
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
    service.EliminarRELModalidad = function (data, callback) {
        $http.post(location.origin +  '/api/productos/EliminarRELModalidad',
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
    service.AgregarPrecio = function (data, callback) {
        $http.post(location.origin +  '/api/productos/AgregarPrecio',
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
    service.ObtenerPreciosProductos = function (data, callback) {
        $http.post(location.origin +  '/api/productos/ObtenerPreciosProductos',
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
    service.AgregarProductoPaquete = function (data, callback) {
        $http.post(location.origin +  '/api/productos/AgregarProductoPaquete',
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
    service.EditarPrecio = function (data, callback) {
        $http.post(location.origin +  '/api/productos/EditarPrecio',
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
    service.ObtenerProductosPaquete = function (data, callback) {
        $http.post(location.origin +  '/api/productos/ObtenerProductosPaquete',
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
    service.GuardarPrecios = function (data, callback) {
        $http.post(location.origin +  '/api/productos/GuardarPrecios',
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
    service.ObtenerPreciosDetalle = function (data, callback) {
        $http.post(location.origin +  '/api/productos/ObtenerPreciosDetalle',
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
    service.EliminarModificacion = function (data, callback) {
        $http.post(location.origin +  '/api/productos/EliminarModificacion',
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
    service.AgregarProducto = function (data, callback) {
        $http({
            method: 'POST',
            url: location.origin + '/api/productos/AgregarProducto',
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
    service.ActualizarProducto = function (data, callback) {
        $http({
            method: 'POST',
            url: location.origin + '/api/productos/ActualizarProducto',
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