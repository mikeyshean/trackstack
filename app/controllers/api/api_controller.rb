module Api
  class ApiController < ApplicationController

    def require_author!
      unless current_user
        render json: ["You can't edit that!"], status: :unauthorized
      end
    end

    def require_signed_in!
      unless signed_in?
        render json: ["You must be signed in to perform that action!"], status: :unauthorized
      end
    end
  end
end
