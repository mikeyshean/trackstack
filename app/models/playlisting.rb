class Playlisting < ActiveRecord::Base
  belongs_to :playlist
  belongs_to :track
  
  validates :track, :playlist, presence: true

end
