json.extract! @post, :title, :body, :created_at
json.edit_path edit_post_path(@post)
json.back_path posts_path
