// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var app =  {};

// //Backbone model for Events
// app.EventModel = Backbone.Model.extend();
//
// //Backbone template Events
// app.EventTemplate = $('#eventtemplate').html();

//Backbone view for Events
app.EventView = Backbone.View.extend({

  tagName: 'div',
  className: 'eventInfo',
  //template: _.template(app.EventTemplate),
  template: _.template('<div class="imagePort" style="background-image: url(<%= image %>)"><div class="image-haeder"> <h1> <%= title %> </h1><div class="rating"><h3> <%= moviename %> </h3> <b> <%= movierating %> </b></div> </div> </div> <section id="infosection"> <p class="dates"> <strong> <%= startdate %> </strong> <br> <%= hour %> </p> <div class="center"></div> <div class="location"> <h4> <%= neighborhood %> </h4>  <%= location %> </div> <p class="descrip"> <%= description %> <br> <a href=" <%= link %> " target="_blank"> <%= link %> </a> </p> </section>'),
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
app.now = moment().format("MMMM D YYYY").split(' ');
// Date varible in number format
app.now2 = moment().format("L");


$(document).ready(function(){

app.getEvents = function getEvents(){

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
app.getEvents();

app.getMovies = function getMovies(){

      $.ajax({
        method: 'get',
        url: '/api/events',
        dataType: 'json',
        success: function(data){
          for (var model in data){
            var moviesP = data[model];
            var moviesOnly = moviesP.startdate == app.now2;
            if  (moviesP.category == "Movies at the park"){
              var view = new app.EventView();
              view.render(moviesP);
            }
          }
        }
      });

};

app.getFestivals = function getFestivals(){

      $.ajax({
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

};


// click events for displaying events
var display = $('.content');

$('#allEvents').on('click', function(){
    display.empty();
    app.getEvents();
});

$('#festivals').on('click', function(){
    display.empty();
    app.getFestivals();
});

$('#movies').on('click', function(){
    display.empty();
    app.getMovies();
});



});//end of document ready
