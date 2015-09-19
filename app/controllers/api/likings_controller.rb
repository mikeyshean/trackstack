module Api
  class LikingsController < ApiController

    def create
      liking = Liking.new({user_id: current_user.id,
        likable_id: params[:id],
        likeable_type: params[:type]
        })

      if liking.save
        render :liker
      else
        render json: liking.errors.full_messages, status: 422
      end
    end

    def destroy
      current_user.stop_liking(params[:id], params[:type])

      render :follower
    end
  end
end
