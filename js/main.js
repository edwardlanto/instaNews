$(document).ready(function(){
 var $articlelist = $('.articlelist')
 var $container = $('.container')
 var $nytimage = $('.nytimage')
 var $preloader = $('.preloader')
 var errortext = 'Sorry, there was an error, please try again'
 
  $('.preloader').hide();

$('.selector').on('change', function(){
      var userInput = $('.selector').val();
      $container.addClass('headershiftwitharticles')
      $nytimage.addClass('shrinkimage')
      $preloader.show();

      var url = 'https://api.nytimes.com/svc/topstories/v2/' + userInput + '.json';
      url += '?' + $.param({
      'api-key': 'c70afdcb975e42eea907298ce2cd5830'
      });
$articlelist.empty();
$.ajax({
    url: url,
    method: 'GET',
})
  
.done(function(data) {
    $('.preloader').hide();
   var $data = data.results.filter(function(item){
  return item.multimedia.length;  
   }).splice(0, 12);
    $.each($data , function(item, value){
       var articleUrl = value.url
       var articlePictures = ''
       articlePictures =  '<img src="' + value.multimedia[4].url +'" />'
       var articleName = value.abstract;
       var fullArticle = '<li>' + '<a href =' + articleUrl + '>'   + '<p class = "contenttext">' + articleName + '</p>' + articlePictures  +  '</a>' + '</li>'
   
    

      $articlelist.append(fullArticle);
    });
      

    })
.fail(function() {
  $('.preloader').hide();
  $articlelist.append(errortext);

    }); 
  });//onclick close
});//document dot rdy