class Labelization < ApplicationRecord
  validates_presence_of :label_id, :card_id

  belongs_to :label
  belongs_to :card
end
