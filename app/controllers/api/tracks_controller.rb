module Api
  class TracksController < ApiController
    before_action :require_author!

    def index
      author = User.find(params[:id])
      @tracks = user.tracks

      render json: @tracks
    end

    def show
      author = User.find(params[:id])
      @track = user.tracks.find(params[:track_id])

      render json: @track
    end

    def update

      @track = current_user.tracks.find(params[:track_id])

      if @track.update(track_params)
        render :show
      else
        render json: @track.errors.full_messages, status: 422
      end
    end

    def destroy
      @track = current_user.tracks.find(params[:track_id])

    end

    private

    def track_params
      params.require(:track).permit(:title, :description, :img_url)
    end

  end
end
