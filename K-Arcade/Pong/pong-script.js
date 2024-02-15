// Canvas
c = document.getElementById('c').getContext('2d');
c.fillStyle="#FFF";
c.font="60px monospace";

// Default Values
pause = start = solo = true;
lvel = rvel = lscore = rscore = 0;
lpos = rpos = 190;
bposX = 300;
bposY = 235;
bvelX = -5;
bvelY = 3;
maxvel = 26;

// Scoring
lscore = 0;
rscore = 0;
winner = "";

setInterval(function() {

    /////////////////////////////////////////////////////////////

    // Pause & Start
    if(pause && !start) {
        return;
    }
    
    // Fake Misses
    miss = Math.floor(Math.random() * 10) / 10;

    // Init
    start = false;
    c.clearRect(0, 0, 640, 480);
    for(i = 5; i < 480; i += 20) {
        c.fillRect(318, i, 4, 10);
    }

    /////////////////////////////////////////////////////////////

    if(solo) {
        if(miss == 0.5) {
            if(bvelY < 0) {
                rpos += bvelY+0.7 + miss;
            }
            else {
                rpos += bvelY-0.7 + miss;
            }
        }
        else {
            if(bvelY < 0) {
                rpos += bvelY+0.7;
            }
            else {
                rpos += bvelY-0.7;
            }
        }
    }
    else {
        rpos += rvel;
    }

    /////////////////////////////////////////////////////////////

    // Movement & Velocity
    lpos += lvel;
    lpos = lpos < 0 ? 0:lpos;
    lpos = lpos > 380 ? 380:lpos;
    rpos = rpos < 0 ? 0:rpos;
    rpos = rpos > 380 ? 380:rpos;
    bposX += bvelX;
    bposY += bvelY;

    // Ball Sides Rebounds
    if(bposY <= 0) {
        bposY = 0;
        bvelY = -bvelY;
    }

    if(bposY >= 470) {
        bposY = 470;
        bvelY = -bvelY;
    }

    // Reverse Speed On Touch
    if(bposX <= 40 && bposX >= 20 && bposY < lpos+110 && bposY > lpos-10) {
        if (bvelX > -maxvel && bvelX < maxvel) {
            bvelX = -bvelX+0.5;
        }
        else {
            bvelX = -bvelX;
        }
        bvelY += (bposY-lpos-45)/20;
    }

    // --------------------

    if(bposX <= 610 && bposX >= 590 && bposY < rpos+110 && bposY > rpos-10) {
        if (bvelX > -maxvel && bvelX < maxvel) {
            bvelX = -bvelX-0.5;
        }
        else {
            bvelX = -bvelX;
        }
        bvelY += (bposY-rpos-45)/20;
        if (solo) {
            rpos += bvelY;
        }
    }

    // Score On Left
    if(bposX < -10) {
        rscore++;
        bposX = 360;
        bposY = 235;
        bvelX = 5;
        lpos = rpos = 190;
        pause = true;
    }

    // Score On Right
    if(bposX > 640) {
        lscore++;
        bposX = 280;
        bposY = 235;
        bvelX = -5;
        lpos = rpos = 190;
        pause = true;
    }

    // Score
    c.fillText(lscore + " " + rscore, 266, 60)
    c.fillRect(20, lpos, 20, 100)
    c.fillRect(600, rpos, 20, 100)
    c.fillRect(bposX, bposY, 10, 10)

    // --------------------

    if(lscore == 3) {
        showScreen(2);
        pause = true;
        win.textContent = "Player 1";
    }

    // --------------------

    if(rscore == 3) {
        showScreen(2);
        pause = true;
        if(solo) {
            win.textContent = "AI";
        }
        else {
            win.textContent = "Player 2";
        }
    }
    scr.textContent = lscore + " - " + rscore;
},30)

    /////////////////////////////////////////////////////////////
  
// Inputs & Bar's Velocity

document.onkeydown=function(e) {
    key = (e || window.event).keyCode;
    pause = pause?false: key =='27'?true:false;
    lvel = key =='81'?10: key=='65'?-10:lvel;
    if (!solo) {
        rvel = key=='40'?10: key=='38'?-10:rvel;
    }
}
document.onkeyup=function(e) {
    key = (e || window.event).keyCode;
    lvel = key =='81'|| key=='65'?0:lvel;
    if (!solo) {
        rvel = key =='38'|| key=='40'?0:rvel;
    }
}

// Etc
ai_controls = document.getElementById('ai');
win = document.getElementById('winner');
scr = document.getElementById('score');

// Screen Management

var newGamepvp = function() { 
    solo = false; 

    // --------------------

    lscore = 0;
    rscore = 0;

    // --------------------

    ai_controls.style.visibility = "visible";
    showScreen(0);
}

var newGamepvai = function() {  
    solo = true;

    // --------------------

    lscore = 0;
    rscore = 0;

    // --------------------

    ai_controls.style.visibility = "hidden";
    showScreen(0);
}

    /////////////////////////////////////////////////////////////

var showScreen = function(screen_opt){
    switch(screen_opt){
        case 0: screen_game.style.display = "block";
                screen_menu.style.display = "none";
                screen_gameover.style.display = "none";
                break;
            
        case 1: screen_game.style.display = "none";
                screen_menu.style.display = "block";
                screen_gameover.style.display = "none";
                break;
        case 2: screen_game.style.display = "none";
                screen_menu.style.display = "none";
                screen_gameover.style.display = "block";
                break;
    }
}

    /////////////////////////////////////////////////////////////

// Screens
screen_game = document.getElementById("game");
screen_menu = document.getElementById("menu");
screen_gameover = document.getElementById("gameover");

// Buttons
button_newgame_pvp = document.getElementById("newgame_pvp");
button_newgame_pvai = document.getElementById("newgame_pvai");
button_newgame_gameover = document.getElementById("newgame_gameover");
button_menu_gameover = document.getElementById("menu_gameover");
button_newgame_pvp.onclick = function(){newGamepvp();};
button_newgame_pvai.onclick = function(){newGamepvai();};
button_menu_gameover.onclick = function(){showScreen(1)};