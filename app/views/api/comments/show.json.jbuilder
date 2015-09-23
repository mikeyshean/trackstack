json.extract! @comment, :id, :text, :created_at

  author = @comment.author
json.author author.username
json.author_id author.id
json.img_comment asset_path(author.img.url(:comment))
