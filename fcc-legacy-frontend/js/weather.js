var URL = "https://fcc-weather-api.glitch.me/"
var latitude;
var longitude;
var tempCels;
var tempFahr;

$(document).ready(function() {
  function changeTemp(){ 
    switch($('#temp').text().slice(-1)){
      case 'F':
        $('#temp').text(tempCels+'°C');
        break;
      case 'C':
        $('#temp').text(tempFahr+'°F');
        break;
    }; 
  };
 if (navigator.geolocation) {  
   navigator.geolocation.getCurrentPosition(function(position) {
     latitude = position.coords.latitude;
     longitude = position.coords.longitude;
     $.ajax({
        type:"GET",
        url:URL + '/api/current?lat='+latitude+'&lon='+longitude,
        success: function(data) {
          $('#city').text(data.name);
          $('#temp').text(data.main.temp+'°C');
          tempCels=data.main.temp;
          tempFahr = Math.round(tempCels * 9 / 5 + 32);
          $('#temp').click(changeTemp);
          $('#desc').text(data.weather[0].main);
           $('#icon-weather').attr("src", data.weather[0].icon);
        },
        dataType: 'jsonp',
      });
     
     
      });
   
  } else {
    console.log("!navigator.geolocation");
  }
});