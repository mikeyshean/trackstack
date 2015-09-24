module Api
  class UsersController < ApiController

    def index # Temporary Route/Action
      @users = User.all
    end

    def show
      @user = User.includes(:followers, :followees, :tracks).where(id: params[:id]).first
    end

    def followers
      @users = User.find(params[:id]).followers.includes(:followers)
      render :followers
    end

    def following
      @users = User.find(params[:id]).followees.includes(:followers)
      render :followers
    end

    def update
      @user = current_user

      if @user.update(user_params)
        render :show
      else
        render json: @user.errors.full_messages, status: 422
      end
    end

    def author
      @author = User.includes(:followers, :tracks).where(id: params[:id]).first
      render :author
    end

    private

    def user_params
      params.require(:user).permit(:fname, :lname, :description, :img, :cover_img)
    end

  end
end
