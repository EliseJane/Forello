class Api::ListsController < ApplicationController
  def create
    @list = List.new(list_params)
    Board.find(list_params[:board_id])

    if @list.save
      render :create, status: :created
    else
      @error = @list.errors.full_messages.join(', ')
      render 'api/shared/error', status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    @error = "Could not find board with id of #{list_params[:board_id]}"
    render 'api/shared/error', status: 404
  rescue ActionController::ParameterMissing
    @error = "Invalid list data provided"
    render 'api/shared/error', status: :unprocessable_entity
  end

  def update
    @list = List.find(params[:id])

    if @list.update(list_params)
      render :update, status: :ok
    else
      @error = @list.errors.full_messages.join(', ')
      render 'api/shared/error', status: :unprocessable_entity
    end
    rescue ActiveRecord::RecordNotFound
      @error = "Could not find list with id of #{params[:id]}"
      render 'api/shared/error', status: 404
    rescue ActionController::ParameterMissing
      @error = "Invalid list data provided"
      render 'api/shared/error', status: :unprocessable_entity
  end

  private

  def list_params
    params.require(:list).permit(:title, :board_id, :position)
  end
end
