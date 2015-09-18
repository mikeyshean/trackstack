json.extract! track, :id, :title, :description

json.img_url asset_path(track.img.url(:badge))

json.sound_type "Track"
