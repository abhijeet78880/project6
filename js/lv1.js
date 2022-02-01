
// global variables
let scoreCount = 0;
let vaccineCount = 0;
let cross = true;
let point = true;
let weapon = 0;
let lev = 0;
let HeighScore = localStorage.getItem("heighScore");
// buttons
function firebtn(){
    if (weapon == 1){
        document.querySelector(".hulk").src = "../img/char/modiFire.gif";
        document.querySelector(".enemy").style.display="none";
        setTimeout(() => {
        player.classList.remove('jump')
        document.querySelector(".hulk").src = "../img/char/modistand.gif";
    }, 900);
    }
};
function rightbtn(){
    
    player.style.left = (playerX + 30) + "px";
    document.querySelector(".hulk").src = "../img/char/modirunFinal.gif";
};
function leftbtn(){
    player.style.left = (playerX - 30) + "px";
    document.querySelector(".hulk").src = "../img/char/modirunLeft.gif";
};
function jumpbtn(){
    player.classList.add('jump');
    document.querySelector(".hulk").src = "../img/char/modiJump.gif";
    document.querySelector(".hulkJump").play();
    setTimeout(() => {
        player.classList.remove('jump')
        document.querySelector(".hulk").src = "../img/char/modistand.gif";
    }, 500);
};

