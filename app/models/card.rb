class Card < ApplicationRecord
  validates_presence_of :title, :list_id, :board_id, :position

  belongs_to :list
  belongs_to :board
  has_many :labelizations
  has_many :labels, through: :labelizations
end
