// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var app =  {};

//Backbone model for Events
app.EventModel = Backbone.Model.extend();

//Backbone template Events
app.EventTemplate = $('#eventtemplate').html();

//Backbone view for Events
app.EventView = Backbone.View.extend({

  tagName: 'div',
  className: 'eventInfo',
  //template: _.template(app.EventTemplate),
  template: _.template('<div class="imagePort" style="background-image: url(<%= image %>)"><div class="image-haeder"> <h1> <%= title %> </h1><div class="rating"><h3> <%= moviename %> </h3> <b> <%= movierating %> </b></div> </div> </div> <section id="infosection"> <p class="dates"> <strong> <%= startdate %> </strong> <br> <%= hour %> </p> <div class="location"> <h4> <%= neighborhood %> </h4>  <%= location %> </div> <p class="descrip"> <%= description %> </p> <a href=" <%= link %> " target="_blank"> <%= link %> </a> </section>'),
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
app.now = moment().format("MMM Do YYYY");
// Date varible in number format
app.now2 = moment().format("L");


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


// click events for displaying events
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
