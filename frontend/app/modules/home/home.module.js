const home = angular.module("home", [])
home.directive("gameTile",[function(){
        return {
            restrict: 'E', // our directive can only be an element
            templateUrl:'components/game-tile.html',
            replace:true, // it will replace our custom tag with the first tag matched inside template
        }
}]);
