angular.module('Task').controller('addRegistroController', ['$scope', '$rootScope', '$mdDialog', 'leadsServices','evento',
    function ($scope, $rootScope, $mdDialog, leadsServices, evento) {
        $scope.loading = false;
        $scope.existe = false;
        $scope.evento = evento;
        $scope.Estados = [];
        $scope.Obs = {
            readonly: false,
            selectedItem: null,
            searchText: null,
            querySearch: querySearch,
            Observaciones: [],
            selectedObs: [],
            numberChips: [],
            numberChips2: [],
            numberBuffer: '',
            autocompleteDemoRequireMatch: false,
            transformChip: transformChip
        };

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        function load() {
            $scope.loading = true;
            var request = {
                id: 0,
                token: $rootScope.Globals.CurrentUserCot.Token,
                evento: $scope.evento
            };
            leadsServices.ObtenerProductos(request, function (response) {
                leadsServices.ObtenerEstados(request, function (responseEst) {
                    $scope.loading = false;
                    $scope.ObsResponse = response;
                    $scope.Obs.Observaciones = loadObservaciones();
                    $scope.Estados = responseEst;
                });
            });
        }
        load();

        function loadObservaciones() {
            var veggies = [];
            veggies = $scope.ObsResponse;
            if (veggies.length > 0) {
                return veggies.map(function (veg) {
                    veg._lowername = veg.intProductoID.toString().toLowerCase();
                    veg._lowertype = veg.vchNombreProducto.toLowerCase();
                    return veg;
                });
            }
        }

        $scope.AgregarProspecto = function (prospecto, ev) {
            $scope.loading = true;
            try {
                var Request = {
                    Evento: $scope.evento,
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    intUserID: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                    prospecto: prospecto,
                    Productos: $scope.Obs.selectedObs
                };
                leadsServices.AgregarProspecto(Request, function (response) {
                    $scope.loading = false;
                    if (response.Success)
                        $mdDialog.hide(response);
                    else {
                        var alert = $mdDialog.alert({
                            title: 'Advertencia',
                            textContent: response.Message,
                            ok: 'Aceptar',
                            skipHide: true
                        });
                        $mdDialog.show(alert);
                    }
                });

            }
            catch (Exce) {
                console.log("Error en AgregarProspecto: " + Exce.Message);
                $scope.loading = false;
            }
        };

        function createFilterFor(query) {
            var lowercaseQuery = query.toLowerCase();

            return function filterFn(vegetable) {
                return (vegetable._lowername.indexOf(lowercaseQuery) === 0) ||
                    (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
            };

        }

        function querySearch(query) {
            var results = query ? $scope.Obs.Observaciones.filter(createFilterFor(query)) : [];
            return results;
        }

        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }

            // Otherwise, create a new one
            return { vchNombreProducto: chip, intObsID: 'new' };
        }
    }]);
