class Following < ActiveRecord::Base
  validates :followee, :follower, presence: true
  validates_uniqueness_of :followee, scope: :follower
  validate :lonely_user

  belongs_to :followee, class_name: "User"
  belongs_to :follower, class_name: "User"

  private

  def lonely_user
    if (self.follower_id == self.followee_id)
      errors.add(:following, "You can't follow yourself!")
    end
  end
end
