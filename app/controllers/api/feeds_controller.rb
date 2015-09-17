module Api
  class FeedsController < ApplicationController

    def index
      @feed = Feed.select('feeds.id, feeds.sound_type, COALESCE(p.title, t.title) title').joins("LEFT OUTER JOIN tracks t ON t.id = feeds.sound_id AND feeds.sound_type = 'Track'").joins("LEFT OUTER JOIN playlists p ON p.id = feeds.sound_id AND feeds.sound_type = 'Playlist'").where("t.author_id = :id OR p.author_id = :id", id: params[:id])
        debugger
    end
  end
end
