class AddAttachmentsUserCoverPhoto < ActiveRecord::Migration
  def change
    def up
      add_attachment :users, :cover_img
    end

    def down
      remove_attachment :users, :cover_img
    end
  end
end
