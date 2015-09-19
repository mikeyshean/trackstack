module Api
  class PlaylistsController < ApiController
    before_action :require_author!

    def index
      author = User.find(params[:id])
      @playlists = author.playlists

      render :index
    end

    def create
      @playlist = current_user.playlists.new(playlist_params)

      if @playlist.save
        render :show
      else
        render json: @playlist.errors.full_messages, status: 422
      end
    end

    def show
      @playlist = Track.find(params[:id])

      render :playlist
    end

    def update

      @playlist = current_user.playlists.find(params[:id])

      if @playlist.update(playlist_params)
        render :show
      else
        render json: @playlist.errors.full_messages, status: 422
      end
    end

    def destroy
      @playlist = current_user.playlists.find(params[:id])
      @playlist.destroy
    end

    private

    def playlist_params
      params.require(:playlist).permit(:title, :description, :author_id, :img)
    end

  end
end
