json.extract! comment, :id, :text, :submitted_at

if author
  author = comment.author
  json.author author.username
  json.author_id author.username
  json.img_comment asset_path(author.img.url(:comment))
end
