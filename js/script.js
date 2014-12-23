$(document).ready(function () {
    //Knockout Test
        var url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCZIdvJkrCNDjswEeRtMTbN6B9yEiz2pEo&channelId=VLLLSt653h2wwu3IeYhiL9Qwyg&part=snippet%2Cid&order=date&maxResults=4";
        var viewModel = {};
        $.getJSON(url, function (data) {
            viewModel.model = data;
            ko.applyBindings(viewModel);
        });
    });