function startGamelate() {
    document.querySelector('.StartModal').style.display = "none";
    // document.querySelector(".game").requestFullscreen();
    setTimeout(() => {
        startGame();
    }, 4000)
}// global variables
let pHealthCount = 200;
let eHealthCount = 200;
let efire = false;
let pfire = false;
let pcolor = 2;
let ecolor = 2;
let pnorepeat = true;
let enorepeat = true;
let left = true;
let cross = true;
let atk = false;
let dcolor;
let lev = 1;

// buttons
function firebtn() {
    if (weapon == 1) {
        document.querySelector(".modi").src = "../img/char/modiFire.gif";
        document.querySelector(".enemy").style.display = "none";
        setTimeout(() => {
            player.classList.remove('jump')
            document.querySelector(".modi").src = "../img/char/modistand.gif";
        }, 900);
    }
};
function rightbtn() {

    player.style.left = (playerX + 30) + "px";
    document.querySelector(".modi").src = "../img/char/modirunFinal.gif";
};
function leftbtn() {
    player.style.left = (playerX - 30) + "px";
    document.querySelector(".modi").src = "../img/char/modirunLeft.gif";
};
function jumpbtn() {
    player.classList.add('jump');
    document.querySelector(".modi").src = "../img/char/modiJump.gif";
    document.querySelector(".modiJump").play();
    setTimeout(() => {
        player.classList.remove('jump')
        document.querySelector(".modi").src = "../img/char/modistand.gif";
    }, 500);
};

function startGame() {

    // startGame
    document.querySelector('.startload').style.display = "none";
    bgm1 = document.querySelector(".bgm1");
    bgm1.play();

    // keydown events
    document.onkeydown = function keyEve(e) {
        player = document.querySelector('.player');
        modiimg = document.querySelector(".modi");
        playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));


    if (e.keyCode == 38 || e.keyCode == 32) {
        if(e.keyCode == 38 && e.keyCode == 32){
            alert("both pressed")
        }
        player.classList.add('jump');
        modiimg.src = "../img/char/modiJump.gif";
        setTimeout(() => {
            player.classList.remove('jump')
            modiimg.src = "../img/char/modistand.gif";  
        }, 500); 
    };
    if (e.keyCode == 39) {
        modiimg.src = "../img/char/modirunFinal.gif";
        player.style.left = (playerX + 30) + "px";
    };
    if (e.keyCode == 37) {
        modiimg.src = "../img/char/modirunLeft.gif";
        player.style.left = (playerX - 30) + "px";
    };
    if (e.keyCode == 70) {
        pfire = true
        setTimeout(()=>{
            pfire = false
        }, 200)
    };
    }

    //game engine
    setInterval(() => {
        player = document.querySelector('.player');
        enemy = document.querySelector(".enemy");
        playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
        enemyX = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('left'));
        playerY = parseInt(window.getComputedStyle(player, null).getPropertyValue('top'));
        enemyY = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('top'));
        pHealthPoint = document.querySelector(".pHealthPoint");
        eHealthPoint = document.querySelector(".eHealthPoint");
        
        dx = Math.abs(playerX-enemyX);
        dy = Math.abs(playerY-enemyY);
        console.log(dy)
        
        //position track
        pBound = document.querySelector(".player").getBoundingClientRect();
        midpoint = window.innerWidth/2;
        playerPosition = pBound.left;
        
        // win the game 
        if (eHealthCount == 0){
            // alert("you won");
        }
        //enemy bot
        if(dx > midpoint/2){
            if(playerPosition < midpoint){
                enemy.style.left = (enemyX - 30) +"px";
            }
            if(playerPosition > midpoint){
                enemy.style.left = (enemyX + 30) + "px";
            }
            if(dx > midpoint){
                enemy.style.left = "50vw";
            }
        }
        if(dx < 70){
            efire = true;
        }
        if(dx > 150){
            setTimeout(()=>{
                atk = true;
            },3000)
        }
        if(playerPosition < 0){
            player.style.left = "50vw";
        }
        if(dy > 150){
            cross = false;
            console.log(cross)
            setTimeout(() => {
                cross = true;
                console.log(cross)
            }, 10000);
        }
        // HEALTH DROP 
        if(dx <= 70 && pfire){
            eHealthCount = eHealthCount - 5;
            eHealthPoint.style.width = eHealthCount + "px";
            if (ecolor <= 252 && pnorepeat){
                ecolor += 25
                eHealthPoint.style.backgroundColor = "rgb("+ecolor+", 252, 3)";
                if(ecolor >= 252){
                    var edcolor = ecolor;
                    pnorepeat= false
                }
            }
            if(edcolor >= 252 || edcolor<=252 ){
                ecolor -= 8
                eHealthPoint.style.backgroundColor = "rgb(253,"+ecolor+", 3)";
            }
        }
        if(efire || atk){
            if(efire){
                pHealthCount -= 5}
            if(cross){
                pHealthCount -= 5
                pHealthPoint.style.width = pHealthCount + "px";
                if (pcolor <= 252 && enorepeat){
                    pcolor += 25
                    pHealthPoint.style.backgroundColor = "rgb("+pcolor+", 252, 3)";
                    if(pcolor >= 252){
                        var pdcolor = pcolor;
                        enorepeat= false
                    }
                }
                if(pdcolor >= 252 || pdcolor<=252 ){
                    pcolor -= 8
                    pHealthPoint.style.backgroundColor = "rgb(253,"+pcolor+", 3)";
                }
            }
            pHealthPoint.style.width = pHealthCount + "px";
                if (pcolor <= 252 && enorepeat){
                    pcolor += 25
                    pHealthPoint.style.backgroundColor = "rgb("+pcolor+", 252, 3)";
                    if(pcolor >= 252){
                        var pdcolor = pcolor;
                        enorepeat= false
                    }
                }
                if(pdcolor >= 252 || pdcolor<=252 ){
                    pcolor -= 8
                    pHealthPoint.style.backgroundColor = "rgb(253,"+pcolor+", 3)";
                }
            atk = false;
        }
        
    }, 200);
    

}
function updatewin(lev) {
    localStorage.setItem("levelpassed", lev)
}