angular.module('login', ['ngMaterial', 'ngMessages']);

angular.module('TaskMDL', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngCookies', 'ngSanitize', 'ui.bootstrap', 'ngIdle', 'login', 'ui.bootstrap', 'ui.rCalendar', 'chart.js', 'angularjs-gauge'])
    .config(function ($mdThemingProvider) {
        var fujiTheme = $mdThemingProvider.extendPalette('brown', {
            //Poner el tema de la empresa
        });
        $mdThemingProvider.definePalette('fujiTheme', fujiTheme);
        $mdThemingProvider.theme('default')
            .backgroundPalette('grey', {
                'default': '200'
            })
            .primaryPalette('teal');
    })
    .config(function ($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        $mdDateLocaleProvider.shortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
            'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        $mdDateLocaleProvider.days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
        $mdDateLocaleProvider.shortDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
        $mdDateLocaleProvider.firstDayOfWeek = 1;
        $mdDateLocaleProvider.weekNumberFormatter = function (weekNumber) {
            return 'Semana ' + weekNumber;
        };
        $mdDateLocaleProvider.msgCalendar = 'Calendario';
        $mdDateLocaleProvider.msgOpenCalendar = 'Abrir calendario';
        $mdDateLocaleProvider.formatDate = function (date) {
            var m = moment(date);
            return m.isValid() ? m.format('DD/MM/YYYY') : '';
        };
        $mdDateLocaleProvider.parseDate = function (dateString) {
            var m = moment(dateString, 'DD/MM/YYYY', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };
    })
    .config(['$locationProvider', function ($locationProvider) {
        //$locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix('');
    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'app/modules/login/loginView.html',
                controller: 'loginController'
            })
            .when('/login/enviar-credenciales', {
                templateUrl: 'app/modules/login/credenciales/enviarCredencialesView.html',
                controller: 'enviarCredencialesController'
            })
            .when('/login/recuperar-credenciales', {
                templateUrl: 'app/modules/login/credenciales/recuperarCredencialesView.html',
                controller: 'recuperarCredencialesController'
            })
            .when('/', {
                templateUrl: 'app/modules/home/homeView.html',
                controller: 'homeController'
            })
            .when('/usuarios', {
                templateUrl: 'app/modules/home/admin/users/usuariosView.html',
                controller: 'usuariosController'
            })
            .when('/clientes', {
                templateUrl: 'app/modules/home/admin/clientes/clientesView.html',
                controller: 'clientesController'
            })
            .when('/clientes/add', {
                templateUrl: 'app/modules/home/admin/clientes/add/agregarClienteView.html',
                controller: 'agregarClienteController'
            })
            .when('/cotizacion', {
                templateUrl: 'app/modules/home/cotizaciones/cotizacionesView.html',
                controller: 'cotizacionesController'
            })
            .when('/cotizacion/add', {
                templateUrl: 'app/modules/home/cotizaciones/add/agregarCotizacionView.html',
                controller: 'agregarCotizacionController'
            })
            .when('/cotizacion/update', {
                templateUrl: 'app/modules/home/cotizaciones/update/actualizarCotizacionView.html',
                controller: 'actualizarCotizacionController'
            })
            .when('/productos', {
                templateUrl: 'app/modules/home/admin/productos/productosView.html',
                controller: 'productosController'
            })
            .when('/viajes/autorizar/finalizados', {
                templateUrl: 'app/modules/viajes/autorizar/finalizados/viajesFinalizadosView.html',
                controller: 'viajesFinalizadosController'
            })
            .when('/leads', {
                templateUrl: 'app/modules/home/leads/Eventos/eventosView.html',
                controller: 'eventosController'
            })
            .when('/eventos', {
                templateUrl: 'app/modules/home/leads/Eventos/eventosView.html',
                controller: 'eventosController'
            })
            .when('/eventos/ver', {
                templateUrl: 'app/modules/home/leads/Eventos/vista/vistaEventoView.html',
                controller: 'vistaEventoController'
            })
            .when('/eventos/estadisticas', {
                templateUrl: 'app/modules/home/leads/Estadistica/estadisticasLeadsView.html',
                controller: 'estadisticasLeadsController'
            })
            .when('/leads/registro', {
                templateUrl: 'app/modules/home/leads/registros/registroAsistentesView.html',
                controller: 'registroAsistentesController'
            })
            .when('/configSistemas', {
                templateUrl: 'app/modules/sistema/sistemaView.html',
                controller: 'sistemaController'
            })
            .when('/configSistemas/catalogos', {
                templateUrl: 'app/modules/sistema/catalogos/catalogosSistemaView.html',
                controller: 'catalogosSistemaController'
            })
            .when('/biblioteca', {
                templateUrl: 'app/modules/home/biblioteca/bibliotecaView.html',
                controller: 'bibliotecaController'
            })
            .when('/capacitacion', {
                templateUrl: 'app/modules/capacitacion/capacitacionView.html',
                controller: 'capacitacionController'
            })
            .when('/estadisticas', {
                templateUrl: 'app/modules/home/estadistica/estadisticaView.html',
                controller: 'estadisticaController'
            })
            .when('/configSistemas/catalogos', {
                templateUrl: 'app/modules/sistema/catalogos/catalogosSistemaView.html',
                controller: 'catalogosSistemaController'
            })
    }])
    .config(function (IdleProvider, KeepaliveProvider) {
        IdleProvider.idle(14400); // 4 horas
        IdleProvider.timeout(1);
    })
    .run(['$rootScope', '$location', '$cookieStore', '$http', '$mdDialog', '$templateCache', 'Idle',
        function ($rootScope, $location, $cookieStore, $http, $mdDialog, $templateCache, Idle) {
            //$route.reload();
            //$window.location.reload();
            $rootScope.$on('IdleTimeout', function () {
                var alert = $mdDialog.alert({
                    title: 'Advertencia',
                    textContent: 'se ha terminado su sesión',
                    ok: 'Aceptar'
                });
                $mdDialog.show(alert).then(function () {
                    //$location.path('/login');
                });
                $location.path('/login');
            });
            $rootScope.logeado = false;
            $rootScope.Globals = $cookieStore.get('Globals') || {};
            if ($rootScope.Globals.CurrentUserCot) {
                $rootScope.logeado = true;
            }
            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                /*
                    Generar método para control de accesos
                */
                var location = $location.path();
                switch (location) {
                    case '/login':
                        Idle.unwatch();
                        $location.path('/login');
                        break;
                    case '/login/enviar-credenciales':
                        $location.path('/login/enviar-credenciales');
                        break;
                    case '/login/recuperar-credenciales':
                        var token = $location.search().token;
                        if (token)
                            $location.path('/login/recuperar-credenciales');
                        else
                            $location.path('/login');
                        break;
                    case '/usuarios':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot) {
                            if ($rootScope.Globals.CurrentUserCot.intTipoUsuarioID === 1) {
                                $location.path('/usuarios');
                            }
                            else {
                                $location.path('/');
                            }
                        }
                        else {
                            $rootScope.path = location;
                            $location.path('/');
                        }
                        break;
                    case '/clientes':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot)
                            $location.path('/clientes');
                        else {
                            Idle.unwatch();
                            $location.path('/login');
                            $rootScope.path = location;
                        }
                        break;
                    case '/clientes/add':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot)
                            $location.path('/clientes/add');
                        else {
                            Idle.unwatch();
                            $location.path('/login');
                            $rootScope.path = location;
                        }
                        break;
                    case '/cotizacion':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot)
                            $location.path('/cotizacion');
                        else {
                            Idle.unwatch();
                            $location.path('/login');
                            $rootScope.path = location;
                        }
                        break;
                    case '/cotizacion/add':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot)
                            $location.path('/cotizacion/add');
                        else {
                            Idle.unwatch();
                            $location.path('/login');
                            $rootScope.path = location;
                        }
                        break;
                    case '/cotizacion/update':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot)
                            $location.path('/cotizacion/update');
                        else {
                            Idle.unwatch();
                            $location.path('/login');
                            $rootScope.path = location;
                        }
                        break;
                    case '/productos':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot)
                            $location.path('/productos');
                        else {
                            Idle.unwatch();
                            $location.path('/login');
                            $rootScope.path = location;
                        }
                        break;
                    case '/leads':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot)
                            $location.path('/leads');
                        else {
                            Idle.unwatch();
                            $location.path('/login');
                            $rootScope.path = location;
                        }
                        break;
                    case '/eventos':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot)
                            $location.path('/eventos');
                        else {
                            Idle.unwatch();
                            $location.path('/login');
                            $rootScope.path = location;
                        }
                        break;
                    case '/eventos/ver':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot) {
                            $location.path('/eventos/ver');
                        }
                        else {
                            Idle.unwatch();
                            $location.path('/login');
                        }
                        break;
                    case '/leads/registro':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot)
                            $location.path('/leads/registro');
                        else {
                            Idle.unwatch();
                            $location.path('/login');
                        }
                        break;
                    case '/eventos/estadisticas':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot) {
                            if ($rootScope.Globals.CurrentUserCot.intTipoUsuarioID === 1)
                                $location.path('/eventos/estadisticas');
                            else {
                                Idle.unwatch();
                                $location.path('/login');
                            }
                        }
                        else {
                            Idle.unwatch();
                            $location.path('/login');
                            $rootScope.path = location;
                        }
                        break;
                    case '/capacitacion':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot)
                            $location.path('/capacitacion');
                        else {
                            Idle.unwatch();
                            $location.path('/login');
                            $rootScope.path = location;
                        }
                        break;
                    case '/configSistemas':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot) {
                            if ($rootScope.Globals.CurrentUserCot.intTipoUsuarioID === 1)
                                $location.path('/configSistemas');
                            else {
                                Idle.unwatch();
                                $location.path('/login');
                            }
                        }
                        else {
                            Idle.unwatch();
                            $location.path('/login');
                            $rootScope.path = location;
                        }
                        break;
                    case '/configSistemas/catalogos':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot) {
                            if ($rootScope.Globals.CurrentUserCot.intTipoUsuarioID === 1)
                                $location.path('/configSistemas/catalogos');
                            else {
                                Idle.unwatch();
                                $location.path('/login');
                            }
                        }
                        else {
                            Idle.unwatch();
                            $location.path('/login');
                            $rootScope.path = location;
                        }
                        break;
                    case '/biblioteca':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot)
                            $location.path('/biblioteca');
                        else {
                            Idle.unwatch();
                            $location.path('/login');
                        }
                        break;
                    case '/Capacitacion':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot)
                            $location.path('/Capacitacion');
                        else {
                            Idle.unwatch();
                            $location.path('/login');
                        }
                        break;
                    case '/estadisticas':
                        Idle.watch();
                        if ($rootScope.Globals.CurrentUserCot)
                            $location.path('/estadisticas');
                        else {
                            Idle.unwatch();
                            $location.path('/login');
                        }
                        break;
                    default:
                        if ($rootScope.Globals.CurrentUserCot) {
                            Idle.watch(); // Inicie el contador para que se cierre sesión
                            $location.path('/');
                        }
                        else
                            $location.path('/login');
                        break;
                }
            })
        }]);