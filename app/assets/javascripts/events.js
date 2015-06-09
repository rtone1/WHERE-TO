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
  'click #next': 'transition'
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
    var conter = 0;
    conter = (conter + 1) % data.length;
    console.log(data[conter]);
  }

});//end of EventView


// Date varible in month/day/year format
app.now = moment().format("MMMM D YYYY").split(' ');
// Date varible in number format
app.now2 = moment().format("L");
app.times = app.now2.slice(0,5);

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
//app.getEvents();

app.getMovies = function getMovies(){

  var deferred2 = $.ajax({
        method: 'get',
        url: '/api/events',
        dataType: 'json',
        success: function(data){
          for (var model in data){
            var moviesP = data[model];
            var moviesOnly = moviesP.startdate == "08/30/2015";
            if  (moviesP.category == "Movies at the park" && moviesOnly){
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
// end of click events ===================

function slideShow(callback){
$.when(callback).done(function() {

    var test = $('.content').find('.eventInfo');
    var conter = -1;
    var slide;

      $('#next').on('click',function(){
         conter = (conter + 1) % test.length;
         slide = (test[conter]);
           $( test[conter] ).fadeOut( "slow", function(){})
      });

  });

};
slideShow(app.getEvents());

});//end of document ready
