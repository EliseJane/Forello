import React from 'react';

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

import apiClient from '../lib/ApiClient.js';
jest.mock('../lib/ApiClient');

import * as actions from './CardActions';
import * as types from '../constants/ActionTypes';
import * as statuses from '../constants/Statuses';

describe("Card actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    apiClient.getBoards.mockClear();
    apiClient.createCard.mockClear();
    store.clearActions()
  });

  describe("fetchCardRequest", () => {
    it("returns the correct object", () => {
      expect(
        actions.fetchCardRequest()
      ).toEqual({ type: types.FETCH_CARD_REQUEST });
    });
  });

  describe("fetchCardSuccess", () => {
    it("returns the correct object", () => {
      const card = { id: 1, title: "my card", list_id: 1, position: 1.0 };

      expect(
        actions.fetchCardSuccess(card)
      ).toEqual({ type: types.FETCH_CARD_SUCCESS, card });
    });
  });

  describe("createCardRequest", () => {
    it("returns the correct object", () => {
      expect(
        actions.createCardRequest()
      ).toEqual({ type: types.CREATE_CARD_REQUEST });
    });
  });

  describe("createCardSuccess", () => {
    it("returns the correct object", () => {
      const card = { id: 1, title: "my card", list_id: 1, position: 1.0 };

      expect(
        actions.createCardSuccess(card)
      ).toEqual({ type: types.CREATE_CARD_SUCCESS, card });
    });
  });

  describe("updateCardRequest", () => {
    it("returns the correct object", () => {
      expect(
        actions.updateCardRequest()
      ).toEqual({ type: types.UPDATE_CARD_REQUEST });
    });
  });

  describe("updateCardSuccess", () => {
    it("returns the correct object", () => {
      const card = { id: 1, title: "my card", list_id: 1, position: 1.0 };

      expect(
        actions.updateCardSuccess(card)
      ).toEqual({ type: types.UPDATE_CARD_SUCCESS, card });
    });
  });

  describe("action creators", () => {
    let storeActions;

    describe("createCard", () => {
      const newCard = {
        title: "Awesome card",
        list_id: 1,
        position: 1.0
      };

      const newCardResponse = {
        id: 1,
	      title: "Awesome card",
	      due_date: null,
	      description: null,
	      list_id: 1,
	      position: 1.0,
        archived: false,
        completed: false
      };

      const cb = jest.fn();

      beforeEach(() => {
        store.dispatch(actions.createCard(newCard, cb));

        const invocation = apiClient.createCard.mock.calls[0];
        const callback = invocation[1];

        callback(newCardResponse);
        storeActions = store.getActions();
      });

      it("dispatches createCardRequest()", () => {
        expect(storeActions[0]).toEqual(actions.createCardRequest());
      });

      it("dispatches createCardSuccess()", () => {
        expect(storeActions[1]).toEqual(
          actions.createCardSuccess(newCardResponse)
        );
      });

      it("calls the callback if provided", () => {
        expect(cb).toHaveBeenCalledWith(newCardResponse);
      });
    });
  });
});
