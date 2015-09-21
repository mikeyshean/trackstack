class AddTimeStampToComments < ActiveRecord::Migration
  def change
      change_table(:comments) { |t| t.timestamps }
  end
end
