json.merge! @board.attributes

json.lists @board.lists do |list|
  json.id list.id
  json.title list.title
  json.board_id list.board_id
  json.created_at list.created_at
  json.updated_at list.updated_at
  json.position list.position
  json.cards list.cards
end
