$(document).ready(function(){
    $('.select').on('change', function(){
        var userInput = $('.select').val();
        var $articleList = $('.articleList')
var url = 'https://api.nytimes.com/svc/topstories/v2/' + userInput + '.json';
url += '?' + $.param({
  'api-key': 'c70afdcb975e42eea907298ce2cd5830'
});
$.ajax({
  urlkey: url,
  method: 'GET',
}).done(function(data) {
  $.each(data.results, function(key, value){
    var articleName = value.abstract
    var articlePicture = value.multimedia[4].url
    var fullArticle = '<li>' + articlePicture + articleName + '</li>'
    console.log(data)
    $articleList.append(articlePicture)
  })

   });

  // .fail(function(err) {ç
  // throw err;
});

    });
// });
