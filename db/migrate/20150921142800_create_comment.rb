class CreateComment < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :text, null: false
      t.integer :track_id, null: false
      t.integer :author_id, null: false
      t.float :submitted_at, null: false
    end
    add_index :comments, :track_id
    add_index :comments, :author_id
  end
end
