const myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'schedule', 'auth', 'home', 'nav'])
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
            redirectTo: '/home'
        })
}]);
myApp.factory('apiService', function($http) {
    const apiService = {
        getGames: function(){
            return $http.get(`${basicUrl}/games`)
                
        },
        getTeams: function(){
            return $http.get(`${basicUrl}/teams`)
        },
        getTeam: function(id){
            return $http.get(`${basicUrl}/teams/${id}`)
        }
    }
    return apiService;
})
myApp.controller("MainController", ["$scope", "$location", function($scope, $location){
    
    localStorage.getItem("user") !== undefined ? $scope.isLogged = true : $scope.isLogged = false;
    // why do i have to restart after user is logged in?
    $scope.logout = () =>{
        localStorage.removeItem("user");
        $scope.isLogged = false;
        $location.path("/login");
    }
    
}])
myApp.controller('RouteController', ['$scope', '$location', function($scope, $location, $timeout) {
    $scope.currentPage = $location.path().slice(1);
    $scope.$on('$locationChangeSuccess', function() {
        $scope.currentPage = $location.path().slice(1);
    });
    
}])
