module api
  class UsersController < ApiController

    def show
      @user = current_user.includes(:followers)
    end
  end
end
