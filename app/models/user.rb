class User < ActiveRecord::Base
  has_secure_password
  has_many :events

  def to_s
    self.username + " is a user on Where-to app."
  end

end
