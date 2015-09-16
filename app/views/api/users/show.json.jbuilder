
json.partial! "user", user: @user

json.followees do
  json.array! @user.followees do |followee|
    json.partial! "user", user: followee
  end
end


json.followers do
  json.array! @user.followers do |follower|
    json.partial! "user", user: follower
  end
end

json.tracks do
  json.array! @user.tracks do |track|
    json.partial! "api/tracks/track", track: track
  end
end
