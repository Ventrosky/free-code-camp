
var isPaused = false;
var isStarted = false;
var intervalId;
var isSession = true;
var soundURL = "https://raw.githubusercontent.com/Ventrosky/python-scripts/master/miscellaneous/bell.wav";
var audio = new Audio(soundURL);

$(document).ready(function() {
  
  $("#btnStart").on("click",function(){
    if (!isStarted){
      var countDown = parseInt($("#session").contents()[0].textContent) * 60;
      startTimer(countDown);
      isStarted=true;
      $("#currentTime").css('color', 'green');
    }
  });

  $('#btnPause').on('click', function(e) {
    e.preventDefault();
    if (isPaused){
      isPaused = false;
      var countDown = parseInt($("#minutes").contents()[0].textContent) *60 + parseInt($("#seconds").contents()[0].textContent);
      clearInterval(intervalId);
      startTimer(countDown);
      $("#currentTime").css('color', (isSession ? 'green':'red'));
    } else {
      isPaused = true;
      $("#currentTime").css('color', 'orange');
    }
  });

  $('#btnRestart').on('click', function(e) {
    e.preventDefault();
    clearInterval(intervalId);
    $("#minutes").contents()[0].textContent = "00"; 
    $("#seconds").contents()[0].textContent = "00"; 
    isStarted = false;
    isPaused = false;
    $("#currentTime").css('color', 'black');
  });

  $("#incSession").on("click",function(){
    var countDown = parseInt($("#session").contents()[0].textContent) + 1;
    countDown = countDown < 10 ? "0" + countDown : countDown;
    countDown = countDown > 99 ? "01" : countDown;
    $("#session").contents()[0].textContent = countDown;
  });
  $("#incBreak").on("click",function(){
    var countDown = parseInt($("#break").contents()[0].textContent) + 1;
    countDown = countDown < 10 ? "0" + countDown : countDown;
    countDown = countDown > 99 ? "01" : countDown;
    $("#break").contents()[0].textContent = countDown;
  });
  $("#decBreak").on("click",function(){
    var countDown = parseInt($("#break").contents()[0].textContent) - 1;
    countDown = countDown < 1 ? 0 : countDown;
    countDown = countDown < 10 ? "0" + countDown : countDown;
    
    $("#break").contents()[0].textContent = countDown;
  });
  $("#decSession").on("click",function(){
    var countDown = parseInt($("#session").contents()[0].textContent) - 1;
    countDown = countDown < 1 ? 0 : countDown;
    countDown = countDown < 10 ? "0" + countDown : countDown;
    
    $("#session").contents()[0].textContent = countDown;
  });
});


function startTimer(duration) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
      if(!isPaused) {
        diff = duration - (((Date.now() - start) / 1000) | 0);
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        $("#minutes").contents()[0].textContent = minutes; 
        $("#seconds").contents()[0].textContent = seconds; 
        if (diff <= 0) {
            console.log("new");
            audio.play();
            isSession = isSession ? false : true;
            var timeId;
            if (isSession){
              timeId = $("#session");
              $("#currentTime").css('color', 'green');
            } else {
              timeId = $("#break");
              $("#currentTime").css('color', 'red');
            }
            start = Date.now() + 1000;//to do
            duration = parseInt(timeId.contents()[0].textContent) *60;
            diff = duration - (((Date.now() - start) / 1000) | 0);
        }
      }
    };
    timer();
    intervalId = setInterval(timer, 1000);
}
