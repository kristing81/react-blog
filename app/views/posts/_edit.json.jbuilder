json.show_path post_path(@post)
json.back_path posts_path
json.form_method "put"
json.form_path post_path(@post)
json.csrf_token form_authenticity_token
json.partial! 'posts/form.json', post: @post
