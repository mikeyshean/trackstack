json.extract! user, :id, :username, :fname, :lname, :description

json.current_user user == current_user
json.followed current_user.following?(user)

if img_badge
  json.img_badge asset_path(user.img.url(:badge))
end
