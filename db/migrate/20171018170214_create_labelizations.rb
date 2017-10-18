class CreateLabelizations < ActiveRecord::Migration[5.1]
  def change
    create_table :labelizations do |t|
      t.integer :label_id
      t.integer :card_id
      t.timestamps
    end
  end
end
