class CreateFollowings < ActiveRecord::Migration
  def change
    create_table :followings do |t|
      t.integer :follower_id, null: false
      t.integer :followee_id, null: false
    end

    add_index :followings, :follower_id
    add_index :followings, :followee_id
  end
end
