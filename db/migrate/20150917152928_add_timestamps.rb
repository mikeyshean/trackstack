class AddTimestamps < ActiveRecord::Migration
  def change
      change_table(:followings) { |t| t.timestamps }
      change_table(:feeds) { |t| t.timestamps }
  end
end
