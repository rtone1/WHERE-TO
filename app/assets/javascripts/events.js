// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var app =  {};

// //Backbone template Events
app.EventTemplate = $('#eventtemplate').html();

//Backbone view for Events
app.EventView = Backbone.View.extend({

  tagName: 'div',
  className: 'eventInfo',
  template: _.template(app.EventTemplate),
  events: {
  'click #add': 'transition'
  },
  intialize: function(){
      this.listenTo(this.model, "change", this.render);
  },
  render: function(data){
    var html = this.template(data);
    this.$el.html(html);
    $(".content").append(this.$el);
  },
  transition: function(){
    app.updateList();
  }

});//end of EventView


// Date varible in month/day/year format
app.now = moment().format("MMMM D YYYY").split(' ');
// Date varible in number format
app.now2 = moment().format("L");
app.times = app.now2.slice(0,2);

$(document).ready(function(){

app.getEvents = function getEvents(){

  var deferred = $.ajax({
        method: 'get',
        url: '/api/events',
        dataType: 'json',
        success: function(data){
          for (var model in data){
            var eve = data[model];
            var view = new app.EventView();
            view.render(eve);

          }
        }
      });

      return deferred;

};


app.getMovies = function getMovies(){

  var deferred2 = $.ajax({
        method: 'get',
        url: '/api/events',
        dataType: 'json',
        success: function(data){
          for (var model in data){
            var moviesP = data[model];
            var moviesOnly = moviesP.startdate.slice(0,2);
            var displayMovie = (moviesOnly == app.times)
            if  (moviesP.category == "Movies at the park" && displayMovie) {
              var view = new app.EventView();
              view.render(moviesP);
            }
          }
        }
      });

      return deferred2;

};

app.getFestivals = function getFestivals(){

  var deferred3 = $.ajax({
        method: 'get',
        url: '/api/events',
        dataType: 'json',
        success: function(data){
          for (var model in data){
            var fest = data[model];
            var splitDates = fest.startdate.split(' ');
            var festOnly = (splitDates[0] == app.now[0]);
            if (fest.category == "Street Festival" && festOnly){
              var viewfest = new app.EventView();
              viewfest.render(fest);
            }
          }
        }

      });

      return deferred3;

};

app.getRandomEvent = function getRandomEvent(){

        $.ajax({
        method: 'get',
        url: '/api/events-rand',
        dataType: 'json',
        success: function(data){
            var viewRand = new app.EventView();
            viewRand.render(data);

        }
      });

};

app.updateList = function updateList(){

    $.ajax({
          method: 'post',
          url: '/api/update-event',
          dataType: 'json',
          data: { event: {user_list: true} },
          success: function(){

          }
    });

};


// click events for displaying events
var display = $('.content');

$('#allEvents').on('click', function(){
    display.empty();
    slideShow(app.getEvents());

});

$('#festivals').on('click', function(){
    display.empty();
    slideShow(app.getFestivals());

});

$('#movies').on('click', function(){
    display.empty();
    slideShow(app.getMovies());

});

$('#random').on('click', function(){
    display.empty();
    app.getRandomEvent();
});

$('.log-singup').hide();
    $('.logIn').on('click', function(){
    $('.log-singup').slideToggle( "slow", function() {});
});

$('.responsiveNav').hide();
    $('.ham-nav').on('click', function(){
    $('.responsiveNav').slideToggle( "slow", function() {});
});
// end of click events ===================

function slideShow(callback){
$.when(callback).done(function() {

    var test = $('.content').find('.eventInfo');
    var count = 0;

      $('#next').on('click',function(){
          $( test[count] ).fadeOut( "slow", function(){})
          count = (count + 1) % test.length;
      });


      $('#prev').on('click',function(){
         count = (count - 1);
          $( test[count] ).fadeIn( "slow", function(){})
      });

  });

};
slideShow(app.getEvents());

});//end of document ready
