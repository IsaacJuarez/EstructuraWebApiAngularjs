angular.module('Task').controller('eventosController', ['$scope', '$rootScope', '$mdDialog', '$mdSidenav', '$location', 'eventosServices', '$cookieStore',
    function ($scope, $rootScope, $mdDialog, $mdSidenav, $location, eventosServices, $cookieStore) {
        $scope.user = $rootScope.Globals.CurrentUserCot;
        $scope.loading = false;
        $scope.AccessAddLeads = false;
        $scope.AccessAddVisitLead = false;
        $scope.AccessEstLead = false;
        $scope.lineas = [];
        var events = [];
        $scope.busqueda = {
            vchNombre: '',
            intLineaProdID: 0
        };
        $scope.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        function load() {
            $scope.loading = true;
            $scope.lineas = [];
            var Request = {
                token: $rootScope.Globals.CurrentUserCot.Token,
                id: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                Busqueda: $scope.busqueda,
                intLineaProdID: $scope.busqueda.intLineaProdID
            };
            try {
                $scope.AccessAddLeads = $rootScope.Globals.CurrentUserCot.intTipoUsuarioID == 1 ? true : ($rootScope.Globals.CurrentUserCot.Permiso.length > 0 ? $rootScope.Globals.CurrentUserCot.Permiso.find(fruit => fruit.vchClave === 'AddLead').bitAcceso : false);
                $scope.AccessAddVisitLead = $rootScope.Globals.CurrentUserCot.intTipoUsuarioID == 1 ? true : ($rootScope.Globals.CurrentUserCot.Permiso.length > 0 ? $rootScope.Globals.CurrentUserCot.Permiso.find(fruit => fruit.vchClave === 'AddVisitLead').bitAcceso : false);
                $scope.AccessEstLead = $rootScope.Globals.CurrentUserCot.intTipoUsuarioID == 1 ? true : ($rootScope.Globals.CurrentUserCot.Permiso.length > 0 ? $rootScope.Globals.CurrentUserCot.Permiso.find(fruit => fruit.vchClave === 'EstLead').bitAcceso : false);
            }
            catch (Exce) {
                console.log("Error: " + Exce.Message);
            }
            try {
                //eventosServices.ObtenerEventos(Request, function (responseEvent) {
                //    $scope.eventos = responseEvent;
                //    $scope.groupToPages($scope.eventos);
                    eventosServices.ObtenerLineaProd(Request, function (responseLinea) {
                        $scope.loading = false;
                        $scope.lineas = [{ intLineaProdID: 0, vchLinea: 'Todas' }];
                        for (i = 0; i < responseLinea.length; i++)
                            $scope.lineas.push(responseLinea[i]);
                    });
                //});
            }
            catch (Exce) {
                console.log("Error: " + Exce.Message);
            }
        }
        load();

        $scope.AgregarEvento = function (ev) {
            $mdDialog.show({
                controller: 'addEventosController',
                templateUrl: 'app/modules/home/leads/Eventos/add/addEventosView.html',
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

        //$scope.RegistroAsitentes = function (ev) {
        //    $mdDialog.show({
        //        controller: 'addEventosController',
        //        templateUrl: 'app/modules/home/leads/Eventos/add/addEventosView.html',
        //        parent: angular.element(document.body),
        //        targetEvent: ev,
        //        clickOutsideToClose: false,
        //        fullscreen: true,
        //        skipHide: true
        //    }).then(function (response) {
        //        var alert = $mdDialog.alert({
        //            title: 'Mensaje del sistema',
        //            textContent: response.Message,
        //            ok: 'Aceptar',
        //            skipHide: true
        //        });
        //        $mdDialog.show(alert).then(function () {
        //            load();
        //        });
        //    });
        //};

        $scope.RegistroAsitentes = function (ev, evento) {
            var response = '';
            $rootScope.evento = evento;
            $cookieStore.put('evento', evento);
            $location.path('/leads/registro');
            $mdDialog.hide(response);
        };

        $scope.BuscarEvento = function (ev) {
            $scope.lineas = [];
            load();
        };

        $scope.VerEvento = function (ev, evento) {
            //$rootScope.evento = evento;
            //$cookieStore.put('evento', evento);
            //$location.path('/eventos/ver'); 
            $mdDialog.show({
                controller: 'vistaEventoController',
                templateUrl: 'app/modules/home/leads/Eventos/vista/vistaEventoView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                skipHide: true,
                locals: {
                    evento: evento
                }
            });
        };

        $scope.ModificarEvento = function (ev, evento) {
            $mdDialog.show({
                controller: 'updateEventosController',
                templateUrl: 'app/modules/home/leads/Eventos/update/updateEventosView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    evento: evento
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


        $scope.PromocionesEvento = function (ev, evento) {
            $mdDialog.show({
                controller: 'promocionesController',
                templateUrl: 'app/modules/home/leads/Eventos/promociones/promocionesView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    evento: evento
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

        $scope.changeMode = function (mode) {
            $scope.mode = mode;
        };

        $scope.today = function () {
            $scope.currentDate = new Date();
        };

        $scope.isToday = function () {
            var today = new Date(),
                currentCalendarDate = new Date($scope.currentDate);

            today.setHours(0, 0, 0, 0);
            currentCalendarDate.setHours(0, 0, 0, 0);
            return today.getTime() === currentCalendarDate.getTime();
        };

        $scope.loadEvents = function () {
            var Request = {
                token: $rootScope.Globals.CurrentUserCot.Token,
                id: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                Busqueda: $scope.busqueda,
                intLineaProdID: $scope.busqueda.intLineaProdID
            };
            eventosServices.ObtenerEventos(Request, function (responseEvent) {
                $scope.eventos = responseEvent;
                for (i = 0; i < $scope.eventos.length; i++) {
                    events.push({
                        title: $scope.eventos[i].vchNombre,
                        vchNombre: $scope.eventos[i].vchNombre,
                        startTime: $scope.eventos[i].datFechaInicio,
                        endTime: $scope.eventos[i].datFechaFin,
                        allDay: true,
                        vchLugar: $scope.eventos[i].vchLugar,
                        vchAsociacion: $scope.eventos[i].vchAsociacion,
                        vbImagen: $scope.eventos[i].vbImagen,
                        intEventoID: $scope.eventos[i].intEventoID,
                        datFechaFin: $scope.eventos[i].datFechaFin,
                        datFechaInicio: $scope.eventos[i].datFechaInicio,
                        intLineaProdID: $scope.eventos[i].intLineaProdID
                    });
                }
                $scope.eventSource =  events;
            });
        };

        $scope.onEventSelected = function (event) {
            $scope.event = event;
        };

        $scope.onTimeSelected = function (selectedTime, events) {
            //console.log('Selected time: ' + selectedTime + ' hasEvents: ' + (events !== undefined && events.length !== 0));
        };

        function createRandomEvents() {
            
            var Request = {
                token: $rootScope.Globals.CurrentUserCot.Token,
                id: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                Busqueda: $scope.busqueda,
                intLineaProdID: $scope.busqueda.intLineaProdID
            };
            eventosServices.ObtenerEventos(Request, function (responseEvent) {
                $scope.eventos = responseEvent;
                for (i = 0; i < $scope.eventos.length; i++) {
                    events.push({
                        title: $scope.eventos[i].vchNombre,
                        startTime: $scope.eventos[i].datFechaInicio,
                        endTime: $scope.eventos[i].datFechaFin,
                        allDay: true,
                        vchLugar: $scope.eventos[i].vchLugar,
                        vchAsociacion: $scope.eventos[i].vchAsociacion,
                        vbImagen: $scope.eventos[i].vbImagen,
                        intEventoID: $scope.eventos[i].intEventoID,
                        datFechaFin: $scope.eventos[i].datFechaFin,
                        datFechaInicio: $scope.eventos[i].datFechaInicio
                    });
                }
                return events;
            });
        }

        $scope.EstidisticasEventos = function (ev, evento) {
            $mdDialog.show({
                controller: 'estadisticasEventController',
                templateUrl: 'app/modules/home/leads/Eventos/estadisticas/estadisticasEventView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    evento: evento
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
    }]);