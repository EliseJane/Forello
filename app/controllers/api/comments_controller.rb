class Api::CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    Card.find(comment_params[:card_id])

    if @comment.save
      render :create, status: :created
    else
      @error = @comment.errors.full_messages.join(', ')
      render 'api/shared/error', status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    @error = "Could not find card with id of #{comment_params[:card_id]}"
    render 'api/shared/error', status: 404
  rescue ActionController::ParameterMissing
    @error = "Invalid comment data provided"
    render 'api/shared/error', status: :unprocessable_entity
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :card_id, :author)
  end
end
