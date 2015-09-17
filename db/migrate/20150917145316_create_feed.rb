class CreateFeed < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
      t.integer :sound_id
      t.string :sound_type
    end
  end
end
