class EventsController < ApplicationController

  def index
    @Events = Event.all
  end

  def show
    @Event = Event.find(params[:id])
  end

end
