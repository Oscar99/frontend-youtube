stringUrl="";
UrlData = "";
viewCount = [];

$(document).ready(function() {
	$('.dropdown-toggle').dropdown()
	});
		$(document).ready(function($) {
			$.ajax({
				url : "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCZIdvJkrCNDjswEeRtMTbN6B9yEiz2pEo&channelId=UCutAQ7OXuxEZ1Cw3ZPmPOZA&part=snippet&maxResults=10&format=json",
				dataType : "jsonp",
				success : function(parsed_json) {
				for (var i = 0; i <= 9; i++) {
					if (i==9){
						stringUrl = stringUrl + parsed_json["items"][i]["id"]["videoId"];
					}else{
						stringUrl = parsed_json["items"][i]["id"]["videoId"]+ "%2C+" +stringUrl
					};
				};
				UrlData = "https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+statistics&id="+stringUrl+"&maxResults=10&key=AIzaSyCZIdvJkrCNDjswEeRtMTbN6B9yEiz2pEo";
				console.log(UrlData)
				$.ajax({
				url: UrlData,
				dataType : "jsonp",
				success : function(parsed_jso) {
					for (var e = 0; e<=9; e++) {
						viewCount.push(parsed_jso["items"][e]["statistics"]["viewCount"])
					};
				console.log(viewCount)
				}
			});
		}
	});
});
/*$(document).ready(function () {
    //Knockout Test
        var url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCZIdvJkrCNDjswEeRtMTbN6B9yEiz2pEo&channelId=VLLLSt653h2wwu3IeYhiL9Qwyg&part=snippet%2Cid&order=date&maxResults=4";
        var viewModel = {};
        $.getJSON(url, function (data) {
            viewModel.model = data;
            ko.applyBindings(viewModel);
        });
    });
*/