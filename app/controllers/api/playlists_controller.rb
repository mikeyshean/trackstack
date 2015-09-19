module Api
  class PlaylistsController < ApiController
    # before_action :require_author!

    def index
      author = User.find(params[:id])
      @playlists = author.playlists.order("updated_at DESC")

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

    def likes
      @likers = Playlist.find(params[:id]).likers
      render :likes
    end

    def create_like
      liking = Liking.new({user_id: current_user.id,
        likable_id: params[:id],
        likable_type: "Playlist"
        })

      if liking.save
        render json: { id: current_user.id }
      else
        render json: liking.errors.full_messages, status: 422
      end
    end

    def destroy_like
      current_user.stop_liking(params[:id], "Playlist")

      render json: {}
    end

    private

    def playlist_params
      params.require(:playlist).permit(:title, :description, :author_id, :img)
    end

  end
end
