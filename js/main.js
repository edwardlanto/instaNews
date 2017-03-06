$(document).ready(function () {
  var $articlelist = $('.articlelist')
  var $container = $('.container')
  var $nytimage = $('.nytimage')
  var $preloader = $('.preloader')
  var errortext = 'Sorry, there was an error, please try again'
  var $navwrapper = $('.navwrapper')


  $preloader.hide();

  $('.selector').on('change', function () {
    var userInput = $('.selector').val();
    $container.addClass('headershiftwitharticles')
    $nytimage.addClass('shrinkimage')
    $preloader.show();
    $navwrapper.addClass('navarticleload')

    var url = 'https://api.nytimes.com/svc/topstories/v2/' + userInput + '.json';
    url += '?' + $.param({
      'api-key': 'c70afdcb975e42eea907298ce2cd5830'
    });//end of param method
    $articlelist.empty();
    $.ajax({
      url: url,
      method: 'GET',
    })//end of ajax method

      .always(function () {
        $preloader.hide();
      })

      .done(function (data) {
        var $data = data.results.filter(function (item) {
          return item.multimedia.length;
        }).splice(0, 12);// end of function call back function


        $.each($data, function (item, value) {
          var fullArticle = ''
          fullArticle += '<li>' + '<a href='
          fullArticle += value.url + '>'
          fullArticle += '<p class = "contenttext">'
          fullArticle += value.abstract
          fullArticle += '</p>'
          fullArticle += '<img class = "contentcontainer"'
          fullArticle += 'src="' + value.multimedia[4].url + '" />'
          fullArticle += '</a>' + '</li>'


          $articlelist.append(fullArticle);
        });//end of each
        // debugger;

      })//end of done function
      .fail(function () {
        $articlelist.append(errortext);

      });//beginning of fail function 
  });//onclick close
});//document dot rdy