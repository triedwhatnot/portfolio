// TIC-TAC-TOE

var activePlayer = 1;
var gamePlaying = false;
var count;

//initiating function
function init(){
    
    gamePlaying = true;
    count = 0;
   
    document.querySelector('.player-1').innerHTML = 'PLAYER 1 <i class="ion-ios-circle-filled"></i><i class="ion-person"></i>';
    document.querySelector('.player-2').innerHTML = 'PLAYER 2 <i class="ion-ios-circle-filled"></i><i class="ion-person"></i>';
        

    document.querySelector('.player-1').classList.remove('winner');
    document.querySelector('.player-2').classList.remove('winner');  
    document.querySelector('.player-1').classList.remove('active');
    document.querySelector('.player-2').classList.remove('active'); 
    document.querySelector('.player-1').classList.remove('draw');
    document.querySelector('.player-2').classList.remove('draw');
    document.querySelector('.player-1').classList.add('active');
    activePlayer = 1;
    
    for(var i = 1; i < 10; i++){
             document.querySelector('#box-' + i).classList.remove('ion-ios-close-empty');
        }
    
    for(var i = 1; i < 10; i++){
             document.querySelector('#box-' + i).classList.remove('ion-ios-circle-outline');
        }
}


document.querySelector('.btn-tic').addEventListener('click', init); //call init funtion when new game button clicked


//adding entry in boxes
document.addEventListener('click',function(event) {

if( gamePlaying && count < 9 ){
    
    var x = event.target.id;
    //console.log(x);
    
    if(x){

            var y = x.split('-'); //y[1] gives index of tile

            if(activePlayer === 1 && !(document.querySelector('#box-' + y[1]).classList.contains('ion-ios-close-empty')) && !(document.querySelector('#box-' + y[1]).classList.contains('ion-ios-circle-outline')))
            {
                document.querySelector('#box-' + y[1]).classList.add('ion-ios-close-empty');

                count++;
                nextAction();
            }

            else if(activePlayer === 2 && !(document.querySelector('#box-' + y[1]).classList.contains('ion-ios-close-empty')) && !(document.querySelector('#box-' + y[1]).classList.contains('ion-ios-circle-outline')))
            {
                document.querySelector('#box-' + y[1]).classList.add('ion-ios-circle-outline');
                
                count++;
                nextAction();
            }
        
        }
    
    }
});

//deciding next stage
function nextAction() {
        var result = checkForWinner();
        
        if(result){ 
            gamePlaying = false;
            document.querySelector('.player-' + activePlayer).classList.remove('active');
            document.querySelector('.player-' + activePlayer).classList.add('winner');
            document.querySelector('.player-' + activePlayer).innerHTML = 'WINNER   <i class="ion-ios-circle-filled"></i><i class="ion-person"></i>';
        }
        else {
            document.querySelector('.player-' + activePlayer).classList.remove('active');
            (activePlayer === 1)? activePlayer = 2 : activePlayer = 1; //switch active player 
            document.querySelector('.player-' + activePlayer).classList.add('active');      
        }

                  
        if(count === 9 && gamePlaying === true) { 
        gamePlaying = false;
        document.querySelector('.player-' + activePlayer).classList.remove('active');
        document.querySelector('.player-1').classList.add('draw');
        document.querySelector('.player-2').classList.add('draw');
        document.querySelector('.player-1').innerHTML = 'DRAW   <i class="ion-ios-circle-filled"></i><i class="ion-person"></i>';
        document.querySelector('.player-2').innerHTML = 'DRAW   <i class="ion-ios-circle-filled"></i><i class="ion-person"></i>';
    }
}


//checkForWinner function

