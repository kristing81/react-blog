json.back_path posts_path
json.form_method "post"
json.form_path posts_path
json.partial! 'posts/form.json', post: @post
