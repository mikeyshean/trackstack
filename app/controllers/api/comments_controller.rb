module Api
  class CommentsController < ApplicationController

    def create
      @comment = current_user.comments.new(comment_params)
      if @comment.save
        render :show
      else
        render json: @comment.errors.full_messages, status: 422
      end
    end

    def destroy
      comment = Comment.find(params[:comment_id])
      comment.destroy

      render json: {}
    end


    private

    def comment_params
      params.require(:comment).permit(:track_id, :text, :submitted_at)
    end
  end
end
