var initialTime = 10;
var initialLevel = 1;
var numberOfFaces = 5;
var count = 0;
var points = 0;

var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;

var flexContainer = document.getElementById('flex-container');
var timeBox = document.getElementById('time');
var levelBox = document.getElementById('level');
var pointsBox = document.getElementById('points');
var startBtn = document.getElementById('start-game');
var leftSide = document.getElementById('left-side');
var rightSide = document.getElementById('right-side');
var body = document.getElementsByTagName('body')[0];

timeBox.innerHTML = initialTime;
levelBox.innerHTML = initialLevel;
pointsBox.innerHTML = points;

window.addEventListener("load", setWindow);
startBtn.onclick = function () {
    startGame();
}

function setWindow() {
    flexContainer.style.height = windowHeight - 100 + 'px';
}

function startGame() {
    resetInitial();
    clearWindows();
    generateFaces();
    cloneFaces();
    counter(initialTime);
}

function counter(time) {
    startBtn.style.opacity = 0.5;
    startBtn.onclick = null;
    var loop = setInterval(counting, 1000);
    function counting() {
        time--;
        timeBox.innerHTML = time;
        if (time < 0) {
            clearInterval(loop);
            var restart = confirm("Game Over!\n\n" + "Your score is: " + points + "\nOn level: " + initialLevel + "\n\nDo you want play again?");
            if (restart) {
                startGame();
            } else {
                body.onclick = null;
                resetInitial();
                clearWindows();
                startBtn.style.opacity = 1;
                startBtn.onclick = function () {
                    startGame();
                };
            }
        } else {
            leftSide.lastChild.onclick = function (event) {
                event.stopPropagation();
                clearInterval(loop);
                numberOfFaces += 5;
                initialLevel++;
                points = points + (2 * initialLevel);
                time = initialTime * (initialLevel / 2);
                resetValue(time, initialLevel, points);
                count = 0;
                clearWindows();
                generateFaces();
                cloneFaces();
                counter(time);
            }
            body.onclick = function () {
                clearInterval(loop);
                var restart = confirm("Game Over!\n\n" + "Your score is: " + points + "\nOn level: " + initialLevel + "\n\nDo you want play again?");
                if (restart) {
                    startGame();
                } else {
                    body.onclick = null;
                    leftSide.lastChild.onclick = null;
                    resetInitial();
                    clearWindows();
                    startBtn.style.opacity = 1;
                    startBtn.onclick = function () {
                        startGame();
                    };
                }
            }
        }
    }
}

function resetInitial() {
    initialTime = 10;
    initialLevel = 1;
    numberOfFaces = 5;
    count = 0;
    points = 0;
    resetValue(initialTime, initialLevel, points);
}

function resetValue(time, level, points) {
    timeBox.innerHTML = time;
    levelBox.innerHTML = level;
    pointsBox.innerHTML = points;
}

function generateFaces() {
    while (count < numberOfFaces) {
        var randomTop = Math.random() * (windowHeight - 200);
        randomTop = Math.floor(randomTop);
        var randomLeft = Math.random() * ((windowWidth / 2) - 100);
        randomLeft = Math.floor(randomLeft);
        var face = document.createElement('img');
        face.src = 'img/smile.png';
        face.style.top = randomTop + 'px';
        face.style.left = randomLeft + 'px';
        leftSide.appendChild(face);
        count++;
    }
}

function cloneFaces() {
    var leftSideImages = leftSide.cloneNode(true);
    leftSideImages.removeChild(leftSideImages.lastChild);
    leftSideImages.removeAttribute('id');
    rightSide.appendChild(leftSideImages);
}

function clearWindows() {
    while (leftSide.firstChild) {
        leftSide.removeChild(leftSide.firstChild);
    }
    while (rightSide.firstChild) {
        rightSide.removeChild(rightSide.firstChild);
    }
}

