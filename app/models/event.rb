class Event < ActiveRecord::Base

  belongs_to :user

  def to_s
    self.title + " is an event in Chicago."
  end

end
