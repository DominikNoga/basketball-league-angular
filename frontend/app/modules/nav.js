const phoneSize = 630;
const nav = angular.module("nav", [])

nav.controller("NavController", ["$scope", function($scope) {
    if(window.innerWidth > phoneSize){
        $scope.phoneWidth = false;
    }
    else {
        $scope.phoneWidth = true;
    }
    // Why this is not applaying on every link click?
    $scope.navOpen = false; 
    $scope.toggleBurgerAnimation = () =>{
        $scope.navOpen = !$scope.navOpen;
    }
     
    window.addEventListener("resize", () =>{
        $scope.$apply(function(){
            if(window.innerWidth > phoneSize)
                $scope.phoneWidth = false;
            else 
                $scope.phoneWidth = true;
        });
       
    })
}])