json.array! @likers do |liker|
  json.extract! liker, :id
  json.sound_type "Playlist"
end