function checkForWinner(){
    var pattern;
    // 8 patterns possible tiles:{1,2,3} {4,5,6}{7,8,9}{1,4,7}{2,5,8}{3,6,9}{3,5,7}{1,5,9} 
    if (activePlayer === 1) {pattern = 'ion-ios-close-empty';}
    else if (activePlayer === 2) {pattern = 'ion-ios-circle-outline';}
    
    
    var twoDimArr = [
                        [1,2,3],
                        [4,5,6],
                        [7,8,9]
                    ];
       // check row 
        
        for(let row  = 0; row < 3; row++){
            let checkRow = 0;
            for(let col= 0 ; col < 2; col++){
            
                
            if(document.getElementById(`box-${twoDimArr[row][col]}`).classList.contains(pattern) === document.getElementById(`box-${twoDimArr[row][col+1]}`).classList.contains(pattern) && document.getElementById(`box-${twoDimArr[row][col]}`).classList.contains(pattern) === true ) 
                
                        {checkRow++;}
        
                } 
            if(checkRow === 2) {return true;}
            }
                
                        
        //check column
          
          for(let col = 0; col < 3; col++){
              let checkColumn = 0;
            for(let row = 0 ; row < 2; row++){
            
                
            if(document.getElementById(`box-${twoDimArr[row][col]}`).classList.contains(pattern) === document.getElementById(`box-${twoDimArr[row+1][col]}`).classList.contains(pattern)  && document.getElementById(`box-${twoDimArr[row][col]}`).classList.contains(pattern) === true) 
                
                        {checkColumn++;}
        
                } 
            if(checkColumn === 2) {return true;}
            }
          
    
        //check diagonal
            var checkDiagonal1 = 0;
            for(let i = 0; i < 2; i++){
            
                    
            if(document.getElementById(`box-${twoDimArr[i][i]}`).classList.contains(pattern) === document.getElementById(`box-${twoDimArr[i+1][i+1]}`).classList.contains(pattern)  && document.getElementById(`box-${twoDimArr[i][i]}`).classList.contains(pattern) === true) 
                
                        {checkDiagonal1++;
                        console.log(`diagonal1 check${i}`);}
            if(checkDiagonal1 === 2) {return true;}
            }
    
        var checkDiagonal2 = 0;
            for(let i = 0, j = 2; i < 2, j > 0; i++, j--){
            
                    
            if(document.getElementById(`box-${twoDimArr[i][j]}`).classList.contains(pattern) === document.getElementById(`box-${twoDimArr[i+1][j-1]}`).classList.contains(pattern)  && document.getElementById(`box-${twoDimArr[i][j]}`).classList.contains(pattern) === true) 
                
                        {checkDiagonal2++;
                                                console.log(`diagonal2 check${i}`);}
            if(checkDiagonal2 === 2) {return true;}
            }
              
    return false;
    
}
/*
    if(document.getElementById('box-1').classList.contains(pattern) && document.getElementById('box-2').classList.contains(pattern) && document.getElementById('box-3').classList.contains(pattern)) return true;
    
    else if(document.getElementById('box-4').classList.contains(pattern) && document.getElementById('box-5').classList.contains(pattern) && document.getElementById('box-6').classList.contains(pattern)) return true;
    
    else if(document.getElementById('box-7').classList.contains(pattern) && document.getElementById('box-8').classList.contains(pattern) && document.getElementById('box-9').classList.contains(pattern)) return true;
    
    else if(document.getElementById('box-1').classList.contains(pattern) && document.getElementById('box-4').classList.contains(pattern) && document.getElementById('box-7').classList.contains(pattern)) return true;
    
    else if(document.getElementById('box-2').classList.contains(pattern) && document.getElementById('box-5').classList.contains(pattern) && document.getElementById('box-8').classList.contains(pattern)) return true;
    
    else if(document.getElementById('box-3').classList.contains(pattern) && document.getElementById('box-5').classList.contains(pattern) && document.getElementById('box-7').classList.contains(pattern)) return true; 
    
    else if(document.getElementById('box-3').classList.contains(pattern) && document.getElementById('box-6').classList.contains(pattern) && document.getElementById('box-9').classList.contains(pattern)) return true;
    
    else if(document.getElementById('box-1').classList.contains(pattern) && document.getElementById('box-5').classList.contains(pattern) && document.getElementById('box-9').classList.contains(pattern)) return true;
    
    else 
        {return false;} 
        */






//Next Section: Tile Game

var gameOn = false;

function initiateGame(){
    
    gameOn = true;
    countTile = 0;
       
    var str = '';
    for(var i = 11; i < 30; i++){
        
        str+= '#tile-' + i +', ';
    }
    str += '#tile-30';
    
    var nodeListCheck = document.querySelectorAll(str);
    var arrNodeList = Array.from(nodeListCheck);
    
    arrNodeList.forEach(function(cur){
        
        cur.classList.remove('animated');
        cur.style.transform = '';     
        cur.style.backgroundColor = '#cbe4fd';
                
    });
    
    
    var str2 = '';
    for(var i = 11; i < 30; i++){
        
        str2+= '.num-' + i +', ';
    }
    str2 += '.num-30';
    
    var nodeListCheck2 = document.querySelectorAll(str2);
    var arrNodeList2 = Array.from(nodeListCheck2);
    
    arrNodeList2.forEach(function(cur){
        
        cur.style.display = 'none';
        cur.style.transform = '';
                
    });
    
    
    document.querySelector('.player-name-1').style.display = "none";
    document.querySelector('.player-name-2').style.display = "none";
        
}


document.querySelector('.btn-tile-game').addEventListener('click', initiateGame);

var targetTile, arrTargetTile, countTile = 0, previousTargetTile;

