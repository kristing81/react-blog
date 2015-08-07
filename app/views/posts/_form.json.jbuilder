json.extract! post, :id, :title, :body, :created_at, :updated_at
json.errors post.errors.full_messages
