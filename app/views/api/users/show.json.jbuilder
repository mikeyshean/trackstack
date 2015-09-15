
json.partial! "user", user: @user

json.followers do
  json.array! @user.followers do |follower|
    json.partial! "user", user: follower
  end
end
