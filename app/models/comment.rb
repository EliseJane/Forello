class Comment < ApplicationRecord
  validates_presence_of :body, :card_id, :author

  belongs_to :card
end
