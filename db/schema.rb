# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150917175605) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "feeds", force: :cascade do |t|
    t.integer  "sound_id"
    t.string   "sound_type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "author_id"
  end

  add_index "feeds", ["author_id", "sound_id", "sound_type"], name: "index_feeds_on_author_id_and_sound_id_and_sound_type", unique: true, using: :btree

  create_table "followings", force: :cascade do |t|
    t.integer  "follower_id", null: false
    t.integer  "followee_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "followings", ["followee_id"], name: "index_followings_on_followee_id", using: :btree
  add_index "followings", ["follower_id"], name: "index_followings_on_follower_id", using: :btree

  create_table "playlistings", force: :cascade do |t|
    t.integer  "track_id",    null: false
    t.integer  "playlist_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "playlistings", ["playlist_id"], name: "index_playlistings_on_playlist_id", using: :btree
  add_index "playlistings", ["track_id"], name: "index_playlistings_on_track_id", using: :btree

  create_table "playlists", force: :cascade do |t|
    t.string   "title",       null: false
    t.string   "description"
    t.integer  "author_id",   null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "playlists", ["author_id"], name: "index_playlists_on_author_id", using: :btree

  create_table "tracks", force: :cascade do |t|
    t.string   "title",              null: false
    t.string   "description"
    t.integer  "author_id",          null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "track_file_name"
    t.string   "track_content_type"
    t.integer  "track_file_size"
    t.datetime "track_updated_at"
    t.string   "img_file_name"
    t.string   "img_content_type"
    t.integer  "img_file_size"
    t.datetime "img_updated_at"
  end

  add_index "tracks", ["author_id"], name: "index_tracks_on_author_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",         null: false
    t.string   "fname"
    t.string   "lname"
    t.text     "description"
    t.string   "password_digest",  null: false
    t.string   "session_token",    null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "img_file_name"
    t.string   "img_content_type"
    t.integer  "img_file_size"
    t.datetime "img_updated_at"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
