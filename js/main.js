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

      .done(function (data) {
        $preloader.hide();
        var $data = data.results.filter(function (item) {
          return item.multimedia.length;
        })// end of function call back function

          .splice(0, 12);
        $.each($data, function (item, value) {
          var articleUrl = value.url
          var articlePictures = ''
          articlePictures = '<img class ="contentcontainer"' + 'src="' + value.multimedia[4].url + '"  />'
          var articleName = value.abstract;
          var fullArticle = '<li>' + '<a href =' + articleUrl + '>' + '<p class = "contenttext">' + articleName + '</p>' + articlePictures + '</a>' + '</li>'



          $articlelist.append(fullArticle);
        });//end of each
        // debugger;

      })//end of done function
      .fail(function () {
        $preloader.hide();
        $articlelist.append(errortext);

      });//beginning of fail function 
  });//onclick close
});//document dot rdy