json.extract! user, :id, :username, :fname, :lname, :description

json.followed current_user.following?(user)

if img_badge
  json.img_badge asset_path(user.img.url(:badge))
end

if user == current_user
  json.img_cover asset_path(user.cover_img.url(:cover))
  json.img_profile asset_path(user.img.url(:profile))
  json.img_comment asset_path(user.img.url(:comment))
  json.img_comment_icon asset_path(user.img.url(:comment_icon))
end
