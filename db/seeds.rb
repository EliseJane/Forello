# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Board.create(title: 'First Board')
List.create(title: 'First List', position: 0.0, board_id: 1)
Card.create(title: 'First Card', position: 0.0, list_id: 1, board_id: 1, description: 'test', due_date: nil, comments_count: 0)
