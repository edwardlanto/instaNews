$(document).ready(function() {
    var $articlelist = $('.article-list')
    var $container = $('.container')
    var $nytimage = $('.nyt-image')
    var $preloader = $('.preloader')
    var errortext = 'Sorry, there was an error, please try again'
    var $navwrapper = $('.nav-wrapper')

    $('select').selectric();

    $preloader.hide();

    $('.selector').on('change', function() {
        var userInput = $('.selector').val();
        $container.addClass('header-shift-with-articles')
        $nytimage.addClass('shrink-image')
        $preloader.show();
        $navwrapper.addClass('nav-article-load')

        var url = 'https://api.nytimes.com/svc/topstories/v2/' + userInput + '.json';
        url += '?' + $.param({
            'api-key': 'c70afdcb975e42eea907298ce2cd5830'
        }); //end of param method
        $articlelist.empty();
        $.ajax({
                url: url,
                method: 'GET',
            }) //end of ajax method

            .always(function() {
                $preloader.hide();
            })

            .done(function(data) {
                var $data = data.results.filter(function(item) {
                    return item.multimedia.length;
                }).splice(0, 12); // end of function call back function


                $.each($data, function(item, value) {
                    var fullArticle = ''
                    fullArticle += '<li class = "article-item">' + '<a href='
                    fullArticle += value.url + '>'
                    fullArticle += '<div class ="text-container">' + '<p class = "content-text">'
                    fullArticle += value.abstract
                    fullArticle += '</p>'
                    fullArticle += '<img class = "content-container"'
                    fullArticle += 'src="' + value.multimedia[4].url + '" />'
                    fullArticle += '</a>' + '</li>'


                    $articlelist.append(fullArticle);
                }); //end of each

            }) //end of done function
            .fail(function() {
                $articlelist.append(errortext);

            }); //beginning of fail function 
    }); //onclick close
}); //document dot rdy
