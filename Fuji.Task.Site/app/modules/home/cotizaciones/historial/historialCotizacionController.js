angular.module('Task').controller('historialCotizacionController', ['$scope', '$rootScope', '$mdDialog', '$location', 'cotizacionesServices', 'cotizacion',
    function ($scope, $rootScope, $mdDialog, $location, cotizacionesServices, cotizacion) {
        $scope.loading = false;
        $scope.cot = cotizacion;
        $scope.Documentos = [];

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };


        function load() {
            $scope.loading = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    intCotizacionID: $scope.cot.intCotizacionID
                };
                cotizacionesServices.ObtenerHistorialCotizacion(request, function (response) {
                    if (response.Success) {
                        $scope.labels = response.labels;
                        //$scope.data = response.Totales;
                        $scope.data = response.Data;
                    }
                    $scope.loading = false;
                });
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Existe un error: " + Exce.Message);
            }
        }
        load();

        $scope.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    }
                ]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].x || '';

                        //if (label) {
                        //    label += ': ';
                        //}
                        //label += Math.round(tooltipItem.yLabel * 100) / 100;
                        return label;
                    }
                }
            }
        };
    }]);