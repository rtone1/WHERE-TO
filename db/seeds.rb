# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'csv'

filename = File.expand_path('../Chicago_Park_District_Movies_in_the_Parks_2015.csv', __FILE__)

CSV.foreach(filename, :headers=>true) do |csv_obj|
  Event.create( { title: csv_obj['EventName']}, { moviename: csv_obj['MovieName']}, {hour: csv_obj['StartDate','EndDate']}, {link: csv_obj['EventUrl']}, {movierating: csv_obj['MovieRating']}, {park: csv_obj['ParkName']}, {location: csv_obj['Location 1']})
end
