angular.module('TaskMDL').controller('usuariosController', ['$scope', '$rootScope', '$location', '$mdDialog', '$mdSidenav', 'usuariosServices',
    function ($scope, $rootScope, $location, $mdDialog, $mdSidenav, usuariosServices) {
        $scope.loading = false;
        $scope.reporte = false;
        $scope.usuarios = [];
        $scope.perfiles = [];
        function load() {
            $scope.loading = true;
            var Request = {
                token: $rootScope.Globals.CurrentUserCot.Token,
                id: $rootScope.Globals.CurrentUserCot.intUsuarioID
            };
            usuariosServices.ObtenerUsuarios(Request, function (responseUsuarios) {
                $scope.usuarios = responseUsuarios;
                $scope.groupToPages($scope.usuarios);
                usuariosServices.ObtenerPerfiles(Request, function (responsePerfiles) {
                    $scope.loading = false;
                    $scope.perfiles = [{ intTipoUsuarioID: 0, vchTipoUsuario: 'Todos' }];
                    if (responsePerfiles != null) {
                        for (i = 0; i < responsePerfiles.length; i++)
                            $scope.perfiles.push(responsePerfiles[i]);
                    }
                    $scope.busqueda = {
                        nombre: '',
                        intTipoUsuarioID: 0
                    };
                });
            });
        }
        load();
        $scope.AgregarUsuario = function (ev) {
            $mdDialog.show({
                controller: 'agregarUsuarioController',
                templateUrl: 'app/modules/home/admin/users/add/agregarUsuarioView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                skipHide: true
            }).then(function (response) {
                var alert = $mdDialog.alert({
                    title: 'Mensaje del sistema',
                    textContent: response.Message,
                    ok: 'Aceptar',
                    skipHide: true
                });
                $mdDialog.show(alert).then(function () {
                    load();
                });

            });
        };
        $scope.EliminarUsuario = function (ev, user) {
            var confirm = $mdDialog.confirm({
                title: 'Mensaje de confirmación',
                textContent: '¿Desea cambiar el estatus del usuario: ' + user.vchNombre + '?',
                ariaLabel: 'Cambiar estatus usuario',
                targetEvent: ev,
                skipHide: true,
                ok: 'Cambiar',
                cancel: 'Cancelar'
            });
            $mdDialog.show(confirm).then(function () {
                $scope.loading = true;
                var Request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    id: user.intUsuarioID,
                    UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
                };
                usuariosServices.EliminarUsuario(Request, function (response) {
                    $scope.loading = false;
                    var alert = $mdDialog.alert({
                        title: 'Advertencia',
                        textContent: response.Message,
                        ok: 'Aceptar',
                        skipHide: true
                    });
                    $mdDialog.show(alert);
                    if (response.Success)
                        load();
                });
            }, function () { });
        };
        $scope.ModificarUsuario = function (ev, usuario) {
            $mdDialog.show({
                controller: 'actualizarUsuarioController',
                templateUrl: 'app/modules/home/admin/users/update/actualizarUsuarioView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    usuario: usuario
                },
                skipHide: true
            }).then(function (response) {
                var alert = $mdDialog.alert({
                    title: 'Mensaje del sistema',
                    textContent: response.Message,
                    ok: 'Aceptar',
                    skipHide: true
                });
                $mdDialog.show(alert).then(function () {
                    load();
                });

            });
        };
        $scope.BuscarUsuario = function (ev, busqueda) {
            $scope.loading = true;
            var Request = {
                token: $rootScope.Globals.CurrentUserCot.Token,
                nombre: busqueda.nombre,
                intTipoUsuarioID: busqueda.intTipoUsuarioID
            };
            usuariosServices.BuscarUsuario(Request, function (response) {
                $scope.loading = false;
                $scope.usuarios = response;
                $scope.groupToPages($scope.usuarios);
            });
        };
        $scope.ModificarAutorizadores = function (ev, usuario) {
            $mdDialog.show({
                controller: 'autorizadoresController',
                templateUrl: 'app/modules/home/admin/users/autorizadores/autorizadoresView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    usuario: usuario
                },
                skipHide: true
            });
        };
        $scope.ModificarAccesos = function (ev, usuario) {
            $mdDialog.show({
                controller: 'accesosController',
                templateUrl: 'app/modules/home/admin/users/accesos/accesosView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    usuario: usuario
                },
                skipHide: true
            });
        };
        //------------------------------------------------------------------------------
        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function () {
            return $mdSidenav('right').isOpen();
        };
        function buildToggler(navID) {
            return function () {
                $mdSidenav(navID)
                    .toggle();
            };
        }
        $scope.abrirMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
        $scope.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
        $scope.itemsPerPage = 20;
        $scope.pagedItems = [];
        $scope.currentPage = 0;
        function clone(obj) {
            if (obj === null || typeof (obj) !== 'object')
                return obj;

            var temp = new obj.constructor();
            for (var key in obj)
                temp[key] = clone(obj[key]);
            return temp;
        }
        $scope.groupToPages = function (lista) {
            $scope.pagedItems = [];
            if (lista !== null) {
                var i;
                for (i = 0; i < lista.length; i++) {
                    if (i % $scope.itemsPerPage === 0) {
                        $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [clone(lista[i])];
                    } else {
                        $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push(clone(lista[i]));
                    }
                }
            }
            $scope.currentPage = 0;
        };
        $scope.range = function (start, end) {
            var ret = [];
            if (!end) {
                end = start;
                start = 0;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }
            return ret;
        };
        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };
        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;
            }
        };
        $scope.setPage = function () {
            $scope.currentPage = this.n;
        };
    }]);