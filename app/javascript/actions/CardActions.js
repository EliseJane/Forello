import apiClient from '../lib/ApiClient';
import * as types from '../constants/ActionTypes';

export function fetchCardRequest() {
  return { type: types.FETCH_CARD_REQUEST };
}

export function fetchCardSuccess(card) {
  return { type: types.FETCH_CARD_SUCCESS, card };
}

export function createCardRequest() {
  return { type: types.CREATE_CARD_REQUEST };
}

export function createCardSuccess(card) {
  return { type: types.CREATE_CARD_SUCCESS, card: card };
}

export function updateCardRequest() {
  return { type: types.UPDATE_CARD_REQUEST };
}

export function updateCardSuccess(card) {
  return { type: types.UPDATE_CARD_SUCCESS, card: card };
}

export function fetchCard(id) {
  return function(dispatch) {
    dispatch(fetchCardRequest());
    apiClient.getCard(id, card => dispatch(fetchCardSuccess(card)));
  };
}

export function createCard(card, callback) {
  return function(dispatch) {
    dispatch(createCardRequest());
    apiClient.createCard(card, newCard => {
      dispatch(createCardSuccess(newCard));

      if (callback) { callback(); }
    })
  }
}

export function updateCard(card, callback) {
  return function(dispatch) {
    dispatch(updateCardRequest());
    apiClient.updateCard(card, newCard => {
      dispatch(updateCardSuccess(newCard))

      if (callback) { callback(newCard); }
    })
  }
}
