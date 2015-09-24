
# Renders for users/:id/followers and users/:id/following

json.array! @users, partial: "follower", as: :follower
