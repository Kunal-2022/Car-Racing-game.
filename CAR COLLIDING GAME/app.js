const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

//startScreen.addEventListener("click", start);

player = {
    start: false,
    speed: 5,
    score: 0
};

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

startScreen.addEventListener("click", start);
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
    keys[e.key] = true;
    //console.log(keys);
}

function keyUp(e) {
    keys[e.key] = false;
    //console.log(keys);
}

function movelines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function (item) {
        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

// finction for checking collision between player car and enemy car 

function iscollide(a, b) {
    let recta = a.getBoundingClientRect();
    let rectb = b.getBoundingClientRect();
    return !((recta.bottom < rectb.top) || (recta.top > rectb.bottom) || (recta.right < rectb.left) || (recta.left > rectb.right));
}

function endgame() {
    player.start = false;
    startScreen.classList.remove("hide");
}

function moveEnemy(car) {
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach(function (item) {

        // checking for collision

        if (iscollide(car, item)) {
            // game over end the gamne 
            endgame();
        }

        if (item.y >= 700) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function gameplay() {
    //console.log("in gameplay");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    if (player.start == true) {

        // call the move lines function 
        movelines();

        // call the function to move all the enemy car
        moveEnemy(car);

        if (keys.ArrowUp == true && player.y > (road.top + 70)) {
            player.y -= player.speed;
        }
        else if (keys.ArrowLeft == true && player.x > 0) {
            player.x -= player.speed
        }
        else if (keys.ArrowRight == true && player.x < (road.width - 60)) {
            player.x += player.speed;
        }
        else if (keys.ArrowDown == true && player.y < (road.bottom - 70)) {
            player.y += player.speed;
        }
        car.style.left = player.x + "px";
        car.style.top = player.y + "px";
        player.score++;
        score.innerText = "Score: " + player.score;
        window.requestAnimationFrame(gameplay);
    }
}

function start() {
    //gameArea.classList.remove("hide");
    startScreen.classList.add("hide");
    score.classList.remove("hide");
    gameArea.innerHTML = " ";
    player.start = true;
    window.requestAnimationFrame(gameplay);

    let car = document.createElement("div");
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    // make the lines betweeen the road

    for (x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    // setting the x and y coordinate of the player

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    player.score = 0;

    // create the enemy car

    for (let i = 0; i < 3; i++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((i + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        //enemyCar.style.backgroundColor = "blue";
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }

    //console.log(car.offsetTop);
    //console.log(car.offsetLeft);
}