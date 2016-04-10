$(document).ready(function () {

    //User can click and change content with main navigation
    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('tabindex');
        $('ul.tabs li').removeClass('current');
        $('.content').removeClass('current');
        $(this).addClass('current');
        $('#' + tab_id).addClass('current');
    })


    /*
    //YouTube API

    var videoparams = {
        key: 'AIzaSyAe0bg4MZazw0wK_e0Wpp8lPzW716Ih0zY',
        q: 'Beginner Photography',
        part: 'snippet',
        type: 'video',
        maxResults: 9
    };
    var youtubeurl = 'https://www.googleapis.com/youtube/v3/search';
    $.ajax({
            url: youtubeurl,
            data: videoparams,
            dataType: 'jsonp',
            type: 'GET'
        })
        .done(function (result) {
            //console.log(result);
            $.each(result.items, function (i, item) {
                showResults(item);
            });

        })
        .fail(function (jqXHR, error) {
            console.log(error);
            $('.tutorials').append(error);

        });

    function showResults(results) {
        //var output = "<p>" + results.snippet.channelTitle + "<img src='" + results.snippet.thumbnails.high.url + "'/></p>";
        var videourl = results.id.videoId;
        var output = "<iframe class= 'materials' height='315' width='420' src='http://www.youtube.com/embed/" + videourl + "' frameborder='0' allowfullscreen></iframe>";
        $('.tutorials').append(output);
    }

    //GOOGLE BOOKS API
    var bookrequest = "Beginner Photography";
    var booksurl = 'https://www.googleapis.com/books/v1/volumes';
    var bookparams = {
        key: 'AIzaSyAMQwLJB37WSjNqsk1gbZwhP4B7J9T5jwk',
        q: bookrequest,
        maxResults: 9
    };
    $.ajax({
            url: booksurl,
            data: bookparams,
            dataType: "jsonp", //use jsonp to avoid cross origin issues
            type: "GET",
        })
        .done(function (result) {
            //console.log(result);
            $.each(result.items, function (i, item) {
                var booklist = item.volumeInfo.title;
                var bookresults = showBooks(booklist);
                //console.log(booklist);
            });
        })
        .fail(function (jqXHR, error) {
            var errorElem = showError(error);
            $('.books').append(errorElem);
        });


    function showBooks(bookitem) {
        var bookname = bookitem;
        $('.books').append(bookname);
    }*/
    //BEST BUY API
    //'https://api.bestbuy.com/v1/products((search=DSLR)&manufacturer=nikon&(categoryPath.id=abcat0401000))';
    //https://api.bestbuy.com/v1/products((search=DSLR)&customerReviewCount>80&onSale=true&(categoryPath.id=abcat0401000))
    //?apiKey=ejf9aapbn2z5bxwsrupvj3td&sort=salePrice.asc&callback=JSON_CALLBACK&format=json


    /*var currentinput = $("input:checked").val();
    if (currentinput = "0") {
        var bestbuyurl = 'https://api.bestbuy.com/v1/products((search=DSLR)&customerReviewCount>80&onSale=true&color=black&(categoryPath.id=abcat0401000))';
        $('.cameras').empty();
        runBestBuy(bestbuyurl);
    } else if (currentinput = "1") {
        var bestbuyurl = 'https://api.bestbuy.com/v1/products((search=DSLR)&manufacturer=nikon&customerReviewCount>80&(categoryPath.id=abcat0401000))';
        $('.cameras').empty();
        runBestBuy(bestbuyurl);
    } else if (currentinput = "2") {
        var bestbuyurl = 'https://api.bestbuy.com/v1/products((search=DSLR)&manufacturer=canon&customerReviewCount>80&(categoryPath.id=abcat0401000))';
        $('.cameras').empty();
        runBestBuy(bestbuyurl);
    } else {
        $('.cameras').empty();
        $('.cameras').append("Hey there's something wrong here");
    }

    //var defaultbestbuy = 'https://api.bestbuy.com/v1/products((search=DSLR)&customerReviewCount>80&onSale=true&color=black&(categoryPath.id=abcat0401000))';
    //runBestBuy(defaultbestbuy);*/


    var bestbuyurl = 'https://api.bestbuy.com/v1/products((search=DSLR)&customerReviewCount>80&onSale=true&color=black&(categoryPath.id=abcat0401000))';

    $.ajax({
        method: 'GET',
        url: bestbuyurl,
        data: {
            format: 'json',
            apiKey: 'ejf9aapbn2z5bxwsrupvj3td',
            sort: 'salePrice.asc',
            page: 1,
            pageSize: 15
        },
        cache: true, // necessary because our API rejects queries with unrecognized query parameters, such as the underscore injected when this isn't included
        preowned: false,
        active: true,
        dataType: 'jsonp'
    })

    .done(function (result) {
            console.log(result.products);
            $.each(result.products, function (index, item) {
                var essential = showStream(item);
            });
        })
        .fail(function (jqXHR, error) {
            $('.cameras').append(error);
            console.log(error);
        });

    function showStream(product) {
        var image = "<img class='stream-image' src='" + product.image + "' alt='" + product.name + "'>";
        var name = "<figcaption class='stream-caption'>" + product.name + "</figcaption>";
        var link = product.url;
        var streamitem = "<div class='stream'><a href='" + link + "'>" + image + "</a>" + name;
        /*console.log(link);
        console.log(link.replace(/\"/g, ""));
        link.replace(/\"/g, "");*/
        $('.camera-stream').append(streamitem);

    }
    /*
    //Flickr API
    var flickrurl = 'https://api.flickr.com/services/rest/';
    var photoparams = {
        method: 'flickr.groups.pools.getPhotos',
        api_key: '23d67b1c61e2e05e99bd91280fd1f0d6',
        group_id: '1601790@N20',
        extras: 'url_sq, views',
        nojsoncallback: 1,
        format: 'json',
        per_page: 15

    };
    $.ajax({
            url: flickrurl,
            data: photoparams,
            //dataType: 'jsonp',
            type: 'GET'
        })
        .done(function (result) {
            //console.log(result.photos.photo);
            $.each(result.photos.photo, function (i, item) {
                var photos = showPhotoIdeas(item);
                $('.ideas-content').append(photos);
            });

        })
        .fail(function (jqXHR, error) {
            console.log(error);
            $('.ideas-content').append(error);

        });

    function showPhotoIdeas(photostream) {
        //var image = "<img src='" + product.image + "' alt='" + product.name + "'>";

        var imageurl = photostream.url_sq;
        var imagename = photostream.title;
        var imageviews = parseInt(photostream.views);
        //return ("<img src='" + imageurl + "' alt='" + imagename + "'>");
        if (imageviews > 10) {
            return ("<img src='" + imageurl + "' alt='" + imagename + "'>");
        }
    }

*/

});
