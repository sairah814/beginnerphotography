$(document).ready(function () {
    //BEST BUY API
    //https://api.bestbuy.com/v1/products((search=DSLR)&manufacturer=nikon&(categoryPath.id=abcat0401000))?apiKey=ejf9aapbn2z5bxwsrupvj3td&sort=longDescription.asc&show=longDescription&callback=JSON_CALLBACK&format=json


    // the parameters we need to pass in our request to Best Buy API

    var query = "nikon";
    var url = 'https://api.bestbuy.com/v1/products((search=DSLR)&manufacturer=nikon&(categoryPath.id=abcat0401000))';
    $.ajax({
        method: 'GET',
        url: url,
        data: {
            format: 'json',
            apiKey: 'ejf9aapbn2z5bxwsrupvj3td',
            page: 1, //look into later
            pageSize: 36 //look into later
        },
        cache: true, // necessary because our API rejects queries with unrecognized query parameters, such as the underscore injected when this isn't included
        preowned: false,
        active: true,
        dataType: 'jsonp'
    })

    .done(function (result) { //this waits for the ajax to return with a succesful promise object
            console.log(result.products);
            $.each(result.products, function (index, item) {
                var essential = showStream(item);
            });

            //if the response is failure

        })
        .fail(function (jqXHR, error) { //this waits for the ajax to return with an error promise object
            $('.cameras').append(error);
            console.log(error);
        });

    function showStream(product) {
        //var image = "<img src='" + product.image + "' alt='" + product.name + "'>";
        var name = product.name;
        $('.cameras').append(name);

    }

    //GOOGLE BOOKS API
    var bookrequest = "Beginner Photography";
    var url = 'https://www.googleapis.com/books/v1/volumes';
    var bookparams = {
        key: 'AIzaSyAMQwLJB37WSjNqsk1gbZwhP4B7J9T5jwk',
        q: bookrequest,
        maxResults: 20
    };
    $.ajax({
            url: url,
            data: bookparams,
            dataType: "jsonp", //use jsonp to avoid cross origin issues
            type: "GET",
        })
        .done(function (result) { //this waits for the ajax to return with a succesful promise object
            //var searchResults = showSearchResults(request.tagged, result.items.length);
            //$.each is a higher order function. It takes an array and a function as an argument.
            //The function is executed once for each item in the array.
            console.log(result);
            $.each(result.items, function (i, item) {
                var booklist = item.volumeInfo.title;
                var bookresults = sortBooks(booklist);
                console.log(booklist);
            });
        })
        .fail(function (jqXHR, error) { //this waits for the ajax to return with an error promise object
            var errorElem = showError(error);
            $('.books').append(errorElem);
        });
    var bookarray = [];

    function sortBooks(booklist) {
        bookarray.push(booklist);
        if (bookarray.length == 19) {
            console.log(bookarray);
        }
    }

    function showBooks(bookitem) {
        var bookname = bookitem;
        $('.books').append(bookname);
    }

    /*filtering by brand:
    $('.quiz-section').on('click', '.option', function () {
    var answer = $("input[class='option']:checked").val();*/
});
