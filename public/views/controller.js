angular.module('app', [])
  .controller('Controller', function($scope, $http,) {
    var ctrl = this;
    ctrl.response = "";
    var lastSearch = "";
    ctrl.urlpdf = "";
    ctrl.getDataFromServer = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/search?key='+$scope.bus+''
        }).then(function successCallback(response) {
            ctrl.response = response.data;
            lastSearch =  $scope.bus;
        }, function errorCallback(response) {
            console.log(response);
        });
        //lastSearch =  $scope.bus;
    };

    ctrl.generatepdf = function() {
        console.log("entra");
        $http({
            method: 'GET',
            url: 'http://localhost:3000/pdf?key='+lastSearch+''
        }).then(function successCallback(response) {
            ctrl.urlpdf = 'http://localhost:3000/pdf?key='+lastSearch+'';
            console.log(urlpdf);
           }, function errorCallback(response) {
            console.log(response);
            });
     };

  });