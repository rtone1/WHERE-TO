// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var app = {};

//Backbone model for Events
app.EventModel = Backbone.Model.extend();

//Backbone template Events
app.EventTemplate = $('#event-template').html();

//Backbone view for Events
app.EventView = Backbone.View.extend({
  tagName: 'div',
  className: 'eventInfo',
  //template: _.template(app.EventTemplate),
  template: _.template('<h1><%= title %></h1>'),
  intialize: function(){
      this.listenTo(this.model, "change", this.render);
  },
  render: function(){
    var data = this.model.attributes;
    console.log(data);
    var html = this.template(data);
    this.$el.html(html);
    $(".content").append(this.$el);
  }
});//end of EventView

//Backbone collection for Events
app.EvnetList = Backbone.Collection.extend({
  url: '/api/events',
  model: app.EventModel
});

app.EventListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, "sync", this.render);
  },
  render: function(){
    //this.$el.empty();
    var modelCount = this.collection.models.length;
    for (var i = 0; i < modelCount; i++) {
      var model = this.collection.models[i];
      var view = new app.FoodView({ model: model});
      view.render();
    }
  }
});//end of EventListView


$(document).ready(function(){
  console.log('You are raedy to code');



});
