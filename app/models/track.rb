class Track < ActiveRecord::Base
  has_many :playlistings
  has_many :playlists, through: :playlistings
  has_many :feeds, as: :sound, dependent: :destroy
  has_many :likings, as: :likable, dependent: :destroy
  has_many :likers, through: :likings, source: :liker
  has_many :comments, dependent: :destroy
  belongs_to :author, class_name: "User", foreign_key: :author_id

  has_attached_file :track,
    :path => "tracks/:class/:id_:timestamp.:style.:extension",
    :s3_host_alias => Proc.new {|attachment| "tracks#{attachment.instance.id % 4}.trackstack.audio" }
  has_attached_file :peaks,
    :path => "peaks/:class/:id_:timestamp.:style.:extension",
    :default_url => "",
    :s3_host_alias => Proc.new {|attachment| "peaks#{attachment.instance.id % 4}.trackstack.audio" }
  has_attached_file :img, styles: { badge: "50x50", track_show: "340x340", feed: "120x120" },
    :convert_options => { badge: "-quality 75 -strip" },
    :default_url => ":attachment/track_default.jpg",
    :path => "imgs/:class/:id_:timestamp.:style.:extension",
    :s3_host_alias => Proc.new {|attachment| "cdn#{attachment.instance.id % 4}.trackstack.audio" }

  validates :author_id, presence: true
  validates_attachment_content_type :img, content_type: /\Aimage\/.*\Z/
  validates_attachment_content_type :track, content_type: /\Aaudio\/.*\Z/
  validates_attachment_content_type :peaks, content_type: "text/plain"

  after_save do |track|
    feed = Feed.where(
      "sound_id = :id AND sound_type = :type",
      { id: track.id, type: track.class }
    ).first
    if feed
      feed.update(updated_at: track.updated_at)
    else
      track.feeds.create({ author_id: track.author_id })
    end
  end

  def self.reset_peaks
    self.all.each { |track| track.peaks.destroy; track.peaks.clear; track.save }
  end

  def self.peak_size
    self.all.each { |track| puts track.peaks_file_size }
  end

  def decoded_peaks
    if self.peaks.url == ""
      ""
    else
      URI.parse(self.peaks.url).read
    end
  end
end
