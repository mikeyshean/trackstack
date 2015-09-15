module Api
  class UsersController < ApiController

    def index # Temporary Route/Action
      @users = User.all
    end

    def show
      @user = User.includes(:followers).where(id: params[:id]).first
    end

    def followers
      @follows = User.find(params[:id]).followers
    end

    def start_following
      if current_user.start_following(params[:id])
        render :follower
      else
        render json: current_user.errors.full_messages, status: 422
      end
    end

    def stop_following
      current_user.stop_following(params[:id])

      render :follower
    end

  end
end
