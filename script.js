let character = document.getElementById('character');
let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
let characterRight = parseInt(window.getComputedStyle(character).getPropertyValue('right'));
let characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue('width'));
let ground = document.getElementById('ground');
let groundBottom = parseInt(window.getComputedStyle(ground).getPropertyValue('bottom'));
let groundHeight = parseInt(window.getComputedStyle(ground).getPropertyValue('height'));

let isJumping = false;
let upTime;
let downTime;
let gameOver = false;
let displayScore = document.getElementById('score');
let score = 0;

function jump(){
    if(isJumping) return;
    upTime = setInterval(()=> {
        if(characterBottom >= groundHeight + 100){
            clearInterval(upTime);
            downTime = setInterval(()=>{
                if(characterBottom <= groundHeight + 10){
                    clearInterval(downTime);
                    isJumping = false;
                }
                characterBottom -= 10;
                character.style.bottom = characterBottom + 'px';
            },80);
        }
        characterBottom +=10;
        character.style.bottom = characterBottom + 'px';
        isJumping = true;
    },30);
}
function showScore(){
    score ++;
    displayScore.innerHTML = score;
}
setInterval(showScore,100);
function generateObstacles(){
    
    if(!gameOver){
        let obstacles = document.querySelector('.obstacles');
        let obstacle = document.createElement('div');
        let rock = document.createElement('div');
        obstacle.setAttribute('class', 'obstacle');
        rock.setAttribute('class', 'rock');
        obstacles.appendChild(obstacle);
        obstacles.appendChild(rock);

        let randomTimeout = Math.floor(Math.random() * 2000) + 2000;
        let obstacleRight = -30;
        let obstacleBottom = 100;
        let obstacleWidth = 200;
        let obstacleHeight = Math.floor(Math.random() * 140) + 200;

        let rockRight = -200;
        let rockBottom = 100;
        let rockWidth = 90;
        let rockHeight = Math.floor(Math.random() * 20) + 20;

        let obstacleInterval = setInterval(function moveObstacle(){
            obstacleRight += 5; 
            obstacle.style.right = obstacleRight + 'px';
            obstacle.style.bottom = obstacleBottom + 'px';
            obstacle.style.width = obstacleWidth + 'px';
            obstacle.style.height = obstacleHeight + 'px';
        },30);
        let rockInterval = setInterval(function moveRock(){
            rockRight += 5;
            rock.style.right = rockRight + 'px';
            rock.style.bottom = rockBottom + 'px';
            rock.style.width = rockWidth + 'px';
            rock.style.height = rockHeight + 'px';
            
             if(elementsOverlap(character, rock) && rockHeight >= 28){
                alert("Game Over!");
                clearInterval(obstacleInterval);
                clearInterval(rockInterval);
                clearTimeout(obstacleTimeout);
                
                location.reload();
                gameOver = true;
            }
        },30);
        let obstacleTimeout = setTimeout(generateObstacles,randomTimeout);
    }else{
        return;
    }
}
generateObstacles();
function control(e){
    if(e.key == 'ArrowUp' || e.key == ' '){
        jump();
    }
}

document.addEventListener('keydown',control);

function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();
    return !(
      domRect1.top > domRect2.bottom ||
      (domRect1.right - 40) < (domRect2.left) ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > (domRect2.right - 40)
    );
  }