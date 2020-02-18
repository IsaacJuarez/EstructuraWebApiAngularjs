angular.module('TaskMDL').controller('documentosClienteController', ['$scope', '$rootScope', '$mdDialog', '$location', 'clientesServices', 'cliente',
    function ($scope, $rootScope, $mdDialog, $location, clientesServices, cliente) {
        $scope.loading = false;
        $scope.cliente = cliente;
       
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
                    Cliente: $scope.cliente.intClienteID
                };
                clientesServices.ObtenerDocumentosCliente(request, function (responseDocs) {
                    $scope.Documentos = responseDocs;
                //    cotizacionesServices.ObtenerDetalleCliente(request, function (response) {
                //        if (response.Success) {
                //            $scope.Cliente = response.cliente;
                //        }
                        $scope.loading = false;
                    });
                //});
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Existe un error: " + Exce.Message);
            }
        }
        load();

        $scope.EnviarDocumentos = function (cliente, docs, ev) {
            if (validarDocs(docs)) {
                $scope.loading = true;
                try {
                    var Docs = refactorDoc(docs);
                    var request = {
                        token: $rootScope.Globals.CurrentUserCot.Token,
                        Cliente: cliente,
                        Docs: Docs,
                        UserId: $rootScope.Globals.CurrentUserCot.intUsuarioID
                    };
                    clientesServices.EnviarDocumentos(request, function (response) {
                        if (response.Success) {
                            $mdDialog.hide(response);
                        }
                        else {
                            var alert = $mdDialog.alert({
                                title: 'Mensaje del sistema',
                                textContent: response.Message,
                                ok: 'Aceptar',
                                skipHide: true
                            });
                            $mdDialog.show(alert);
                        }
                        $scope.loading = false;
                    });
                }
                catch (Exce) {
                    $scope.loading = false;
                    console.log('Error : ' + Exce.Message);
                }
            }
            else {
                var alert = $mdDialog.alert({
                    title: 'Mensaje del sistema',
                    textContent: 'Favor de seleccionar al menos un documento a enviar.',
                    ok: 'Aceptar',
                    skipHide: true
                });
                $mdDialog.show(alert);
            }
        };

        function validarDocs(docs) {
            var valido = true;
            for (i = 0; i < docs.length; i++) {
                if (docs[i].Enviar) {
                    valido = true;
                }
            }
            return valido;
        }

        function refactorDoc(docs) {
            for (i = 0; i < docs.length; i++) {
                docs[i].bitCompleto = docs[i].Enviar;
            }
            return docs;
        }

    }]);