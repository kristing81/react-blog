require 'faker'

10.times do
  Post.create(
    title: Faker::Lorem.sentence, 
    body: Faker::Lorem.paragraph
  )
end
