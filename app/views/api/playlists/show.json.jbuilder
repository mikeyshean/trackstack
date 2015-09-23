json.extract! @playlist, :id, :title, :description
json.sound_type "Playlist"

json.tracks do
  json.array! @playlist.tracks do |track|
    json.partial! "api/tracks/track", track: track
  end
end
