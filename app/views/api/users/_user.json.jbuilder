json.extract! user, :id, :username, :fname, :lname, :description

json.current_user user == current_user
json.followed current_user.following?(user)

if img_badge
  json.img_badge asset_path(user.img.url(:badge))
end

if user == current_user
  json.img_cover asset_path(user.cover_img.url(:cover))
  json.img_profile asset_path(user.img.url(:profile))
end
