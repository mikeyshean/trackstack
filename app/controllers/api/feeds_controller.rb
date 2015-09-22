module Api
  class FeedsController < ApplicationController

    LIMIT = 7

    def profile_feed
      @feed = Feed.includes(:sound => :author).where(author_id: params[:id]).order("updated_at DESC").limit(LIMIT)

      render :feed
    end

    def main_feed
      followee_ids = current_user.followees.pluck(:id)
      @feed = Feed.includes(:sound => :author).where(author_id: followee_ids).order("updated_at DESC").limit(LIMIT)

      if @feed.empty?
        @feed = Feed.includes(:sound => :author).order("updated_at DESC").limit(LIMIT)
      end

      render :feed
    end
  end
end
