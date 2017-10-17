class List < ApplicationRecord
  validates_presence_of :title, :board_id, :position

  belongs_to :board
  has_many :cards
end
