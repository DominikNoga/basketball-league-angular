function LeagueTableController($scope, apiService){
    $scope.currentLeague = 1;
    apiService.get("teams")
        .then(({data: teams}) =>{
            const teamsResults = teams.map(team =>{
                return {
                    name: team.name,
                    league: team.league,
                    wins: team.wins,
                    losses: team.losses,
                    points: team.points
                }
            }) 
            $scope.allTeams = teamsResults;
            $scope.setCurrentTable($scope.currentLeague);
        })
    $scope.setCurrentTable = (league) =>{
        $scope.currentTeams = $scope.allTeams.filter(team => team.league === league)
            .sort((t1, t2) => t2.points - t1.points)
        $scope.currentLeague = league;
    }
}

angular.module("home")
    .component("leagueTable", {
        controller: LeagueTableController,
        controllerAs: "ctrl",
        templateUrl:"components/league-table.html"
    })