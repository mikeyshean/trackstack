json.tracks do
  json.array! @user.tracks do |track|
    json.partial! "api/tracks/track", track: track
  end
end

json.playlists do
  json.array! @user.playlists do |playlist|
    json.partial! "api/playlists/playlist", playlist: playlist
  end
end
