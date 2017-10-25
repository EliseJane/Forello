class Api::CardsController < ApplicationController
  def show
    @card = Card.find(params[:id])

  rescue ActiveRecord::RecordNotFound
    @error = "Could not find card with id of #{params[:id]}"
    render 'api/shared/error', status: 404
  end

  def create
    @card = Card.new(card_params)
    List.find(card_params[:list_id])

    if @card.save
      render :create, status: :created
    else
      @error = @card.errors.full_messages.join(', ')
      render 'api/shared/error', status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    @error = "Could not find list with id of #{card_params[:list_id]}"
    render 'api/shared/error', status: 404
  rescue ActionController::ParameterMissing
    @error = "Invalid card data provided"
    render 'api/shared/error', status: :unprocessable_entity
  end

  def update
    @card = Card.find(params[:id])

    if @card.update(card_params)
      render :update, status: :ok
    else
      @error = @card.errors.full_messages.join(', ')
      render 'api/shared/error', status: :unprocessable_entity
    end
    rescue ActiveRecord::RecordNotFound
      @error = "Could not find card with id of #{params[:id]}"
      render 'api/shared/error', status: 404
    rescue ActionController::ParameterMissing
      @error = "Invalid card data provided"
      render 'api/shared/error', status: :unprocessable_entity
  end

  private

  def card_params
    params.require(:card).permit(:title, :list_id, :position)
  end
end
