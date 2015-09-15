module Api
  class UsersController < ApiController

    def index # Temporary Route/Action
      @users = User.all
    end

    def show
      @user = User.includes(:followers).where(id: params[:id]).first
    end

    def followers
      @follows = current_user.followers
    end

  end
end
