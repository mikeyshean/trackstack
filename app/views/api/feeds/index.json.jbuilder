json.tracks do
  json.array! @feed.sound do |sound|
    if sound.class == Track
      debugger
      json.partial! "api/tracks/track", track: sound
    else
      json.partial! "api/playlists/playlist", playlist: sound
    end
  end
end

json.playlists do
  json.array! @feed.playlists do |playlist|
    json.partial! "api/playlists/playlist", playlist: playlist
  end
end
