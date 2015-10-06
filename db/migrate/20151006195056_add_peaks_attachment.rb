class AddPeaksAttachment < ActiveRecord::Migration
    def up
      add_attachment :tracks, :peaks
    end

    def down
      remove_attachment :tracks, :peaks
    end
end
