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
  Street.create( { title: csv_obj['EventName'], description: csv_obj['MovieName'], startdate: csv_obj['StartDate'], hour: csv_obj['EndDate'], link: csv_obj['EventUrl'], movierating: csv_obj['MovieRatin'], location: csv_obj['Location 1']})
end
