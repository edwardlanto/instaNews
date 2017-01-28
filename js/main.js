$(document).ready(function(){
  $('.selector').on('change', function(){
      var userInput = $('.selector').val();

      var url = 'https://api.nytimes.com/svc/topstories/v2/' + userInput + '.json';
      url += '?' + $.param({
      'api-key': 'c70afdcb975e42eea907298ce2cd5830'
      });
  $.ajax({
    url: url,
    method: 'GET',
    // dataType:'json'
  })
  

  .done(function(data) {
    console.log(data)
   var $data = data.results.filter(function(item){
     return item.multimedia.length;
   }).splice(0, 12);
    $.each($data , function(item, value){
       var articleUrl = value.url
       var articlePictures = ''
       articlePictures =  '<img src="' + value.multimedia[4].url +'" />'
       var articleName = value.abstract;
      var fullArticle = '<li>' + '<a href =' + articleUrl + '>'  +  articlePictures + '<h2>' + articleName + '</h2>'  +  '</a>' + '</li>'
      console.log(data)
      
     
      $('.articlelist').append(fullArticle);
    });
      

    })
.fail(function(err) {
      throw err;

    }); 
  });//onclick close
});//document dot rdy