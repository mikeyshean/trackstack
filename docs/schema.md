# Schema Information

## users
column name        | data type | details
-------------------|-----------|-----------------------
id                 | integer   | not null, primary key
username           | string    | not null, index
fname              | string    |
lname              | string    |
description        | text      |
password_digest    | string    | not null
session_token      | string    | not null, unique, index
img_url            | string    |

## followings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
followee_id | integer   | not null, foreign key (references users), index
follower_id | integer   | not null, foreign key (references users), index

## tracks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
description | string    |
img_url     | string    |
track_url   | string    | not null
user_id     | integer   | not null foreign key (references users), index

## playlistings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
track_id    | integer   | not null, foreign key (references tracks), index
playlist_id | integer   | not null, foreign key (references playlists), index

## playlists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
description | string    |

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
text        | text      | not null
track_id    | integer   | not null, foreign key (references tracks), index
submitted_at| date/time |

## taggings (polymorphic)
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
tag_id       | integer   | not null, foreign key (references tags)
taggable_id  | integer   | not null, foreign key (references tracks/playlists)
taggable_type| string    | not null

## tags
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
label         | string   | not null, unique

## likes (polymorphic)
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
user_id      | string    | not null, foreign key (references users)
likable_id   | string    | not null, foreign key (references tracks/playlists)
likable_type | string    | not null
