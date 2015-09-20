class Track < ActiveRecord::Base
  has_many :playlistings
  has_many :playlists, through: :playlistings
  belongs_to :author, class_name: "User", foreign_key: :author_id
  has_many :feeds, as: :sound, dependent: :destroy
  has_many :likings, as: :likable, dependent: :destroy
  has_many :likers, through: :likings, source: :liker
  has_attached_file :img, styles: { badge: "50x50", track_show: "340x340", feed: "120x120" }
  has_attached_file :track


  validates :author_id, presence: true
  validates_attachment :img, content_type: { content_type: ["image/jpeg", "image/gif", "image/png"] }
  validates_attachment :track, content_type: { content_type: [ 'application/mp3', 'application/x-mp3', 'audio/mpeg', 'audio/mp3', 'audio/mp4' ] }

  after_save do |track|
    feed = Feed.where("sound_id = :id AND sound_type = :type", { id: track.id, type: track.class }).first
    if feed
      feed.update(updated_at: track.updated_at)
    else
      track.feeds.create({ author_id: track.author_id })
    end
  end

end
