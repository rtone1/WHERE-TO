class AddUserlistToEvents < ActiveRecord::Migration
  def change
    add_column :events, :user_list, :boolean
    end
  
end
