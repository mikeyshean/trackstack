
json.partial! "user", user: @user, img_badge: false


json.followees do
  json.array! @user.followees do |followee|
    json.partial! "user", user: followee, img_badge: true
  end
end


json.followers do
  json.array! @user.followers do |follower|
    json.partial! "user", user: follower, img_badge: false
  end
end


json.img_profile asset_path(@user.img.url(:profile))
json.img_cover asset_path(@user.cover_img.url(:cover))
json.img_comment asset_path(@user.img.url(:comment))
