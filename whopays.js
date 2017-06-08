//data

var dataController = (function() {
  return {
    list : [],
    addNameToList : function(name){
      this.list.push(name);
    },
    removeNameFromList : function(index){
       this.list.splice(index, 1);

    },
    chooseRandomPerson : function(){
       var lengthList = this.list.length;
       var randomNumber =  Math.floor(Math.random()*lengthList);
       return this.list[randomNumber];
    },
    calculateDebt : function(value){
       var owedPerPerson = (value / this.list.length);
       return owedPerPerson;

    }



  }


})();


//ui
var uiController = (function(dataCtrl){

    return {
      changeLoserName : function(){
        var newName = dataCtrl.chooseRandomPerson();
        if(newName !== undefined){
          document.getElementById('loser-name').innerHTML = newName;
        }
        else{
          document.getElementById('loser-name').innerHTML = "please select potential losers";

        }
      },
      addLoserName : function(){

        inputfield = document.getElementById("get-loser");
        newLoser = inputfield.value;
        targetElement = document.querySelector("ul");
        dataCtrl.addNameToList(newLoser);
        var html = '<div class= "name-holder" ><h2 class = %name% id ="name"> %name% </h2></div>';

        var newHtml = html.replace('%name%','"' + newLoser + " active" + '"' );
        newHtml = newHtml.replace('%name%',newLoser);

        console.log(newHtml);

        targetElement.insertAdjacentHTML('afterbegin', newHtml);
        inputfield.value = "";

      },
      showOwedAmount : function(){
        var paidAmount =  document.getElementById("input-amount-paid").value;
        paidAmount = parseInt(paidAmount);
        owedAmount = dataCtrl.calculateDebt(paidAmount);
        if(owedAmount > 0 ){
          bigValueOnScreen = document.getElementById("amount-to-pay");
          bigValueOnScreen.innerHTML = owedAmount;
        }
        else{
          bigValueOnScreen = document.getElementById("amount-to-pay");
          bigValueOnScreen.innerHTML = "make sure to add people";
        }

      }

    }



})(dataController);




//controller

var controller =  (function(dataCtrl, UICtrl){



   var allNames =  document.querySelector("ul");

   allNames.addEventListener('click', function(event){
     var elementClicked =  event.target;
     var checkID = elementClicked.id;
     var name = elementClicked.className;
     var index = dataCtrl.list.indexOf(name);
     if(index == -1 && checkID.includes("name") && !name.includes("active")){

       dataCtrl.addNameToList(name);
       elementClicked.classList.add("active");
       console.log(dataCtrl.list);

     }
     else if(checkID.includes("name")){
       dataCtrl.removeNameFromList(index);
       elementClicked.classList.remove("active");
       console.log(dataCtrl.list);
     }
   });

   var chooseLoserButton = document.getElementById("chooseLoser");

   chooseLoserButton.addEventListener('click', function(){

     UICtrl.changeLoserName();


   });

   var addLoserButton = document.getElementById("add-loser-button");

   addLoserButton.addEventListener('click',function(){

     UICtrl.addLoserName();


   });

   document.addEventListener('keypress', function(event)
      {
        if (event.keyCode === 13 || event.which === 13){
          UICtrl.addLoserName();

        }
      });

  var showOwedAmount = document.getElementById("calculate-amount-button");

  showOwedAmount.addEventListener('click', function(){
      UICtrl.showOwedAmount();

  })





})(dataController,uiController);
