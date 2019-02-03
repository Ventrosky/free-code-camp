var memNumber = 0;
var doRestart = false;
$(document).ready(function() {
  function updateDisplay(n){
    var prev = $('#calc-screen').contents()[0].textContent;
    if((prev == "0") && ([".","+","-","/","*"].indexOf(n)>-1)){
      doRestart = false;
      prev = "0"+n;
      $('#calc-screen').contents()[0].textContent = prev;
    } else {
      $('#calc-screen').contents()[0].textContent = (prev == "0" ? "" : prev) + n;
    }
  }
  function reset(){
    memNumber = 0;
    $('#calc-screen').contents()[0].textContent = "0";
  }
  $( ".btn-calc" ).on( "click", function(e) {
    var displayStr = $('#calc-screen').contents()[0].textContent;
    var lastChar = displayStr.charAt(displayStr.length-1);
    var lastNum = displayStr.split(/[\+\-\/\*]/);
    lastNum = lastNum[lastNum.length-1];
    switch (e.target.value){
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if (doRestart){
          reset();
          doRestart = false;
        }
        updateDisplay(e.target.value);
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        if (doRestart) doRestart = false;
        if (!(lastChar.match(/[\+\-\/\*]/gi))) {
          updateDisplay(e.target.value);
        } else if (["+","-"].indexOf(e.target.value)>-1){
          var secondLast = displayStr.charAt(displayStr.length-2);
          if (!(secondLast.match(/[\+\-\/\*]/gi))) updateDisplay(e.target.value);
        }
        break;
      case "a":
        reset();
        break;
      case "c":
        if (displayStr.length > 1) {
          $('#calc-screen').contents()[0].textContent = displayStr.substring(0, displayStr.length - 1);
        } else{
          $('#calc-screen').contents()[0].textContent = 0;
        }
        break;
      case ".":
        if ((!lastNum.includes(".")) && (!lastChar.match(/[\+\-\/\*]/gi))) updateDisplay(".");
        if (lastChar.match(/[\+\-\/\*]/gi)) updateDisplay("0.");
        break;
      case "=":
        doRestart = true;
        var lastChar = displayStr.charAt(displayStr.length-1);
        if (lastChar.match(/[\+\-\/\*]/gi)) $('#calc-screen').contents()[0].textContent = displayStr.substring(0, displayStr.length - 1);
        $('#calc-screen').contents()[0].textContent = math.eval($('#calc-screen').contents()[0].textContent);
    };
  });
});
