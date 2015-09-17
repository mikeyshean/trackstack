module Api
  class FeedsController < ApplicationController

    def index
      @user = User.includes(:tracks, playlists: :tracks).where(id: params[:id]).first
    end
  end
end
