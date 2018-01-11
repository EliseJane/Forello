# This file should contain all the record creation needed to seed the database with.
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

list1 = List.create(title: 'First List', position: 10.0, board_id: 1)
list1.cards << Card.create(title: 'First Card', position: 100.0, description: 'just a test', completed: true)
list1.cards << Card.create(title: 'Second Card', position: 200.0, description: 'something to do', due_date: Time.now - 1.day)
list1.cards << Card.create(title: 'Third Card', position: 300.0, due_date: Time.now + 1.year)


list2 = List.create(title: 'Second List', position: 20.0, board_id: 1)
card = Card.create(title: 'Fourth Card', position: 100.0, description: 'tasks tasks tasks', due_date: Time.now - 1.day, completed: true)
list2.cards << card
card.labels << Label.first
card.labels << Label.third

comment = Comment.create(body: "I'm a little comment, short and stout", author: "Dylan Olivares")
card.comments << comment

Board.create(title: 'Second Board')
Board.create(title: 'Third Board')
List.create(title: 'Third List', position: 10.0, board_id: 3)
