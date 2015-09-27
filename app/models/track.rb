class Track < ActiveRecord::Base
  has_many :playlistings
  has_many :playlists, through: :playlistings
  belongs_to :author, class_name: "User", foreign_key: :author_id
  has_many :feeds, as: :sound, dependent: :destroy
  has_many :likings, as: :likable, dependent: :destroy
  has_many :likers, through: :likings, source: :liker
  has_many :comments, dependent: :destroy

  has_attached_file :track
  has_attached_file :img, styles: { badge: "50x50", track_show: "340x340", feed: "120x120" },
    :convert_options => { badge: "-quality 75 -strip" },
    :default_url => ":attachment/track_default.jpg"

  validates :title, :author_id, presence: true
  validates_attachment_content_type :img, content_type: /\Aimage\/.*\Z/
  validates_attachment_content_type :track, content_type: /\Aaudio\/.*\Z/
  before_img_post_process :rename_img_file
  before_track_post_process :rename_track_file

  after_save do |track|
    feed = Feed.where("sound_id = :id AND sound_type = :type", { id: track.id, type: track.class }).first
    if feed
      feed.update(updated_at: track.updated_at)
    else
      track.feeds.create({ author_id: track.author_id })
    end
  end

  private

  def rename_img_file
    extension = File.extname(img_file_name).gsub(/^\.+/, '')
    filename = SecureRandom::urlsafe_base64
    self.img.instance_write(:file_name, "#{filename}.#{extension}")
  end

  def rename_track_file
    extension = File.extname(track_file_name).gsub(/^\.+/, '')
    filename = SecureRandom::urlsafe_base64
    self.track.instance_write(:file_name, "#{filename}.#{extension}")
  end
end
