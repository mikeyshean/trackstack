class Feed < ActiveRecord::Base
  validates :sound_id, :sound_type, presence: true
  validates_uniqueness_of :sound_id, scope: :sound_type
  belongs_to :sound, polymorphic: true
end
