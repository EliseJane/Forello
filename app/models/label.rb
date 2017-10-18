class Label < ApplicationRecord
  validates_presence_of :color

  has_many :labelizations
  has_many :cards, through: :labelizations
end
