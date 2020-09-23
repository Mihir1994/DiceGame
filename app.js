/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var playerScore, activePlayer, dice, roundScore, canPlay;
activePlayer = 0;
init();    
dice = Math.floor(Math.random() * 6) + 1;

document.querySelector(".btn-roll").addEventListener('click', function(){
    
    if(canPlay)
    {
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if(dice !== 1)
        {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
        else    
            changePlayer();
    }
})

document.querySelector(".btn-hold").addEventListener('click', function(){
    if(canPlay)
    {
        playerScore[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = playerScore[activePlayer];
        document.getElementById('current-' + activePlayer).textContent = 0;
        if(playerScore[activePlayer] >= 20)
        {
            document.getElementById('name-' + activePlayer).innerHTML = 'WINNER';        
            document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
            document.querySelector('.dice').style.display = 'none';
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
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    document.querySelector(".player-" + activePlayer + "-panel").classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(".player-" + activePlayer + "-panel").classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';  
}

function init(){
    playerScore = [0,0];    
    roundScore = 0;
    activePlayer = 0;
    canPlay = true;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
        
}

