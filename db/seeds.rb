# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create({
  username: "s0ngb055",
  password_digest: BCrypt::Password.create("password"),
  session_token: "abc",
  fname: "Mikey",
  lname: "Shean",
  img_url: Faker::Avatar.image,
  description: Faker::Lorem.paragraph
  })

# Users!

20.times do |i|
  username = Faker::Internet.user_name
  token = Faker::Internet.device_token

  User.create!({
    fname: Faker::Name.first_name,
    lname: Faker::Name.last_name,
    username: "#{username}#{i}",
    password_digest: "#{token}#{i}",
    session_token: "#{token}#{i}",
    img_url: Faker::Avatar.image,
    description: Faker::Lorem.paragraph
  })
end

#  Followers! Tracks! Playlists!

20.times do |i|
  id = i + 1

  20.times do
    Following.create({follower_id: id, followee_id: Random.new.rand(1..21)})

    User.find(id).tracks.create!({
      title: Faker::Book.title,
      description: Faker::Lorem.paragraph,
      img_url: Faker::Avatar.image,
      track_url: Faker::Internet.url
    })

    User.find(id).playlists.create!({
      title: Faker::Book.title,
      description: Faker::Lorem.paragraph
    })
  end
end

# Playlistings!

User.all.each do |user|
  user.playlists.each do |playlist|
    10.times do
      playlist.playlistings.create({track_id: Random.new.rand(1..201)})

    end
  end
end
