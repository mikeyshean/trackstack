json.partial! "api/users/user", user: current_user

json.followable do
  json.array! @followable do |followable|
    json.id followable[0]
    json.follower_count followable[1]
    json.track_count User.find(followable[0]).tracks.count
  end
end
