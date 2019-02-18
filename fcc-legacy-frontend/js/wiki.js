var wikiURL = "https://en.wikipedia.org/w/api.php";




$(document).ready(function() {
  
  function createResult(title, snippet, pageid){
    var new_li = $("<li></li>");
    var new_div = $('<div />', {
        "class": 'article',
        click: function(){
            window.open("http://en.wikipedia.org/?curid="+pageid);
        }})
    var new_h = $("<h4></h4>").text(title);
    var new_p = $("<p></p>").html(snippet+"...");
    new_div.append(new_h);
    new_div.append(new_p);
    new_li.append(new_div);
    $("#wiki-list").append(new_li);
  }



  $("#rnd-article").on("click",function(){
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });
  
  $("#find-article").on("click",function(){
    var customTopic = $("#custom-topic").val();
    if ((customTopic == undefined)||(customTopic == "")){
      window.open("https://en.wikipedia.org/wiki/Special:Random");
      return;
    }
    $.ajax( {
      url: wikiURL,
      data: { 
        action: 'query', 
        list: 'search', 
        srsearch: customTopic, 
        format: 'json' },
      dataType: 'jsonp',
      type: 'POST',
      success: function(data) {
        $("#wiki-list").html("");
        for (var i=0; i<data.query.search.length; i++){
          createResult(data.query.search[i].title, data.query.search[i].snippet, data.query.search[i].pageid);
        }
      }
    } );
    
    
  });
  
  
});
