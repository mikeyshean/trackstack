class Track < ActiveRecord::Base
  has_many :playlistings
  has_many :playlists, through: :playlistings
  belongs_to :author, class_name: "User"

  validates :title, :track_url, :author_id, presence: true

end
