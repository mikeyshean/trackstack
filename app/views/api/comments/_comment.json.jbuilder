json.extract! comment, :id, :text, :submitted_at, :created_at

if author
  author = comment.author
  json.author author.username
  json.author_id author.id
  json.img_comment asset_path(author.img.url(:comment))
end
