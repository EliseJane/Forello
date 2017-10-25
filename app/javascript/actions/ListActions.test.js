import React from 'react';

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

import apiClient from '../lib/ApiClient.js';
jest.mock('../lib/ApiClient');

import * as actions from './ListActions';
import * as types from '../constants/ActionTypes';
import * as statuses from '../constants/Statuses';

describe("List actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    apiClient.getBoards.mockClear();
    apiClient.createList.mockClear();
    store.clearActions()
  });

  describe("createListRequest", () => {
    it("returns the correct object", () => {
      expect(
        actions.createListRequest()
      ).toEqual({ type: types.CREATE_LIST_REQUEST });
    });
  });

  describe("createListSuccess", () => {
    it("returns the correct object", () => {
      const list = { id: 1, title: "my list", board_id: 1 };

      expect(
        actions.createListSuccess(list)
      ).toEqual({ type: types.CREATE_LIST_SUCCESS, list });
    });
  });

  describe("updateListRequest", () => {
    it("returns the correct object", () => {
      expect(
        actions.updateListRequest()
      ).toEqual({ type: types.UPDATE_LIST_REQUEST });
    });
  });

  describe("updateListSuccess", () => {
    it("returns the correct object", () => {
      const list = { id: 1, title: "my list", board_id: 1 };

      expect(
        actions.updateListSuccess(list)
      ).toEqual({ type: types.UPDATE_LIST_SUCCESS, list });
    });
  });
});
