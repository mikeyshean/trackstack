
json.partial! "user", user: @user, img_badge: false


json.followees do
  json.array! @user.followees do |followee|
    json.partial! "follower", follower: followee
  end
end


json.followers do
  json.array! @user.followers do |follower|
    json.partial! "follower", follower: follower
  end
end


json.img_profile asset_path(@user.img.url(:profile))
json.img_cover asset_path(@user.cover_img.url(:cover))
json.img_comment asset_path(@user.img.url(:comment))
