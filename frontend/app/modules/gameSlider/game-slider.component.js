const tileWidth = 260;
const venues = ["II Hihghschool in Gdynia", "V Highschool in Sopot", "HSW Gdynia"]
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
function gameSliderController($scope, $q, apiService){
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
    $q.all([apiService.get("games"), apiService.get("teams")])
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
}
angular.module("home")
    .component("gameSlider", {
        controller: gameSliderController,
        templateUrl: "components/game-slider.html"
    })