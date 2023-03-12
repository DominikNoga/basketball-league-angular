const auth = angular.module("auth", []);

auth.controller("AuthController", ["$scope", "$location", "authService", function($scope, $location, authService) {
    $scope.isLoading = false;
    $scope.addUser = async function(e, fname, lname, email, password, password2){
        try {
            $scope.isLoading = true
            e.preventDefault();
            const registerResult = await authService.addUser(fname, lname, email, password, password2)
            if(!(registerResult instanceof Error)){
                $scope.isLoading = false
                $location.path("/login")
            }
            else
                throw registerResult;
            
        } catch (error) {
            $scope.isLoading = false
            $scope.errorMessage = error.message
        }
    }
    $scope.authUser = async function (e, email, password){
        try {
            e.preventDefault()
            $scope.isLoading = true;
            const loginResult = await authService.authUser(email, password)
            if(!(loginResult instanceof Error)){
                $scope.isLoading = false
                localStorage.setItem('user',JSON.stringify(loginResult))
                $location.path('/home')
            }
            else
                throw loginResult
             
        } catch (error) {
            $scope.isLoading = false
            $scope.errorMessage = error.message
        }
               
    }
}]);