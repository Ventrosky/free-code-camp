$(document).ready(function() {
  	$("#get-quote").on("click", function(e){
		$.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=?",function(post){
		  $('#quote-title').text(post[0].title);
		  $('#quote-content').html(post[0].content);
		  if (typeof post[0].custom_meta !== 'undefined' && typeof post[0].custom_meta.Source !== 'undefined') {
		    $('#quote-source').html('Source:' + post[0].custom_meta.Source);
		  } else {
		    $('#quote-source').text('');
		  }
		  console.log(post[0]);
		});
	});
	$("#tweet-quote").on("click", function(e){
		$(this).attr("href", 'https://twitter.com/intent/tweet?text=' + $('#quote-content').text() +'-'+$('#quote-title').text());
	}); 
});
