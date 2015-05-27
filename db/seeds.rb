# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'csv'

# filename = File.expand_path('../Movies_AT_Park.csv', __FILE__)
#
# CSV.foreach(filename, :headers=>true) do |csv_obj|
#
#   Event.create!({
#      title: csv_obj[' EventName '],
#      moviename: csv_obj[' MovieName'],
#      hour: csv_obj[' StartDate'],
#      link: csv_obj[' EventUrl'],
#      movierating: csv_obj[' MovieRating'],
#      location: csv_obj['Location 1']
#      })
#
# end


filename = File.expand_path('../Chicago_Festivals.csv', __FILE__)

CSV.foreach(filename, :headers=>true) do |csv_obj|

  Event.create!({

     category: csv_obj['Category'],
     title: csv_obj['Title'],
     description: csv_obj['Description'],
     startdate: csv_obj['Startdate'],
     hour: csv_obj['Times'],
     link: csv_obj['EventUrl'],
     neighborhood: csv_obj['Neighborhood'],
     location: csv_obj['Location'],
     image: csv_obj['imageURl']

     })

end
