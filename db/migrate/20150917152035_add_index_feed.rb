class AddIndexFeed < ActiveRecord::Migration
  def change
    add_index :feeds, [:sound_id, :sound_type], unique: true
  end
end
