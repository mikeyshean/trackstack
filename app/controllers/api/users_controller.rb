module Api
  class UsersController < ApiController

    def index # Temporary Route/Action
      @users = User.all
    end

    def show
      @user = User.includes(:followers, :followees, :tracks).where(id: params[:id]).first
    end

    def followers
      @follows = User.find(params[:id]).followers
    end



    private

    def user_params
      params.require(:user).permit(:fname, :lname, :description)
    end

  end
end
