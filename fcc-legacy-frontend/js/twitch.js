var baseURL = "https://wind-bow.glitch.me/twitch-api";
var streamList = ["buccaneerdev", "burkeblack", "ESL_SC2", "freecodecamp", "OgamingSC2", "storbeck"];

$(document).ready(function() {
	function createResult(name, logo, stream, status, link){
		name = streamList[streamList.findIndex(item => item.toLowerCase() == name)];
		var htmlButton = (stream != 'offline' ? ('<a href="'+link+'" target="_blank" class="btn btn-success tooltips" data-placement="top" data-toggle="tooltip" data-original-title="Online"><i class="fa fa-twitch"></i></a>') : ('<a href="'+link+'" target="_blank" class="btn btn-danger tooltips" data-placement="top" data-toggle="tooltip" data-original-title="Offline"><i class="fa fa-twitch"></i></a>'));
		var htmlCode = '<div class="col-sm-6 col-centered"><div class="panel"><div class="panel-body p-t-10"><div class="media-main"><a class="pull-left" href="#"><img class="thumb-lg img-circle bx-s" src="'+logo+'" alt=""></a><div class="pull-right btn-group-sm">'+htmlButton+'</div><div class="info"><h4>'+name+'</h4><p class="text-muted">'+status+'</p></div></div></div></div></div><div class="clearfix"></div>';
		$("#channels").append($.parseHTML(htmlCode));
		$(function(){$("a[data-toggle='tooltip']").tooltip();});
	 }  
	for (i=0; i< streamList.length;i++){
		$.getJSON(baseURL+'/streams/'+streamList[i]+'?callback=?', function(data) {
  			if (data.stream != null){
				createResult(data.stream.channel.name, data.stream.channel.logo, data.stream.stream_type, data.stream.channel.status, 'https://www.twitch.tv/'+data.stream.channel.name);
			 } else  {
				var channelName = data._links.channel.split('/');
				 createResult(channelName[channelName.length-1], 'https://pbs.twimg.com/profile_images/1212600265/OBS_Logo_Twitter_400x400.png', 'offline', '', 'https://www.twitch.tv/'+channelName[channelName.length-1]);
    			}
		});
	};
});
