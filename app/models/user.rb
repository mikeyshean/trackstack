class User < ActiveRecord::Base
  attr_reader :password

  has_many :out_follows, class_name: "Following", foreign_key: :follower_id
  has_many :in_follows, class_name: "Following", foreign_key: :followee_id
  has_many :followers, through: :in_follows, source: :follower
  has_many :followees, through: :out_follows, source: :followee
  has_many :playlists, foreign_key: :author_id
  has_many :tracks, foreign_key: :author_id
  has_attached_file :img, styles: { badge: "50x50", profile: "200x200", comment: "40x40", track_show: "120x120", comment_icon: "20x20"},
    :default_url => ":attachment/default.jpg"
  has_attached_file :cover_img, styles: { cover: "1240x260" },
    :default_url => ":attachment/default.jpg"

  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates_attachment :img, content_type: { content_type: ["image/jpeg", "image/gif", "image/png"] }

  after_initialize :ensure_session_token

# User Authentication Start

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user

    user.is_password?(password) ? user : nil
  end

  def self.find_or_create_by(omniauth_hash)
    uid = omniauth_hash[:uid]
    provider = omniauth_hash[:provider]

    user = User.find_by(
      uid: uid,
      provider: provider
    )

    if user
      return user
    else
      User.create!(
        username: "User#{User.last.id + 1}",
        password: SecureRandom::urlsafe_base64,
        uid: uid,
        provider: provider
      )
    end

  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end


# User Authentication End

  def following?(other_user)
    other_user.followers.include?(self)
  end

  def start_following(followee_id)
    Following.create({follower_id: self.id, followee_id: followee_id})
  end

  def stop_following(followee_id)
    following = Following.where("follower_id = :current_user_id AND followee_id = :followee_id",
      { :current_user_id => self.id, :followee_id => followee_id })

    following.first.destroy
  end

end
