# Called from user show

json.extract! follower, :id, :username

json.follower_count follower.followers.count
json.img_profile asset_path(follower.img.url(:profile))
json.img_badge asset_path(follower.img.url(:badge))
