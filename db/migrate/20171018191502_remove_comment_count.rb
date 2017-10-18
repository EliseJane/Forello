class RemoveCommentCount < ActiveRecord::Migration[5.1]
  def change
    remove_column :cards, :comments_count
  end
end
