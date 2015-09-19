class CreateLikings < ActiveRecord::Migration
  def change
    create_table :likings do |t|
      t.integer :user_id, null: false
      t.integer :likable_id, null: false
      t.string :likable_type, null: false
      t.timestamps null: false
    end
    add_index :likings, :user_id
    add_index :likings, [:likable_id, :likable_type]
  end
end
