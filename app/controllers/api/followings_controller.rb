module Api
  class FollowersController < ApiController

    def create
      if current_user.start_following(params[:id])
        render :follower
      else
        render json: current_user.errors.full_messages, status: 422
      end
    end

    def destroy
      current_user.stop_following(params[:id])

      render :follower
    end
  end
end
