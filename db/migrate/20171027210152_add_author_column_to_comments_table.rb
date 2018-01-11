class AddAuthorColumnToCommentsTable < ActiveRecord::Migration[5.1]
  def change
    add_column :comments, :author, :string
  end
end
