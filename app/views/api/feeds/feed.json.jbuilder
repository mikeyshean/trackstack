
json.array! @feed.each do |feed|

  sound = feed.sound

  if sound.class == Track
    json.partial! "api/tracks/track", track: sound
  else
    json.partial! "api/playlists/playlist", playlist: sound
  end

end
