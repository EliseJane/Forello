import reducer from './ListsReducer';
import * as types from '../constants/ActionTypes';

describe("ListsReducer", () => {
  describe("unknown type", () => {
    it("returns the state parameter", () => {
      expect(
        reducer("param value", { type: "FAKE_TYPE_FOR_TEST" })
      ).toEqual("param value");
    });
  });

  describe("FETCH_BOARD_SUCCESS", () => {
    it("returns empty array from action.board value with no lists", () => {
      expect(
        reducer([], {
          type: types.FETCH_BOARD_SUCCESS,
          board: { id: 1, title: "My board", lists: [] }
        })
      ).toEqual([]);
    });
  });

  describe("FETCH_BOARD_SUCCESS", () => {
    it("returns just lists from action.board value", () => {
      expect(
        reducer([], {
          type: types.FETCH_BOARD_SUCCESS,
          board: { id: 1, title: "My board", lists: [{ id: 1, title: "My list" }, { id: 2, title: "My second list" }] }
        })
      ).toEqual([{ id: 1, title: "My list" }, { id: 2, title: "My second list" }]);
    });
  });
});
