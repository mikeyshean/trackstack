class AddAttachmentsUserCoverPhototake2 < ActiveRecord::Migration
  def up
    add_attachment :users, :cover_img
  end

  def down
    remove_attachment :users, :cover_img
  end
end
