json.extract! track, :id, :title, :description

json.badge_img asset_path(track.img.url(:badge))
json.feed_img asset_path(track.img.url(:feed))
json.track_show_img asset_path(track.img.url(:track_show))
json.track_url asset_path(track.track.url)
json.sound_type "Track"

json.author track.author.username
json.author_id track.author.id
json.commenters do
  json.array! track.comments do |comment|
    json.partial! "api/comments/comment", comment: comment
  end
end
