json.extract! @comment, :id, :text, :created_at
json.author do 
  author = @comment.author
  json.extract! author, :id, :username
  json.img_comment asset_path(author.img.url(:comment))
end
