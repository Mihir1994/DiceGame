/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var playerScore, activePlayer, dice1, dice2, roundScore, canPlay, validTarget, previousDice, target ;
init();    
//dice = Math.floor(Math.random() * 6) + 1;


document.querySelector(".btn-roll").addEventListener('click', function(){
    if(document.querySelector('.targetId').value != 0){
        target = document.querySelector('.targetId').value;        
        validTarget = true;
    }
    else
    {
        alert("Final Score can not be 0...");
        validTarget = false;
    }
    if(canPlay && validTarget)
    {
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;
        var diceDOM1 = document.querySelector('.dice');
        var diceDOM2 = document.querySelector('.dice2')
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        if(dice1 !== 1 && dice2 !== 1)
        {
            if(previousDice === 6 && dice1 === 6)
            {
                playerScore[activePlayer] = 0;
                document.getElementById('score-' + activePlayer).textContent = playerScore[activePlayer];
                changePlayer();
            }
            else{
                roundScore += dice1 + dice2;
                document.getElementById('current-' + activePlayer).textContent = roundScore;
            }
        }
        else    
            changePlayer();
        previousDice = dice1;

    }
})

document.querySelector(".btn-hold").addEventListener('click', function(){
    if(canPlay)
    {
        playerScore[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = playerScore[activePlayer];
        document.getElementById('current-' + activePlayer).textContent = 0;
        if(playerScore[activePlayer] >= target)
        {
            document.getElementById('name-' + activePlayer).innerHTML = 'WINNER';        
            document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            roundScore = 0;
            playerScore[0] = playerScore[1] = 0;
            canPlay = false;
        }
        else
            changePlayer();   
    }
})

document.querySelector(".btn-new").addEventListener('click', init);


function changePlayer()
{
    roundScore = 0;
    previousDice = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    document.querySelector(".player-" + activePlayer + "-panel").classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(".player-" + activePlayer + "-panel").classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';  
    document.querySelector('.dice2').style.display = 'none';  
}

function init(){
    playerScore = [0,0];    
    roundScore = 0;
    activePlayer = 0;
    previousDice = 0;
    target = 0;
    validTarget = false;
    canPlay = true;    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.targetId').value = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
        
}

