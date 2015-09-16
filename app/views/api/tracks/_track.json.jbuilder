json.extract! track, :title, :description

json.img_url asset_path(track.img.url(:badge))
