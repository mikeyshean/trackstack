class Feed < ActiveRecord::Base
  validates :sound_id, :sound_type, :author_id, presence: true
  validates_uniqueness_of :sound_id, scope: :sound_type
  belongs_to :sound, polymorphic: true, inverse_of: :feeds
  belongs_to :author, class_name: "User", foreign_key: :author_id
end
