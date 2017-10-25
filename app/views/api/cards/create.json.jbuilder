json.merge! @card.attributes
json.board_id @card.list.board_id
json.labels @card.labels.map(&:color)
