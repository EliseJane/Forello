class AddCompletedAndArchivedColumnsToCardsTable < ActiveRecord::Migration[5.1]
  def change
    add_column :cards, :archived, :boolean, :default => false
    add_column :cards, :completed, :boolean, :default => false
  end
end
