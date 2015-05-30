// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var app = {};

//Backbone model for Events
app.EventModel = Backbone.Model.extend();

//Backbone template Events
// app.EventTemplate = $('#event-template').html();

//Backbone view for Events
app.EventView = Backbone.View.extend({

  tagName: 'div',
  className: 'eventInfo',
  template: _.template('<div class="imagePort"><img src="<%= image %>" /></div><section id="infosection"><h2> <%= title %> </h2></section>'),
  intialize: function(){
      this.listenTo(this.model, "change", this.render);
  },
  render: function(data){
    var html = this.template(data);
    this.$el.html(html);
    $(".content").append(this.$el);

  }

});//end of EventView

// Date varible in month/day/year format
var now = moment().format("MMM Do YYYY");
// Date varible in number format
var now2 = moment().format("L");


$(document).ready(function(){

  function getEvents(){

        $.ajax({
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

  };
getEvents();

function getMovies(){

      $.ajax({
        method: 'get',
        url: '/api/events',
        dataType: 'json',
        success: function(data){
          for (var model in data){
            var moviesP = data[model];
            if  (moviesP.category == "Movies at the park"){
              var view = new app.EventView();
              view.render(moviesP);
            }
          }
        }
      });

};

function getFestivals(){

      $.ajax({
        method: 'get',
        url: '/api/events',
        dataType: 'json',
        success: function(data){
          for (var model in data){
            var fest = data[model];
            if  (fest.category == "Street Festival"){
              var viewfest = new app.EventView();
              viewfest.render(fest);
            }
          }
        }
      });

};

var display = $('.content');

$('#allEvents').on('click', function(){
    display.empty();
    getEvents();
});

$('#festivals').on('click', function(){
    display.empty();
    getFestivals();
});

$('#movies').on('click', function(){
    display.empty();
    getMovies();
});

});//end of document ready
