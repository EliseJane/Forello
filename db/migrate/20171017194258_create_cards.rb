class CreateCards < ActiveRecord::Migration[5.1]
  def change
    create_table :cards do |t|
      t.string :title
      t.date :due_date
      t.text :description
      t.integer :list_id
      t.integer :board_id
      t.float :position
      t.integer :comments_count
      t.timestamps
    end
  end
end
