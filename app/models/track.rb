class Track < ActiveRecord::Base
  has_many :playlistings
  has_many :playlists, through: :playlistings
  belongs_to :author, class_name: "User", foreign_key: :author_id
  has_many :feeds, as: :sound, dependent: :destroy
  has_many :likings, as: :likable, dependent: :destroy
  has_many :likers, through: :likings, source: :liker
  has_many :comments
  has_attached_file :track
  has_attached_file :img, styles: { badge: "50x50", track_show: "340x340", feed: "120x120" },
    :convert_options => { badge: "-quality 75 -strip" },
    :default_url => ":attachment/track_default.jpg"

  validates :author_id, presence: true
  validates_attachment_content_type :img, content_type: /\Aimage\/.*\Z/
  validates_attachment_content_type :track, content_type: /\Aaudio\/.*\Z/

  after_save do |track|
    feed = Feed.where("sound_id = :id AND sound_type = :type", { id: track.id, type: track.class }).first
    if feed
      feed.update(updated_at: track.updated_at)
    else
      track.feeds.create({ author_id: track.author_id })
    end
  end

end
