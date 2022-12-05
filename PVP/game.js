var positionA = 0;
var positionB = 0;
var current_roll;
var peA = false; // pythonEffect for a
var peB = false; // pythonEffect for b
var turnA = 1 ;
var turnB = 1 ;
function setPositions() {
  var positions = [];
  var snakePositions = [13, 20, 28, 44, 58, 59, 65, 72, 78];
  var snakeNewPositions = [11, 10, 7, 34, 48, 39, 25, 52, 69];

  var ladderPositions = [5, 16, 21, 37, 42, 54, 60, 67, 73];
  var ladderNewPositions = [33, 36, 61, 56, 53, 64, 80, 77, 76];

  for (var i = 1; i <= 80; i++) {
    positions[i] = new Object();
    positions[i].from = i;

    if (snakePositions.indexOf(i) != -1) {
      positions[i].to = snakeNewPositions[snakePositions.indexOf(i)];
      positions[i].type = "Snake";
    } else if (ladderPositions.indexOf(i) != -1) {
      positions[i].to = ladderNewPositions[ladderPositions.indexOf(i)];
      positions[i].type = "Ladders";
    } else if (i === 29 || i === 46) {
      positions[i].to = i;
      positions[i].type = "pythonEffect";
    } else {
      positions[i].to = i;
      positions[i].type = "Normal";
    }
  }
  return positions;
}

var cells = setPositions();

/*for (var i = 1; i <=80 ; i++) {
    console.log("Cell: "+i+" type: "+cells[i].type+" From: "+cells[i].from+" To: "+cells[i].to)
}*/

//function to roll the dice
function roll_dice(min, max) {
  var result = Math.floor(Math.random() * (max + 1 - min) + min);

  if(getPlayerTurn() == "Player1" && cheat_modeA && turnA == 1 ){ 
    result = 5;
    turnA++;
  }else if(getPlayerTurn() == "Player1" && cheat_modeA && turnA == 2){
    result = 4;
    turnA++;
  } else if(getPlayerTurn() == "Player1" && cheat_modeA && turnA == 3){ 
    result= 4;
    turnA++;
  }
  if(getPlayerTurn() == "Player2" && cheat_modeB && turnB == 1 ){ 
    result = 5;
    turnB++;
  }else if(getPlayerTurn() == "Player2" && cheat_modeB && turnB == 2){
    result = 4; 
    turnB++;
  } else if(getPlayerTurn() == "Player2" && cheat_modeB && turnB == 3){ 
    result= 4;
    turnB++;
  }
  document.getElementById("die_result").innerText = "Die result : " + result;
  var die_image = document.getElementById("die_image");
  if (result == 1) {
    die_image.innerHTML =
      '<img id="die_image" src="./ImagesDice/one.png" alt="Die image"> ';
  } else if (result == 2) {
    die_image.innerHTML =
      '<img id="die_image" src="./ImagesDice/two.png" alt="Die image"> ';
  } else if (result == 3) {
    die_image.innerHTML =
      '<img id="die_image" src="./ImagesDice/three.png" alt="Die image"> ';
  } else if (result == 4) {
    die_image.innerHTML =
      '<img id="die_image" src="./ImagesDice/four.png" alt="Die image"> ';
  } else if (result == 5) {
    die_image.innerHTML =
      '<img id="die_image" src="./ImagesDice/five.png" alt="Die image"> ';
  } else
    die_image.innerHTML =
      '<img id="die_image" src="./ImagesDice/six.png" alt="Die image"> ';

  return result;
}

function play() {
  current_roll = roll_dice(1, 6);
  var old1,old2;

  if (getPlayerTurn() == "Player1") {
    old1=positionA;
    positionA = positionA + current_roll;
    positionA = correct_position(positionA);
    hasPlayerWon(positionA);
  } else {
    old2=positionB;
    positionB = positionB + current_roll;
    positionB = correct_position(positionB);
    hasPlayerWon(positionB);
  }

  if (getPlayerTurn() == "Player1") {
    var pA = cells[positionA].to;
    if (cells[pA].type == "pythonEffect") {
      peA = true;
    }
    if (cells[pA].type == "Snake" && peA) {
      positionA = pA;
    } else positionA = cells[positionA].to;
	changePosition(positionA);
  } else {
    var pB = cells[positionB].to;
    if (cells[pB].type == "pythonEffect") {
      peB = true;
    }
    if (cells[pB].type == "Snake" && peB) {
      positionB = pB;
    } else positionB = cells[positionB].to;
	changePosition(positionB);
  }

  console.log(positionA);
  console.log(positionB);
  
  
  hasPlayerWon(positionA);
  hasPlayerWon(positionB);
  changePlayerTurn();
  updateGUI(old1,old2);
}

function getPlayerTurn() {
  return player;
}

function changePlayerTurn() {
  if (player == "Player1" && current_roll != 6) {
    player = "Player2";
  } else if (player == "Player2" && current_roll != 6) player = "Player1";
  document.getElementById("player_turn").innerText = "Turn : " + player;
}

function hasPlayerWon(position) {
  if (position == 80) {
    alert(getPlayerTurn() + " HAS WON. CONGRATULATIONS!!");
	End_game();
  }
}

function correct_position(position){ 
		if (position > 80) {
		var temp = position-80;
		position = 80 - temp;
	  }
	  return position;
}

function End_game(){ 
	location.reload();
}