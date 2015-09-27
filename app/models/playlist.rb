class Playlist < ActiveRecord::Base
  has_many :playlistings, dependent: :destroy
  has_many :tracks, through: :playlistings
  has_many :feeds, as: :sound, dependent: :destroy
  has_many :likings, as: :likable, dependent: :destroy
  has_many :likers, through: :likings, source: :liker
  belongs_to :author, class_name: "User", foreign_key: :author_id

  validates :title, :author_id, presence: true

  after_save do |playlist|
    feed = Feed.where("sound_id = :id AND sound_type = :type", { id: playlist.id, type: playlist.class }).first
    if feed
      feed.update(updated_at: playlist.updated_at)
    else
      playlist.feeds.create({ author_id: playlist.author_id })
    end
  end

end
