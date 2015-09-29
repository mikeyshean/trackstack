json.partial! "api/users/user", user: current_user

json.followables do
  json.array! @followables do |followable|
    user = User.find(followable[0])
    json.id followable[0]
    json.follower_count followable[1]
    json.track_count user.tracks.count
    json.badge_img asset_path(user.img.url(:badge))
    json.username user.username
  end
end

json.like_count @likings.count

json.likes do
  json.array! @likings.first(3) do |liking|
    sound = liking.likable

    if sound.class == Track
      json.partial! "api/tracks/track", track: sound
    else
      json.partial! "api/playlists/playlist", playlist: sound
    end
  end
end
