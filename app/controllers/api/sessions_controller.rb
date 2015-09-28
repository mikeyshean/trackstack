module Api
  class SessionsController < ApplicationController

     def show
      if current_user
         followee_ids = current_user.followees.pluck(:id)
         followee_ids.push(current_user.id)
        @followable = User.where.not(id: followee_ids)
          .joins(:in_follows)
          .group("users.id")
          .order("count_follower_id DESC")
          .count(:follower_id)
          .first(3)
        render :show
      else
        render json: {}
      end
    end

    def create
      @user = User.find_by_credentials(
        params[:user][:username],
        params[:user][:password]
      )

      if @user
        sign_in!(@user)
        render :show
      else
        head :unprocessable_entity
      end
    end

    def destroy
      sign_out!
      render json: {}
    end

    def omniauth
      user = User.find_or_create_by(auth_hash)
      sign_in!(user)
      redirect_to root_url
    end

    private

    def auth_hash
      request.env['omniauth.auth']
    end
  end
end
