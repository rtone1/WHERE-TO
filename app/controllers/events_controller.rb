class EventsController < ApplicationController

  def index
    @Events = Event.all
  end

  def show
    @Event = Event.find(params[:id])
  end

  def eventsapi
    events = Event.all
    render json: events
  end

  def eventapi
    event = Event.find(params[:id])
    render json: event
  end

  def eventsapimix
    events = Event.all
    random = events.sample()
    render json: random
  end

  def eventsapimovie
    events = Event.all()
    events = events.where(category: "Movies at the park")
    render json: events
  end

  def eventsapifest
    events = Event.all()
    events = events.where(category: "Street Festival")
    render json: events
  end


end
