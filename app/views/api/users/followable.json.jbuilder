  json.array! @followable do |followable|
    user = User.find(followable[0])
    json.id followable[0]
    json.follower_count followable[1]
    json.track_count user.tracks.count
    json.badge_img asset_path(user.img.url(:badge))
    json.username user.username
  end
