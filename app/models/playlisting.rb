class Playlisting < ActiveRecord::Base
  belongs_to :playlist
  belongs_to :track

  validates :track, :playlist, presence: true
  validates_uniqueness_of :playlist_id, scope: :track_id

end