document.addEventListener('click', function(event){ 
        targetTile = event.target.id;
        
        if(targetTile){
            arrTargetTile = targetTile.split('-');


            if( !(document.getElementById('tile-' + arrTargetTile[1]).classList.contains('animated'))) {

            document.querySelector('.num-' + arrTargetTile[1]).style.display = 'inline-block';
            document.getElementById('tile-' + arrTargetTile[1]).classList.add('animated');
            document.getElementById('tile-' + arrTargetTile[1]).style.backgroundColor = 'white';
            document.getElementById('tile-' + arrTargetTile[1]).style.transform = 'rotateY(180deg)';
            document.querySelector('.num-' + arrTargetTile[1]).style.transform = 'rotateY(180deg)';
            
            countTile++;
                
                
                if(countTile % 2 === 0) {
                   setTimeout(checkForPair,500,previousTargetTile);
                
                }
                previousTargetTile = arrTargetTile[1];
                
            }

        }

});

function checkForPair(previous){

    //if(arrTargetTile[1] !== 20 || arrTargetTile[1] !== 30)    var num = String((arrTargetTile[1]) % 10);
    //else    var num = '10';
 var toBeChecked;
    if(arrTargetTile[1] < 21) toBeChecked = parseInt(arrTargetTile[1]) + 10;
    else toBeChecked = parseInt(arrTargetTile[1]) - 10;
    
    if( !document.getElementById('tile-' + toBeChecked).classList.contains('animated')) {
                
        document.querySelector('.num-' + arrTargetTile[1]).style.display = 'none';
        document.getElementById('tile-' + arrTargetTile[1]).classList.remove('animated');
        document.querySelector('.num-' + previous).style.display = 'none';
        document.getElementById('tile-' + previous).classList.remove('animated');
        document.getElementById('tile-' + arrTargetTile[1]).style.transform = '';
        document.querySelector('.num-' + arrTargetTile[1]).style.transform = '';
        document.getElementById('tile-' + previous).style.transform = '';
        document.querySelector('.num-' + previous).style.transform = '';
        
        document.getElementById('tile-' + arrTargetTile[1]).style.backgroundColor = '#cbe4fd';
        document.getElementById('tile-' + previous).style.backgroundColor = '#cbe4fd';
        
    }
    
    //check if game is over or not
    var str = '';
    for(var i = 11; i < 30; i++){
        
        str+= '#tile-' + i +', ';
    }
    str += '#tile-30';
    
    var nodeListCheck = document.querySelectorAll(str);
    var arrNodeList = Array.from(nodeListCheck);
    
    var checkArrNode = arrNodeList.map(function(cur){
        
       return cur.classList.contains('animated');
        
    });
   
    var checkForFalse = checkArrNode.findIndex(cur => cur === false);
    if(checkForFalse === -1) 
        {
        
        gameOn = false;
        
        document.querySelector('.player-name-1').style.display = "inline-block";
        document.querySelector('.player-name-2').style.display = "inline-block";
    }
    
}
    
   /* 
    if( document.getElementById('tile-11').classList.contains('animated') && document.getElementById('tile-12').classList.contains('animated') && document.getElementById('tile-13').classList.contains('animated') && document.getElementById('tile-14').classList.contains('animated') && document.getElementById('tile-15').classList.contains('animated') && document.getElementById('tile-16').classList.contains('animated') && document.getElementById('tile-17').classList.contains('animated') && document.getElementById('tile-18').classList.contains('animated') && document.getElementById('tile-19').classList.contains('animated') && document.getElementById('tile-20').classList.contains('animated') && document.getElementById('tile-21').classList.contains('animated') && document.getElementById('tile-22').classList.contains('animated') && document.getElementById('tile-23').classList.contains('animated') && document.getElementById('tile-24').classList.contains('animated') && document.getElementById('tile-25').classList.contains('animated') && document.getElementById('tile-26').classList.contains('animated') && document.getElementById('tile-27').classList.contains('animated') && document.getElementById('tile-28').classList.contains('animated') && document.getElementById('tile-29').classList.contains('animated') && document.getElementById('tile-30').classList.contains('animated') ) {
        
        gameOn = false;
        
        document.querySelector('.player-name-1').style.display = "inline-block";
        document.querySelector('.player-name-2').style.display = "inline-block";
    }
    
    */
    


//Trying to add jquery


$(document).ready(function(){
    
$('a[href*="#"]').on('click', function(e) {
  e.preventDefault()

  $('html, body').animate(
    {
      scrollTop: $($(this).attr('href')).offset().top,
    },
    500,
    'linear'
  )
})
    
    

});

//trying to add button onclick

function toDoThis() {
 // e.preventDefault()

  $('html, body').animate(
    {
      scrollTop: $('#tile-game-id').offset().top,
    },
    500,
    'linear'
  )
}


//reach us button

function moveToForm(){
    
    $('html, body').animate({
        
        
        scrollTop: $('#form-id').offset().top
    }, 500
);
    
}






























