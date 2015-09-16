
json.array! @users do |user|
  json.partial! "user", user: user, img_badge: false
end
