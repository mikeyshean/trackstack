class Track < ActiveRecord::Base
  has_many :playlistings
  has_many :playlists, through: :playlistings
  belongs_to :author, class_name: "User", foreign_key: :author_id
  has_attached_file :img, styles: { badge: "50x50", track_show: "340x340", feed: "120x120" }
  has_attached_file :track

  validates :title, :author_id, presence: true
  validates_attachment :img, content_type: { content_type: ["image/jpeg", "image/gif", "image/png"] }
  validates_attachment :track, content_type: { content_type: [ 'application/mp3', 'application/x-mp3', 'audio/mpeg', 'audio/mp3', 'audio/mp4' ] }

end
