class ChangeColumnNullTracks < ActiveRecord::Migration
  def change
    change_column_null(:tracks, :title, true)
  end
end
