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

end
