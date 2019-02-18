
var letter = ['X', 'O'];
var board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
var status = "";

$(document).ready(function() {
  function chickenDinner(board, marker){
    var winner = ((board[6] == marker && board[7] == marker && board[8] == marker) || (board[3] == marker && board[4] == marker && board[5] == marker) || (board[0] == marker && board[1] == marker && board[2] == marker) || (board[6] == marker && board[3] == marker && board[0] == marker) || (board[7] == marker && board[4] == marker && board[1] == marker) || (board[8] == marker && board[5] == marker && board[2] == marker) || (board[6] == marker && board[4] == marker && board[2] == marker) || (board[8] == marker && board[4] == marker && board[0] == marker));
    return winner;
  }
  function rndFirst(){
    return (Math.random() < 0.5 ? 0 : 1);
  }
  function move(board, marker, pos){
    board[pos] = marker;
    return board;
  }
  function addMarker(marker, pos){
    var str = "#" + (pos+1).toString();
    $(str).css('background-image', (marker == 'X' ? 'url(img/x.png)' : 'url(img/o.png)')).css('background-repeat','no-repeat').css('background-size','100% 100%');
  }

  function noMarker(board, pos){
    return board[pos] == ' ';
  }
  
  function playerMove(pos){
    if (noMarker(board, pos)){
      move(board, letter[0], pos);
      if (chickenDinner(board, letter[0])){
        status = "Player Won! ";
      }
      filledBoard();
      return true;
    }
    return false;
  }
  function availableMoves(board) {
    return function(pos) {
        return noMarker(board, pos);
    }
  }
  function rndMove(board, listPos){
    freePos = listPos.filter(availableMoves(board));
    if (freePos.length < 1) return null;
    var rndPos = Math.floor(Math.random() * freePos.length);
    return freePos[rndPos];
  }
  function filledBoard(){
    var remains = [0,1,2,3,4,5,6,7,8].filter(availableMoves(board));
    if (remains.length<1){
      if (status == "") status = "Tie! ";
      return true;
    }else {
      return false;
    }
  }
  function computerMove(){
    if ((status != "") || (filledBoard())) return null;
    computer = letter[1];
    player = letter[0];
    var clone, pos;
    for (var i = 0; i < 9; i++){
      clone = board.slice(0);
      if (noMarker(clone, i)){
        if (chickenDinner(move(clone, letter[1], i), letter[1])){
          move(board, letter[1], i);
          status = "Computer Won! ";
          return i; // check computer win move
        }
      }
    }
    for (var i = 0; i < 9; i++){
      clone = board.slice(0);
      if (noMarker(clone, i)){
        if (chickenDinner(move(clone, letter[0], i), letter[0])){
          move(board, letter[1], i);
          return i; // check player win move
        }
      }
    }
    pos = rndMove(board, [8,6,2,0]);//corners
    if ((pos !== null) && (noMarker(board, pos))) {
      move(board, letter[1], pos);
      return pos;
    }
    if (noMarker(board, 4)) {
      move(board, letter[1], 4);
      return 4; //center
    }
    pos = rndMove(board, [7,5,3,1]);
    if ((pos !== null) && (noMarker(board, pos))) {
      move(board, letter[1], pos);
      return pos;
    }
    return null;
  }
  function takeTurn(e){
    if (status != ""  || filledBoard()) {
      $(".modal-body").text(status + "Do you want to be X or O?");
      $("#choiceModal").modal('toggle');
      return;
    }
    var pos = parseInt(e.target.id) - 1;
    if (playerMove(pos)){
      addMarker(letter[0], pos);
      var p = computerMove();
      if (p != null){
        addMarker(letter[1], p);
      }
    }
  }
  function resetGame(){
    status = "";
    board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    $("td").each(function() {
       $(this).css("background-image", "");
    });  
  }
  $("#choiceModal").modal();
  $('.btn').on("click", function(e) {
    if ((status != "")) {
      resetGame();
    }
    switch(e.target.id.slice(-1)){
      case 'X':
        letter = ['X', 'O'];
        break;
      case 'O':
        letter = ['O', 'X'];
        break;
    }
    $("#choiceModal").modal('toggle');
    if (rndFirst() == 1){
      var p = computerMove();
      addMarker(letter[1], p);
    }
  });
  $('#board td').on("click", function(e) {
    takeTurn(e);
  });
});
