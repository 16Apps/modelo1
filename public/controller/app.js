var app = angular
    .module('myApp', ['angularMoment', 'ngMask'])
    .factory('params', function () {

        // valores universais
        return {
            env: 'Modelo 16Apps'
        }

    });

app.controller('appCtrl', function ($scope, $http, $location, params, uteisService) {

    $scope.$watch('$viewContentLoaded', async function () {
        this.options = {
            headers: { 'Content-Type': 'application/json' }
        };

        $scope.isActive = function (viewLocation) {
            const currentUrl = $location.absUrl();
            let url = currentUrl.split('/')
            return viewLocation === url[3];
        };
    });

    $scope._onMessage = async function () {

        // uteisService.onMsgBox('Olá','teste','error')
        uteisService.onQuestion('Está tudo certo...', 'info', 2000, 'top-end')

    };

});