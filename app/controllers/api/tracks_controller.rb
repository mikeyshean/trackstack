module Api
  class TracksController < ApiController
    # before_action :require_author!

    def index
      @tracks = Track.includes(:likers, comments: :author).where(author_id: current_user.id).order("updated_at DESC")
      render :index
    end

    def create
      @track = current_user.tracks.new(track_params)

      if @track.save
        render json: @track
      else
        render json: @track.errors.full_messages, status: 422
      end
    end

    def show
      @track = Track.includes([:likers, comments: { author: [:tracks, :followers] } ]).where(id: params[:id]).first

      if @track
        render :show
      else
        render json: {}, status: 422
      end
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

    def likes
      @likers = Track.find(params[:id]).likers
      render :likes
    end

    def create_like
      liking = Liking.new({user_id: current_user.id,
        likable_id: params[:id],
        likable_type: "Track"
        })

      if liking.save
        render json: { id: current_user.id }
      else
        render json: liking.errors.full_messages, status: 422
      end
    end

    def destroy_like
      current_user.stop_liking(params[:id], "Track")

      render json: {}
    end


    private

    def track_params
      params.require(:track).permit(:title, :description, :track, :img)
    end

  end
end
