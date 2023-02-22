const myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'schedule', 'auth', 'home'])
myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when("/home", {
            templateUrl:'views/home.html',
            controller: 'HomeController'
        })
        .when("/register", {
            templateUrl:'views/register.html',
            controller: 'AuthController'
        })
        .when("/login", {
            templateUrl:'views/login.html',
            controller: 'AuthController'
        })
        .when("/notFound", {
            templateUrl:'views/notFound.html'
        })
        .when("/leagues", {
            templateUrl:'views/leagues.html'
        })
        .when("/standings", {
            templateUrl:'views/standings.html'
        })
        .when("/schedule", {
            templateUrl:'views/schedule.html',
            controller:"ScheduleCtrl"
        })
        .when("/stats", {
            templateUrl:'views/stats.html'
        })
        .otherwise({
            redirectTo: '/notFound'
        })
}]);
myApp.controller("MainController", ["$scope","$route", function($scope, $route){
    localStorage.getItem("user") !== undefined ? $scope.isLogged = true : $scope.isLogged = false;
    $scope.logout = () =>{
        localStorage.removeItem("user");
        $scope.isLogged = false;
        $route.reload()
    }
    
}])