json.extract! playlist, :id, :title, :description
json.sound_type "Playlist"

json.tracks do
  json.array! playlist.tracks do |track|
    json.partial! "api/tracks/track", track: track
  end
end

json.author_id playlist.author.id
json.author playlist.author.username

json.likes do
  json.array! playlist.likers do |like|
    json.extract! like, :id
  end
end
