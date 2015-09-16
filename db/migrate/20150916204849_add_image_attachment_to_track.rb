class AddImageAttachmentToTrack < ActiveRecord::Migration
  def up
    add_attachment :tracks, :img
  end

  def down
    remove_attachment :tracks, :img
  end
end
