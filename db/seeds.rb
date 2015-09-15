# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

  User.create({username: "mikey", password_digest: BCrypt::Password.create("password"), session_token: "abc"})

  20.times do |i|
    username = Faker::Internet.user_name
    token = Faker::Internet.device_token

    User.create!({
      fname: Faker::Name.first_name,
      lname: Faker::Name.last_name,
      username: "#{username}#{i}",
      password_digest: "#{token}#{i}",
      session_token: "#{token}#{i}"
    })
  end

  20.times do |i|
    id = i + 1

    20.times do
      Following.create({follower_id: id, followee_id: Random.new.rand(1..21)})
    end
  end
