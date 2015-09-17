module Api
  class FeedsController < ApplicationController

    def index
      @feed = Feed.where(author_id: params[:id])
    end
  end
end
