json.new_post_path new_post_path()
json.posts(@posts) do |post|
  json.extract! post, :id, :title, :body
  json.show_path post_path(post)
  json.edit_path edit_post_path(post)
  json.destroy_path post_path(post)
end
