class RemoveOldUrlColumns < ActiveRecord::Migration
  def change
    remove_column :users, :img_url
    remove_column :tracks, :track_url
    remove_column :tracks, :img_url
  end
end
