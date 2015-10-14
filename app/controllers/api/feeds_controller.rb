module Api
  class FeedsController < ApplicationController

    LIMIT = 2

    def profile_feed
      @feed = Feed.includes(:sound => :author)
        .where(author_id: params[:id])
        .where("feeds.updated_at < :oldest_entry", oldest_entry: oldest_entry)
        .order("updated_at DESC")
        .limit(LIMIT)

      if !@feed.empty?
        render :feed
      else
        render json: {}
      end
    end

    def main_feed
      followee_ids = current_user.followees.pluck(:id)

      @feed = Feed.includes(:sound => :author)
        .where(author_id: followee_ids)
        .where("feeds.updated_at < :oldest_entry", oldest_entry: oldest_entry)
        .order("updated_at DESC")
        .limit(LIMIT)

      # For new users
      if @feed.length < LIMIT
        @feed = Feed.includes(:sound => :author)
          .order("updated_at DESC")
          .where("feeds.updated_at < :oldest_entry", oldest_entry: oldest_entry)
          .limit(LIMIT)
      end

      if !@feed.empty?
        render :feed
      else
        render json: {}
      end
    end

    private

    def oldest_entry
      if params[:oldest_entry] == "undefined"
        return Time.now
      else
        return params[:oldest_entry]
      end
    end
  end
end
