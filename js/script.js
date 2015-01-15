stringUrl="";
UrlData = "";
viewCount = [];
likeCount = [];
commentCount = [];
id = [];
title = [];
description = [];
image = [];

function loadingVideo(linkVideo,Comment,LikesVideo,Vcounts){
$(".Contenido").empty();
$("input").val("");

var Urls = '<iframe width="450" height="315" src="http://www.youtube.com/embed/'
var RestUrls = ' frameborder="0" allowfullscreen>'
$(".Contenido").append(Urls+linkVideo+'"'+RestUrls+'</iframe>');
}

$(document).ready(function($) {
	$.ajax({
		url : "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCZIdvJkrCNDjswEeRtMTbN6B9yEiz2pEo&channelId=UCZJ7m7EnCNodqnu5SAtg8eQ&part=snippet&maxResults=50&format=json",
		dataType : "jsonp",
		success : function(parsed_json) {
	
		for (var i = 0; i <= 49; i++) {
			if (i==49){
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
				for (var e = 0; e<=49; e++) {
					title.push(parsed_jso["items"][e]["snippet"]["title"])
					id.push(parsed_jso["items"][e]["id"])
					description.push(parsed_jso["items"][e]["snippet"]["description"])
					viewCount.push(parsed_jso["items"][e]["statistics"]["viewCount"])
					likeCount.push(parsed_jso["items"][e]["statistics"]["likeCount"])
					commentCount.push(parsed_jso["items"][e]["statistics"]["commentCount"])
					image.push(parsed_jso["items"][e]["snippet"]["thumbnails"]["default"]["url"])
				};			
			console.log(description)
			//console.log(title)
			var initialData = []
			for (var e = 0; e<=49; e++) {
				initialData.push(({name:title[e], images:image[e], view:viewCount[e], like:likeCount[e], comment:commentCount[e]
, ids:id[e]}))
			};
	$("#Searcher").click(function(){
		$(".show").empty();
			
	for (var x = 0; x <49; x++) {
		/*console.log(initialData[x]["name"])*/
		console.log(description[x])
		var ini  = $("input[name=buscar]").val();
		var busqueda = initialData[x]["name"]
		var resultado = busqueda.toLowerCase();
		var ini = ini.toLowerCase();
		var a = x
	
		
		if ( resultado.search(ini) == -1 ){
			
		}else{
			
		$(".show").append("<tr>"+"<td>"+"<span>"+initialData[x]["name"]+"</td>"+"<td>"+"</span>"+'<button type="button" class="btn btn-warning " onClick="loadingVideo(\''+id[x]+'\',\''+commentCount[x]+'\',\''+likeCount[x]+'\',\''+viewCount[x]+'\')" data-dismiss="modal">'+'Watch Video Now!'+'</button>'+"</td>"+"</tr>");

		}
		};

	});


var ViewModel = function(items) {
	this.items = ko.observableArray(items);

	this.sortByName = function() {
		this.items.sort(function(a, b) {
			return a.name < b.name ? -1 : 1;
		});
		
	};
		this.sortByName_z_a = function() {
		this.items.sort(function(a, b) {
			return a.name > b.name ? -1 : 1;
		});
	};

	this.sortByLikes = function() {
		this.items.sort(function(c, d) {
			return c.like > d.like ? -1 : 1;
		});
	};
	
	this.sortByViews = function() {
		this.items.sort(function(c, d) {
			return c.view > d.view ? -1 : 1;
		});
	};
		this.sortByLestViews = function() {
		this.items.sort(function(c, d) {
			return c.view < d.view ? -1 : 1;
		});
	};

	
	this.sortByComments = function() {
		this.items.sort(function(c, d) {
			return c.comment < d.comment ? -1 : 1;
		});
	};     

		this.sortByLestComments = function() {
		this.items.sort(function(c, d) {
			return c.comment > d.comment ? -1 : 1;
		});
	};

	this.gridOptions = {
		data: this.items,
		rowTemplate: "rowTmpl",
		useKOTemplates: true,
		height: 415,

		columns: [ 
            {
                title: "Name"
            },
            {
                title: "Image"   
            },
			{
				title: "View Count"
			},
			{
				title: "Like Count"
			},
			{
				title: "Comment Count"
			},
        ],
	pageable: {
		
		pageSize: 3,
		buttonCount: 1
	  },
	};
};


ko.applyBindings(new ViewModel(initialData));

			}
		}); 
		} 

	});
});
