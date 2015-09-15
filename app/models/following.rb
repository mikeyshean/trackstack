class Following < ActiveRecord::Base
  validates :followee, :follower, presence: true
  validates_uniqueness_of :followee, scope: :follower

  belongs_to :followee, class_name: "User"
  belongs_to :follower, class_name: "User"


end
