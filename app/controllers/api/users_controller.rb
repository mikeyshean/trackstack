module Api
  class UsersController < ApiController

    def index # Temporary Route/Action
      @users = User.all
    end

    def show
      @user = User.includes(:followers, :followees, :tracks, likings: :likable).where(id: params[:id]).first
    end

    def followers
      @users = User.find(params[:id]).followers.includes(:followers)
      render :followers
    end

    def following
      @users = User.find(params[:id]).followees.includes(:followers)
      render :followers
    end

    def followables
      if current_user
        followee_ids = current_user.followees.pluck(:id)
        followee_ids.push(current_user.id)
        @followable = User.where.not(id: followee_ids)
          .joins(:in_follows)
          .group("users.id")
          .order("count_follower_id DESC")
          .count(:follower_id)
          .first(3)
      end

      if @followable
        render :followable
      else
        render json: {}, status: 422
      end
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
