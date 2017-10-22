class Api::ListsController < ApplicationController
  def create
    @list = List.new(list_params)

    if @list.save
      render :create, status: :created
    else
      @error = @list.errors.full_messages.join(', ')
      render 'api/shared/error', status: :unprocessable_entity
    end
  rescue ActionController::ParameterMissing
    @error = "Invalid list data provided"
    render 'api/shared/error', status: :unprocessable_entity
  end

  def update
    @list = List.find(params[:id])
    @list.title = list_params[:title]

    if @list.save
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
