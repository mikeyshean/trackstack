class AddPapercliptoUser < ActiveRecord::Migration
  def up
    add_attachment :users, :img
    add_attachment :tracks, :track
  end

  def down
    remove_attachment :users, :img
    remove_attachment :tracks, :track
  end
end
