var isStrict = true;
var playerTurn = false;
var simonSeq = [];
var playedSeq = [];
var userSeq=[];
var level = 1;
var seqIndex=0;
var animInt;
var sndSrcBlue='sounds/simonSound1.mp3';
var sndSrcGreen='sounds/simonSound2.mp3';
var sndSrcPink='sounds/simonSound3.mp3';
var sndSrcYellow='sounds/simonSound4.mp3';
var aliens=["blue","green","pink","yellow"];
var sound = {
    blue: new Howl({src: [sndSrcBlue]}), 
    green: new Howl({src: [sndSrcGreen]}), 
    pink: new Howl({src: [sndSrcPink]}), 
    yellow: new Howl({src: [sndSrcYellow]})
  };

$(document).ready(function() {

  $('#start').on('click', function () {
    level=1;
    $('#score').text(level);
    $('.alien').css("border-color","darkgrey");
    playedSeq = [];
    userSeq = [];
    seqIndex = 0;
    simonSeq = generateSeq();
    playAlien();
  });
  
  $('.strict').on("change", function() {
    isStrict = $(this).prop('checked');
  });
  
  $('#blue').on('click', function () {
    if(playerTurn){
    $('#blue').css("background-color","blue");
    sound["blue"].play();
    userSeq.push(1);
    setTimeout(function () {
      $('#blue').css("background-color","lightblue");
    }, 200);
    chickenDinner();}
   });
  
  $('#green').on('click', function () {
    if(playerTurn){
    $('#green').css("background-color","green");
    sound["green"].play();
    userSeq.push(2);
    setTimeout(function () {
      $('#green').css("background-color","lightgreen");
    }, 200);
    chickenDinner();}
   });
  
  $('#pink').on('click', function () {
    if(playerTurn){
    $('#pink').css("background-color","red");
    sound["pink"].play();
    userSeq.push(3);
    setTimeout(function () {
      $('#pink').css("background-color","lightpink");
    }, 200);
    chickenDinner();}
   });  
  
  $('#yellow').on('click', function () {
    if(playerTurn){
    $('#yellow').css("background-color","yellow");
    sound["yellow"].play();
    userSeq.push(4);
    setTimeout(function () {
      $('#yellow').css("background-color","lightyellow");
    }, 200);
    chickenDinner();}
   });  
  
});

function getRng(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateSeq() {
  var sequence = [];
  for(var i=0; i<20; i++) {
    sequence.push(getRng(1,5));
  }
  return sequence;
}

 function playAlien() {
  animInt = setInterval(function () {
    if($('#score').text()=="!!") {
      $('#score').text(level);
      $('#score').css("color","black");
      $('.alien').css("border-color","darkgrey");
    }
    var alien = aliens[simonSeq[seqIndex]-1];
    $('#'+alien).css("background-color",(alien != "pink" ? alien : "red"));
    sound[alien].play();
    playedSeq.push(simonSeq[seqIndex]);
    setTimeout(function () {
       $('#'+alien).css("background-color","light"+alien);
    }, (level <= 10? 500 : 400));
    seqIndex++;
    if (seqIndex>=level) {
      clearInterval(animInt);
      playerTurn=true;
    }
  }, (level <= 10? 800 : 700));
}

function chickenDinner() {
  if (playedSeq.length == userSeq.length) {
    playerTurn = false;
    if (playedSeq.join() == userSeq.join()) {
      if (level == 20) {
        setTimeout(function () {
          $('#score').text('Winner Winner Chicken Dinner!');
          $('.alien').css("border-color","purple");
          playedSeq = [];
          userSeq = [];
          seqIndex=0;
        }, 1000);
      } else {
        setTimeout(function () { 
          $('#score').text(level + 1);
          level++;
          playedSeq = [];
          userSeq = [];
          seqIndex = 0;
          playAlien();
        }, 900);
      }
    } else {
      if (!(isStrict)) {
        setTimeout(function () {
          $('#score').text('!!');
          $('#score').css("color","red");
          $('.alien').css("border-color","orange");
          playedSeq = [];
          userSeq = [];
          seqIndex=0;
          playAlien();
        }, 1000);
      } else {
        setTimeout(function () {
          $('#score').text('!!');
          $('#score').css("color","red");
          $('.alien').css("border-color","orange");
          level=1;
          playedSeq = [];
          userSeq = [];
          seqIndex = 0;
          simonSeq = generateSeq();
          playAlien();
        }, 1000);
      }
    }
  }
}