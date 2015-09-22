class Liking < ActiveRecord::Base
  validates :user_id, :likable_id, :likable_type, presence: true
  validates_uniqueness_of :user_id, scope: [:likable_id, :likable_type]
  belongs_to :likable, polymorphic: true, inverse_of: :likings
  belongs_to :liker, class_name: "User", foreign_key: :user_id
end
