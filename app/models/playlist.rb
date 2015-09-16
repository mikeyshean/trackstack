class Playlist < ActiveRecord::Base
  has_many :playlistings
  has_many :tracks, through: :playlistings
  belongs_to :author, class_name: "User"

  validates :title, :author_id, presence: true

end
