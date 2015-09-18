module Api
  class FeedsController < ApplicationController

    def index
      @feed = Feed.where(author_id: params[:id]).order("updated_at")
    end
  end
end
