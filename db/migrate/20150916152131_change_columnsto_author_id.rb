class ChangeColumnstoAuthorId < ActiveRecord::Migration
  def change
    rename_column :playlists, :user_id, :author_id
    rename_column :tracks, :user_id, :author_id
  end
end
