class Comment < ActiveRecord::Base
  validates :text, :track_id, :author_id, :submitted_at, presence: true
  belongs_to :author, class_name: "User", foreign_key: :author_id
  belongs_to :track
end
