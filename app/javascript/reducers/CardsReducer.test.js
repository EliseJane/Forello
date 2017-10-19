import reducer from './CardsReducer';
import * as types from '../constants/ActionTypes';

describe("CardsReducer", () => {
  describe("unknown type", () => {
    it("returns the state parameter", () => {
      expect(
        reducer("param value", { type: "FAKE_TYPE_FOR_TEST" })
      ).toEqual("param value");
    });
  });

  describe("FETCH_BOARD_SUCCESS", () => {
    it("returns just cards from action.board value", () => {
      expect(
        reducer([], {
          type: types.FETCH_BOARD_SUCCESS,
          board: { id: 1,
                   title: "My board",
                   lists: [{
                     id: 1,
                     title: "My list",
                     cards: [{ id: 1, title: "My card" }]
                 }]
          }
        })
      ).toEqual([{id: 1, title: "My card"}]);
    });
  });
});
