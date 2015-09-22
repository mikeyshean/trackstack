
json.array! @feed.each do |feed|
  json.id feed.sound_id
  json.feed_id feed.id
  json.extract! feed, :sound_type, :updated_at

    sound = feed.sound

    if sound.class == Track
      json.partial! "api/tracks/track", track: sound
    else
      json.partial! "api/playlists/playlist", playlist: sound
    end
end
