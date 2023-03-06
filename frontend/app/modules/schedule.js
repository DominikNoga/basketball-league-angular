const schedule = angular.module("schedule", ['ngAnimate']);
class Day{
    constructor(number, plans=null){
        this.number = number;
        this.plans = plans;
    }
}
class DateManager{
    constructor(){
        this.days = [];
        this.setDays();
        this.currentDate = new Date();
        this.forwards = true;
    }
    getDaysNumber(year, month){
        const data = new Date(year, month + 1, 0);
        return data.getDate();
    }
    setDays(today=new Date()){
        this.days = new Array()
        const daysNum  = this.getDaysNumber(today.getFullYear(), today.getMonth());
        for (let i = 0; i < daysNum; i++)
            this.days = [...this.days, i + 1]
    }
    setDate(date){
        if(Number(date) > Number(this.currentDate))
            changeDaysAnimation("days-forwards")
        else   
            changeDaysAnimation("days-backwards") 
        this.currentDate = date;
        this.setDays(this.currentDate)
    }
    changeDate(number){
        number > 0 ? this.forwards = true : this.forwards = false
        this.currentDate.setMonth(this.currentDate.getMonth() + number);       
        this.setDays(this.currentDate)

    }

}
function changeDaysAnimation(className){
    const dayTiles = document.querySelectorAll(".day-tiles");
    dayTiles.forEach(day =>{
        day.classList.remove("days-forwards")
        day.classList.remove("days-backwards")
    })
    setTimeout(function() {
        dayTiles.forEach(day =>{
            day.classList.add(className)
        })
    }, 50);
}
schedule.controller("ScheduleCtrl",["$scope", function($scope) {
    $scope.dm = new DateManager();
    $scope.animateWithDaysForwards = function() {
        changeDaysAnimation("days-forwards")
    };

    $scope.animateWithDaysBackwards = function() {
        changeDaysAnimation("days-backwards")
    };
}])
