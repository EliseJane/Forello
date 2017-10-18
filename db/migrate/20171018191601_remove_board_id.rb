class RemoveBoardId < ActiveRecord::Migration[5.1]
  def change
    remove_column :cards, :board_id
  end
end
