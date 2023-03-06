const url = "http://localhost:3000"
const auth = angular.module("auth", []);

auth.controller("AuthController", ["$scope", "$location", "$http", function($scope, $location, $http) {
    $scope.isLoading = false;
    $scope.addUser = async function(e, fname, lname, email, password, password2){
        try {
            $scope.isLoading = true
            e.preventDefault();
            if(password !== password2){
                $scope.isLoading = false
                throw new Error("Both passwords must be the same")
            }
            const {data : users} = await $http.get(`${url}/users`)
            if(users.map(user => user.email).includes(email)){
                $scope.isLoading = false
                throw new Error("This email address is already taken");
            }
            $http.post(`${url}/users`, {
                id: Math.floor(Math.random()*99999),
                name: fname,
                lastName: lname,
                email: email,
                password: password,
                role: "player"
            })
            .then(() =>{
                $location.path("/login")
            })
            .catch(error =>{
                $scope.errorMessage = error.message
            })
            .finally(() =>{
                for(let i = 0; i < 2000000000;i++); // REMOVE ON PRODUCTION !!!
                $scope.isLoading = false
            })
        } catch (error) {
            console.log(error)
            $scope.isLoading = false
            $scope.errorMessage = error.message
        }
    }
    $scope.authUser = async function (e, email, password){
        e.preventDefault()
        $scope.isLoading = true;
        $http.get(`${url}/users`)
            .then(({data:users}) =>{
                const user = users.find(user => user.email === email && user.password === password)
                if (user) {
                    localStorage.setItem('user',JSON.stringify(user))
                    $location.path('/home')
                }
                else{
                    throw new Error("Wrong email or password. Try again")
                }
            })
            .catch(({message}) =>{
                $scope.errorMessage = message
            })
            .finally(() =>{
                for(let i = 0; i < 2000000000; i++); // REMOVE ON PRODUCTION !!!
                $scope.isLoading = false
            })
    }
}]);