function startGame() {

// startGame
    document.querySelector('.StartModal').style.display = "none";
    bgm1 = document.querySelector(".bgm1");
    bgm1.play();

    enemyRun = document.querySelector(".enemy");
    enemyRun.classList.add("enemyRun");
    // keydown events
    document.onkeydown = function keyEve(e) {
        player = document.querySelector('.player');
        hulkimg = document.querySelector(".hulk");
        // audio
        hulkAngry = document.querySelector(".hulkAngry")
        hulkJump = document.querySelector(".hulkJump")
        dhulk1 = document.querySelector(".dhulk")
        enemyL1 = document.querySelector(".enemyL1")


        playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
        if (e.keyCode == 38 || e.keyCode == 32) {
            player.classList.add('jump');
            hulkimg.src = "../img/char/modiJump.gif";
            hulkJump.play();
            setTimeout(() => {
                player.classList.remove('jump')
                hulkimg.src = "../img/char/modistand.gif";
            }, 500);
        };
        if (e.keyCode == 39) {
            hulkimg.src = "../img/char/modirunFinal.gif";
            player.style.left = (playerX + 30) + "px";
        }
        if (e.keyCode == 37) {
            hulkimg.src = "../img/char/modirunLeft.gif";
            player.style.left = (playerX - 30) + "px";
        };
        if (e.keyCode == 70) {
            if (weapon == 1){
                hulkimg.src = "../img/char/modiFire.gif";
                document.querySelector(".enemy").style.display="none";
                setTimeout(() => {
                player.classList.remove('jump')
                hulkimg.src = "../img/char/modistand.gif";
            }, 900);
            }
        }
    }
    //game engine
    let gameInterval = setInterval(() => {
        //graphics
        hulkimg = document.querySelector(".hulk");
        weaponBox = document.querySelector(".wimg");
        vaccineBox = document.querySelector(".vaccinep");
        arm = document.querySelector(".weapon");
        // elements
        player = document.querySelector('.player');
        playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
        playerY = parseInt(window.getComputedStyle(player, null).getPropertyValue('top'));
        enemy = document.querySelector(".enemy");
        enemyX = parseInt(window.getComputedStyle(enemy, null).getPropertyValue("left"));
        enemyY = parseInt(window.getComputedStyle(enemy, null).getPropertyValue("top"));
        vaccine = document.querySelector(".vaccinep");
        vaccineX = parseInt(window.getComputedStyle(vaccine, null).getPropertyValue("left"))
        vaccineY = parseInt(window.getComputedStyle(vaccine, null).getPropertyValue("top"))
        weapon1 = document.querySelector(".weapon");
        weapon1X = parseInt(window.getComputedStyle(weapon1, null).getPropertyValue("left"))
        weapon1Y = parseInt(window.getComputedStyle(weapon1, null).getPropertyValue("top"))

        // diff between player and xtz
        dx = Math.abs(playerX - enemyX);
        dy = Math.abs(playerY - enemyY);
        dvx = Math.abs(playerX - vaccineX);
        dvy = Math.abs(playerY - vaccineY);
        dwx = Math.abs(playerX - weapon1X);
        dwy = Math.abs(playerY - weapon1Y);

        //immune poinsts
        if (dvx < 25 && dvy < 30) {
            vaccineCount += 1;
            updateImmune(vaccineCount);
            vaccineBox.style.display = "none"
            updateVaccine();
        }
        // Immune over
        if (dx < 50 && dy < 60) {
            vaccineCount -= 1;
            updateImmune(vaccineCount);
        }
        setTimeout(()=>{
            enemy.style.display = "block";
        },200)
        // weapon1- range gun
        console.log(dwx , dwy)
        if (dwx < 50 && dwy < 50) {
            arm.style.display = "none";
            weaponBox.src = "../img/elements/gun1.jpg";
            weapon = 1;
            setTimeout(()=>{
                weapon = 0;
                weaponBox.src = "../img/elements/fist.jpg";
            },7000)
            upDateWepon();
        }
        //winGame
        if(vaccineCount >= 2){
            lev = 1;
            updatewin(lev);
        }
        //gameOver
        if (dx < 100 && dy < 100 && vaccineCount < 0) {
            document.querySelector(".info").innerHTML = `<div class="navbtn">
            <h1 class="end">
            GAME OVER
            </h1>
            <button class="restart" onclick="location.reload()">
            restart
            </button>
            <a class=""restart href="../index.html">Home</a>
            </div>`;

            if(lev == 1){
                document.querySelector(".info").innerHTML = `<div class="navbtn">
            <h1 class="end">
            GAME OVER
            </h1>
            <button class="restart" onclick="location.reload()">
            restart
            </button>
            <a class=""restart href="../index.html">Home</a>
            <p style="color:white;position:relative;z-index:1000;">You have compeleted the mission</p>
            </div>`;
            }
            
            dhulk1.play();
            hulkimg.src = "../img/char/modidie.gif";
            enemy.classList.remove("enemyRun");
            weapon1.style.display = "none";
            vaccine.style.display = "none";
            
            if (scoreCount > HeighScore) {
                saveGame(scoreCount);
            }
            clearInterval(gameInterval);
        }
        // scoreSystem
        else if (dx < 250 && cross) {
            let newDur = 0;
            scoreCount += 1;
            updateScore(scoreCount);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 900);
            setTimeout(() => {
                aniDur = parseFloat(window.getComputedStyle(enemy, null).getPropertyValue('animation-duration'));
                newDur = aniDur - 1;
                if (newDur > 2) {
                    enemy.style.animationDuration = newDur + 's';
                }
                else {
                    enemy.style.animationDuration = "1.9s";
                }
            }, 20000);
            if (scoreCount == 5) {
                document.querySelector(".game").style.backgroundImage = "url('../img/bg/black_mystery_forest1.jpg')";
                document.querySelector(".virus").src = '../img/char/bactera2_run1.png';
            }
        }
    }, 100);

}
function updateScore(scoreCount) {
    score = document.querySelector(".scoreH");
    score.innerHTML = "SCORE: " + scoreCount
}
function updateImmune(vaccineCount) {
    immune = document.querySelector(".immune");
    immune.innerText = "IMMUNE :" + vaccineCount
}
function saveGame(HscoreCount) {
    localStorage.setItem("heighScore", HscoreCount);
}
function updatewin(lev){
    localStorage.setItem("levelpassed" , lev)
}
function updateVaccine() {
    setTimeout(() => {
        document.querySelector(".vaccinep").style.display = 'block'
    }, 20000)
}