module Api
  class FollowersController < ApiController

    def create
      following = Following.new({follower_id: current_user.id, followee_id: params[:followee_id]})

      if following.save
        render json: { id: current_user.id }
      else
        render json: following.errors.full_messages, status: 422
      end
    end

    def destroy
      current_user.stop_following(params[:id])

      render :follower
    end
  end
end
