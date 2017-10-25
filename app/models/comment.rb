class Comment < ApplicationRecord
  validates_presence_of :body, :card_id

  belongs_to :card
end
