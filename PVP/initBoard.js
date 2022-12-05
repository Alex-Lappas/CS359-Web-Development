var player = "Player"; // player1= red player2=white
var nameA;
var nameB;
var cheat_modeA = false;
var cheat_modeB = false;
function initBoard() {
  var table = document.getElementById("mainTable");
  var tr = document.createElement("tr");

  for (var i = 8; i >= 1; i--) {
    var tr = document.createElement("tr");
    for (var j = 9; j >= 0; j--) {
      var td1 = document.createElement("td");
      var num = i * 10 - j;
      td1.innerHTML =
        "<div id='position" +
        num +
        "'><img  src='images/" +
        num +
        ".png'  height=70 width=70></div>";

      tr.appendChild(td1);
    }
    table.appendChild(tr);
  }
}

function changePosition(newPosition) {
  if (getPlayerTurn() == "Player1") {
    if (positionA == positionB) {
      document.getElementById("position" + newPosition).innerHTML =
        "<img  src='imagesBoth/" +
        newPosition +
        ".png'  height=70 width=70></div>";
    } else
      document.getElementById("position" + newPosition).innerHTML =
        "<img  src='imagesRed/" +
        newPosition +
        ".png'  height=70 width=70></div>";
  } else if (getPlayerTurn() == "Player2") {
    if (positionA == positionB) {
      document.getElementById("position" + newPosition).innerHTML =
        "<img  src='imagesBoth/" +
        newPosition +
        ".png'  height=70 width=70></div>";
    } else
      document.getElementById("position" + newPosition).innerHTML =
        "<img  src='imagesWhite/" +
        newPosition +
        ".png'  height=70 width=70></div>";
  }
}
//function to initialize board and infobox and ask for names
function newGame() {
  initBoard();
  setInfoBox();
  namePrompt();
}

//functoin to initialize infobox
function setInfoBox() {
  var result = Math.floor(Math.random() * (2 + 1 - 1) + 1);
  if (result == 1) {
    document.getElementById("player_turn").innerText = "Turn : Player1";
  } else {
    document.getElementById("player_turn").innerText = "Turn : Player2";
  }

  document.getElementById("die_result").innerText = "Die result: -";
  document.getElementById("python_effectA").innerText =
    "Python effect: Inactive for Player1";
  document.getElementById("python_effectB").innerText =
    "Python effect: Inactive for Player2";
  player = player + result;
}

function updateGUI(old1, old2) {
  if (getPlayerTurn() == "Player1" && peA) {
    document.getElementById("python_effectA").innerText =
      "Pyhton effect: Active for Player1";
  }
  if (getPlayerTurn() == "Player2" && peB) {
    document.getElementById("python_effectB").innerText =
      "Pyhton effect: Active for Player2";
  }
  for (i = 1; i <= cells.length - 1; i++) {
    if (!(positionA == i) && !(positionB == i)) {
      document.getElementById("position" + i).innerHTML =
        "<img  src='images/" + i + ".png'  height=70 width=70></div>";
    } else if (old1 == positionB && old1 == i) {
      document.getElementById("position" + i).innerHTML =
        "<img  src='imagesWhite/" + i + ".png'  height=70 width=70></div>";
    } else if (old2 == positionA && old2 == i) {
      document.getElementById("position" + i).innerHTML =
        "<img  src='imagesRed/" + i + ".png'  height=70 width=70></div>";
    }
  }
}

function activate_cheatmode(player_tag) {
  if (player_tag == "Player1") {
    cheat_modeA = true;
  } else cheat_modeB = true;
}

function namePrompt() {
  nameA = prompt("What is your name?");
  nameB = prompt("What is your name?");
  console.log(nameA);
  console.log(nameB);
  if (nameA == "tsitsipas") activate_cheatmode("Player1");

  if (nameB == "tsitsipas") activate_cheatmode("Player2");
}
