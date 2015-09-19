module Api
  class PlaylistingsController < ApiController

    def index
      playlist = current_user.playlists.find(params[:id])
      @tracks = playlist.tracks

      render :index
    end

    def create
      playlist = current_user.playlists.find(params[:id])
      playlisting =
        playlist.playlistings.new({track_id: params[:track_id]})
      @track = playlisting.track

      if playlisting.save
        render :show
      else
        render json: playlisting.errors.full_messages, status: 422
      end
    end

    def destroy
      playlist = current_user.playlists.find(params[:id])
      playlisting = playlist.playlistings.where(track_id: params[:track_id]).first
      playlisting.destroy!

      render json: {}
    end
  end
end
