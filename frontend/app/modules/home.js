const basicUrl = "http://localhost:3000"
const tileWidth = 260;
const venues = ["II Hihghschool in Gdynia", "V Highschool in Sopot", "HSW Gdynia"]
const home = angular.module("home", [])
class Game{
    constructor(team1, team2, gameDate, t1Points, t2Points, venue){
        this.team1 = team1
        this.team2 = team2
        this.gameDate = new Date(gameDate)
        this.t1Points = t1Points || "-";
        this.t2Points = t2Points || "-";
        this.venue = venue
    }
}
home.directive("gameTile",[function(){
        return {
            restrict: 'E', // our directive can only be an element
            templateUrl:'components/game-tile.html',
            replace:true, // it will replace our custom tag with the first tag matched inside template
        }
}]);
home.controller("HomeController", ["$scope", "$q", "apiService","$timeout", function($scope, $q, apiService){
    $scope.startPoint = 0;
    $scope.endPoint = Math.floor(window.innerWidth/tileWidth);
    window.addEventListener("resize", () =>{
        const currentEndPoint = $scope.endPoint;
        const tilesNumber = $scope.endPoint - $scope.startPoint;
        const newTilesNumber = Math.ceil(window.innerWidth/tileWidth);
        $scope.$apply(function(){
            $scope.endPoint = currentEndPoint - (tilesNumber - newTilesNumber);
            $scope.games = $scope.allGames.slice($scope.startPoint, $scope.endPoint);
        })
        
    })
    $q.all([apiService.getGames(), apiService.getTeams()])
        .then(values => {
            const [{data:games}, {data:teams}] = values;
            let gameObjects = [];
            games.forEach(game =>{
                const {name: t1} = teams.find(t => t.id === game.team1)
                const {name: t2} = teams.find(t => t.id === game.team2)
                gameObjects = [...gameObjects, 
                    new Game(t1, t2, game.gameDate, game.t1Points, game.t2Points, venues[Math.floor(Math.random() *venues.length)])
                ]
            })
            gameObjects.sort((g1, g2) => {
                return g1.gameDate.getTime()- g2.gameDate.getTime()
            });
            $scope.games = gameObjects.slice($scope.startPoint, $scope.endPoint);
            $scope.allGames = gameObjects;
        })
    // Why there is additional slide showing after clicking
    $scope.slide = function(val) {
        $scope.startPoint += val;
        $scope.endPoint += val;
        $scope.games = $scope.allGames.slice($scope.startPoint, $scope.endPoint);
    };
      
}]);

home.controller("LeagueTable", ["$scope", "apiService", "$q",function($scope, apiService, $q){
    $scope.currentLeague = 1;
    apiService.getTeams()
        .then(({data: teams}) =>{
            const teamsPoints = teams.map(team =>{
                return {
                    name:team.name,
                    league: team.league,
                    wins: team.wins,
                    losses: team.losses,
                    points: team.points
                }
            }) 
            $scope.allTeams = teamsPoints;
            $scope.setCurrentTable($scope.currentLeague);
        })
    $scope.setCurrentTable = (league) =>{
        $scope.currentTeams = $scope.allTeams.filter(team => team.league === league)
            .sort((t1, t2) => t1.t1Points > t2.points)
    }
}])