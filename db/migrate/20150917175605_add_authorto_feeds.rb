class AddAuthortoFeeds < ActiveRecord::Migration
  def change
    add_column :feeds, :author_id, :integer
    remove_index :feeds, [:sound_id, :sound_type]
    add_index :feeds, [:author_id, :sound_id, :sound_type], unique: true
  end
end
