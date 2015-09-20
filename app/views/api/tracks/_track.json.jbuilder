json.extract! track, :id, :title, :description

json.badge_img asset_path(track.img.url(:badge))
json.feed_img asset_path(track.img.url(:feed))
json.track_show_img asset_path(track.img.url(:track_show))

json.sound_type "Track"

json.author track.author.username
