const basicUrl = "http://localhost:3000"
angular.module("myApp")
    .factory('apiService', function($http) {
        return {
            get: (endPoint) =>{
                return $http.get(`${basicUrl}/${endPoint}`)
            },
            post: (endPoint, body) =>{
                return $http.post(`${basicUrl}/${endPoint}`, body)
            }
        }
    })