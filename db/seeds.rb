# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

labels = ['green', 'yellow', 'orange', 'red', 'purple', 'blue']

labels.each do |color|
  Label.create(color: color)
end

Board.create(title: 'First Board')

List.create(title: 'First List', position: 1.0, board_id: 1)
Card.create(title: 'First Card', position: 1.0, list_id: 1, board_id: 1, description: 'just a test', due_date: nil, comments_count: 3)
Card.create(title: 'Second Card', position: 2.0, list_id: 1, board_id: 1, description: 'something to do', due_date: nil, comments_count: 0)
Card.create(title: 'Third Card', position: 3.0, list_id: 1, board_id: 1, description: 'whatever you want', due_date: nil, comments_count: 1)


List.create(title: 'Second List', position: 2.0, board_id: 1)
card = Card.create(title: 'Fourth Card', position: 1.0, list_id: 2, board_id: 1, description: 'tasks tasks tasks', due_date: nil, comments_count: 0)
card.labels << Label.first
card.labels << Label.third

Board.create(title: 'Second Board')
Board.create(title: 'Third Board')
List.create(title: 'Third List', position: 1.0, board_id: 3)
