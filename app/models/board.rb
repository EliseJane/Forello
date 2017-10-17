class Board < ApplicationRecord
  validates_presence_of :title, allow_blank: false

  has_many :lists
  has_many :cards
end
