
json.partial! "user", user: @user, img_badge: false

json.img_profile asset_path(@user.img.url(:profile))
json.img_cover asset_path(@user.cover_img.url(:cover))
json.img_comment asset_path(@user.img.url(:comment))

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


json.likes do
  json.array! @user.likings do |like|

    json.extract! like, :id, :updated_at
    json.sound_id  like.likable_id
    json.sound_type like.likable_type
    json.sound do
      sound = like.likable

      if sound.class == Track
        json.partial! "api/tracks/track", track: sound
      else
        json.partial! "api/playlists/playlist", playlist: sound
      end
    end
  end
end
