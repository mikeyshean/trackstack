
json.array! @feed.each do |feed|
  json.extract! feed, :id, :sound_type, :sound_id

  json.sound do
    sound = feed.sound

    if sound.class == Track
      json.partial! "api/tracks/track", track: sound
    else
      json.partial! "api/playlists/playlist", playlist: sound
    end
  end
end
