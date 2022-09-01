
const ticTacToe = (() => {
    
    'use strict'


    const tiles    = document.querySelectorAll('.tile'),
          player_X = 'X',
          player_O = 'O';

    let turn = player_X;

    const boardState = Array(tiles.length);
    boardState.fill(null);

    //Elements

    const strike       = document.getElementById('strike'),
          gameOverArea = document.getElementById('game-over-area'),
          gameOverText = document.getElementById('game-over-text'),
          playAgain    = document.getElementById('play-again');

    //Sounds


    const endGameSound = new Audio( 'sounds/piano-suspenses-sound.mp3'),
          playerSound1 = new Audio( 'sounds/bassReverb.mp3'),
          playerSound2 = new Audio( 'sounds/synthBass.mp3');
        


    //Winnig combinations to determine a winner

    const winningCombinations = [
        //rows
        {combo:[1 ,2 ,3] , strikeClass : 'strike-row-1'},
        {combo:[4 ,5 ,6] , strikeClass : 'strike-row-2'},
        {combo:[7 ,8 ,9] , strikeClass : 'strike-row-3'},
        //columns
        {combo:[1 ,4 ,7] , strikeClass : 'strike-column-1'},
        {combo:[2 ,5 ,8] , strikeClass : 'strike-column-2'},
        {combo:[3 ,6 ,9] , strikeClass : 'strike-column-3'},
        //diagonal
        {combo:[1 ,5 ,9] , strikeClass : 'strike-diagonal-1'},
        {combo:[3 ,5 ,7] , strikeClass : 'strike-diagonal-2'},
    ];
        

    const setHoverText = () => {
        //remove all hover text
        tiles.forEach( (tile)  => {
            tile.classList.remove('x-hover');
            tile.classList.remove('o-hover');
        });

        const hoverClass = `${turn.toLowerCase()}-hover`;

        tiles.forEach(tile => {
            if(tile.innerText == '') {
                tile.classList.add(hoverClass);
            }
        })

    }

    setHoverText();

    const gameOverScreen = (winnerText) => {
        let text = 'draw'
        if(winnerText != null){
            text = `Winner is ${winnerText}!`
        }

        gameOverArea.className = 'visible';
        gameOverText.innerText = text;
        endGameSound.play();

    }



    const checkWinner = () => {
        
        //check for a winner

        for(const winningCombination of winningCombinations){
            
            const {combo ,strikeClass} = winningCombination;

            const tileValue1 = boardState[combo[0] - 1],
                  tileValue2 = boardState[combo[1] - 1],
                  tileValue3 = boardState[combo[2] - 1];

            if(( tileValue1 != null ) && ( tileValue1    ===tileValue2 ) && ( tileValue1 === tileValue3 )){
                
                strike.classList.add(strikeClass);

                gameOverScreen(tileValue1);
                
                return;
            }

        }

        //check for a draw

        const allFilesFilledIn = boardState.every((tile) => tile !== null);
        
        if(allFilesFilledIn==true){
            gameOverScreen(null);
        }

    }



    //what happend with the click

    const tileClick = (event) =>{

        if(gameOverArea.classList.contains('visible')){
                return;
        }

        const tile = event.target;
        const tileNumber = tile.dataset.index;

        if(tile.innerText != ''){
            return;
        }

        if(turn === player_X){
            tile.innerText = player_X;
            boardState[tileNumber - 1] = player_X;
            turn = player_O;

            playerSound1.play();
            playerSound2.pause();
            playerSound2.currentTime = 0;
        }
        else{
            tile.innerText = player_O;
            boardState[tileNumber - 1] = player_O;
            turn = player_X;

            playerSound2.play();
            playerSound1.pause();
            playerSound1.currentTime = 0;
        }
        
        setHoverText();

        checkWinner();
    } 

    //start a new game

    const startNewGame = () => {
        strike.className = 'strike';
        gameOverArea.className = 'hidden';
        boardState.fill(null);
        tiles.forEach((tile) => (tile.innerText =''))
        turn = player_X;
        setHoverText();

        endGameSound.pause();
        endGameSound.currentTime = 0;
    };

    //events

    tiles.forEach((tile) => tile.addEventListener('click' , tileClick)); 

    playAgain.addEventListener('click' , startNewGame);

    
})();

