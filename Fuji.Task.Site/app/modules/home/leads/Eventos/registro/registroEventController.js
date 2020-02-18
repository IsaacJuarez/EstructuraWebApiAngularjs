angular.module('Task').controller('registroEventController', ['$scope', '$rootScope', '$mdDialog', '$mdSidenav', '$location', 'eventosServices', '$cookieStore',
    function ($scope, $rootScope, $mdDialog, $mdSidenav, $location, eventosServices, $cookieStore) {
        $scope.user = $rootScope.Globals.CurrentUserCot;
        $scope.variable = $rootScope.evento;
        $scope.evento = $rootScope.evento;
        $scope.loading = false;
        $scope.AccessAddAsistente = false;
        $scope.lineas = [];
        $scope.busqueda = {
            vchNombre: '',
            intLineaProdID: 0
        };
        $scope.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        function load() {
            $scope.loading = true;
            try {
                $scope.AccessAddAsistente = $rootScope.Globals.CurrentUserCot.Permiso.length > 0 ? $rootScope.Globals.CurrentUserCot.Permiso.find(fruit => fruit.vchClave === 'AddVisitLead').bitActivo : false;
                $scope.lineas = [];
                var Request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Evento: $scope.evento,
                    Usuario: $rootScope.Globals.CurrentUserCot
                };
                eventosServices.ObtenerAsistentesEvento(Request, function (response) {
                    $scope.asistentes = response;
                    $scope.loading = false;
                });
            }
            catch (Exce) {
                console.log("Error: " + Exce.Message);
                $scope.loading = false;
            } finally {
                $scope.loading = false;
            }
        }
        load();

        $scope.AgregarAsistente = function (ev, evento) {
            $mdDialog.show({
                controller: 'addRegistroController',
                templateUrl: 'app/modules/home/leads/registros/add/addRegistroView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                skipHide: true,
                locals: {
                    evento: evento
                }
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

        $scope.BuscarEvento = function (ev) {
            $scope.lineas = [];
            load();
        };

        $scope.Atras = function (ev) {
            $location.path('/eventos');
        };

        $scope.MostrarRegistros = function (participante, ev) {
            participante.showRegisters = !participante.showRegisters;
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
        $scope.itemsPerPage = 15;
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