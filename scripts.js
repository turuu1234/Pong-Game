import Ball from './Ball.js'
import Paddle from './Paddle.js'
const ball = new Ball(document.getElementById("ball"))
const palyerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
let lastTIme
function update(time){
    if( lastTIme != null){
        const delta = time - lastTIme
        ball.update(delta, [palyerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        const hue = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--hue")
        )
        document.documentElement.style.setProperty("--hue", hue + delta *0.01)
        if(isLose()) handleLose()
    }
    lastTIme = time
    window.requestAnimationFrame(update)
}
function handleLose(){
    const rect = ball.rect()
    if(rect.right >= window.innerWidth){
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
    }
    else{
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
    }
    ball.reset()
    computerPaddle.reset()
}
function isLose(){
    const rect = ball.rect()
    return rect .right >=window.innerWidth || rect.left <= 0
}
document.addEventListener('mousemove', e =>{
    palyerPaddle.position = (e.y / window.innerHeight) * 100;
})
window.requestAnimationFrame(update)