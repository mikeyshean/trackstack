json.extract! user, :id, :username, :fname, :lname, :description

json.followed current_user.following?(user)

if img_badge
  json.img_badge asset_path(user.img.url(:badge))
end
