json.array! @likers do |liker|
  json.extract! liker, :id
end
