// For autosclaling
let width, height;
const pixelWidth = 64;
const pixelHeight = 64;
let textSize1;

// The dot
let dot = { x: null, y: null };

// The player
let playerX,
  playerY,
  playerDirection,
  playerLength,
  playerPositions,
  playerScore,
  playerHighScore;

function setup() {
  calcScreen();
  createCanvas(width, height);
  frameRate(16);
  playerHighScore = 0;
  textSize1 = width * 0.025;
  reset();
}

/*
  The main loop for the game
*/
function draw() {
  getInput();
  background(50, 100, 50);
  movement();
  checkRules();
  renderRandomDot();
  renderPlayer();
  renderScore();
}

function windowResized() {
  calcScreen();
  resizeCanvas(width, height);
  textSize1 = width * 0.025;
}

function setDotPosition() {
  dot.x = ceil(random(0, pixelWidth - 1));
  dot.y = ceil(random(0, pixelHeight - 1));
}

function checkCollision() {
  // For the dot
  if (
    dot.x == playerPositions[playerPositions.length - 1].x &&
    dot.y == playerPositions[playerPositions.length - 1].y
  ) {
    setDotPosition();
    playerScore++;
    playerLength++;
  }

  // Check if player hit own tail
  for (let i = 0; i < playerPositions.length - 1; i++) {
    if (
      playerPositions[i].y == playerPositions[playerPositions.length - 1].y &&
      playerPositions[i].x == playerPositions[playerPositions.length - 1].x
    ) {
      reset();
    }
  }

  // Collision check for when it goes off canvas
  if (
    playerPositions[playerPositions.length - 1].y > pixelHeight - 1 ||
    playerPositions[playerPositions.length - 1].y < 0
  ) {
    reset();
  }

  // Collision check for when it goes off canvas
  if (
    playerPositions[playerPositions.length - 1].x > pixelWidth - 1 ||
    playerPositions[playerPositions.length - 1].x < 0
  ) {
    reset();
  }
}

function renderRandomDot() {
  noStroke();
  fill("red");
  rect(
    (width / pixelWidth) * dot.x,
    (height / pixelHeight) * dot.y,
    width / pixelWidth,
    height / pixelHeight
  );
}

function renderPlayer() {
  for (let i = 0; i < playerPositions.length; i++) {
    if (playerPositions.length > playerLength) {
      playerPositions.shift();
    }

    noStroke();
    fill("#1fb480");

    rect(
      (width / pixelWidth) * playerPositions[i].x,
      (height / pixelHeight) * playerPositions[i].y,
      width / pixelWidth,
      height / pixelHeight
    );
  }
}

function renderScore() {
  noStroke();
  fill("#ffffff");
  text(`Scores: ${playerScore}`, 10, 25);
  textSize(textSize1);

  noStroke();
  fill("#ffffff");
  text(`Snake Game`, (width - textWidth(`Snake Game`)) / 2, 25);
  textSize(textSize1);

  noStroke();
  fill("#ffffff");
  text(
    `Highscore: ${playerHighScore}`,
    width - (textWidth(`Highscore: ${playerHighScore}`) + 10),
    25
  );
  textSize(textSize1);
}

/*
  Used for autoscaling the screen
*/
function calcScreen() {
  if (windowWidth > windowHeight) {
    width = windowHeight;
    height = windowHeight;
  } else {
    width = windowWidth;
    height = windowWidth;
  }
}

function checkRules() {
  checkCollision();
}

/*
  Used when starting or reseting the game
*/
function reset() {
  if (playerScore > playerHighScore) {
    playerHighScore = playerScore;
  }
  playerScore = 0;
  playerX = ceil((pixelWidth - 1) / 2);
  playerY = ceil((pixelHeight - 1) / 2);
  playerLength = 3;
  playerDirection = null;
  playerPositions = [{ x: playerX, y: playerY }];
  setDotPosition();
}

// Key handeling
function getInput() {
  // Logic to move the snake
  switch (true) {
    case keyIsDown(87) || checkController() == 12:
      checkMovement("up");
      break;
    case keyIsDown(83) || checkController() == 13:
      checkMovement("down");
      break;
    case keyIsDown(65) || checkController() == 14:
      checkMovement("left");
      break;
    case keyIsDown(68) || checkController() == 15:
      checkMovement("right");
      break;
    default:
  }
}

/*
  This part is used for the movemnt rules
*/
function checkMovement(dir) {
  if (dir == "up" && playerDirection != "down") {
    playerDirection = "up";
  }

  if (dir == "down" && playerDirection != "up") {
    playerDirection = "down";
  }

  if (dir == "left" && playerDirection != "right") {
    playerDirection = "left";
  }

  if (dir == "right" && playerDirection != "left") {
    playerDirection = "right";
  }
}

/*
  The actuel movement
*/
function movement() {
  switch (playerDirection) {
    case "up":
      playerY--;
      playerPositions.push({ x: playerX, y: playerY });

      break;
    case "down":
      playerY++;
      playerPositions.push({ x: playerX, y: playerY });

      break;
    case "left":
      playerX--;
      playerPositions.push({ x: playerX, y: playerY });

      break;
    case "right":
      playerX++;
      playerPositions.push({ x: playerX, y: playerY });

      break;
  }
}
