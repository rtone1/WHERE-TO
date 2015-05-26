class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :category
      t.string :title
      t.string :moviename
      t.text :description
      t.string :startdate
      t.string :hour
      t.string :link
      t.string :image
      t.string :location
      t.string :movierating
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
