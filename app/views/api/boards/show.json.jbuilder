json.merge! @board.attributes

json.lists @board.lists do |list|
  json.id list.id
  json.title list.title
  json.board_id list.board_id
  json.created_at list.created_at
  json.updated_at list.updated_at
  json.position list.position
  json.cards list.cards do |card|
    json.id card.id
    json.title card.title
    json.description card.description
    json.due_date card.due_date
    json.comments_count 0
    json.list_id card.list_id
    json.board_id card.list.board_id
    json.position card.position
    json.labels card.labels.map(&:color)
  end
end
