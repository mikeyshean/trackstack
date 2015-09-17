module Api
  class TracksController < ApiController
    before_action :require_author!

    def index
      author = User.find(params[:id])
      @tracks = author.tracks

      render :index
    end

    def show
      @track = Track.find(params[:id])

      render :track
    end

    def update

      @track = current_user.tracks.find(params[:id])

      if @track.update(track_params)
        render :show
      else
        render json: @track.errors.full_messages, status: 422
      end
    end

    def destroy
      @track = current_user.tracks.find(params[:id])
      @track.destroy
    end

    private

    def track_params
      params.require(:track).permit(:title, :description)
    end

  end
end