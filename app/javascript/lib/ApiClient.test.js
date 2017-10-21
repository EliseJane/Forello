import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import flushPromises from 'flush-promises';

import client from './ApiClient';
import * as routes from '../constants/ApiRoutes';


describe("ApiClient", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe("getBoards", () => {
    const boards = [{
      id: 1,
      title: "My board"
    }];

    describe("successful request", () => {
      it("calls the callback with the boards", async () => {
        const cb = jest.fn();

        mock.onGet(routes.BOARDS_INDEX_URL).reply(200, boards);
        client.getBoards(cb);

        await flushPromises();

        expect(cb).toHaveBeenCalledWith(boards);
      });
    });

    describe("failed request", () => {
      const originalError = global.console.error;
      const errorText = "You don't have access to that";

      beforeEach(() => {
        global.console.error = jest.fn();
        mock.onGet(routes.BOARDS_INDEX_URL).reply(401, { error: errorText });
      });

      afterEach(() => {
        global.console.error = originalError;
      });

      it("logs the error", async () => {
        client.getBoards((boards) => {});

        await flushPromises();

        expect(global.console.error).toHaveBeenCalledWith(`HTTP Error: ${errorText}`);
      });

      it("doesn't call the callback", async () => {
        const cb = jest.fn();
        client.getBoards(cb);

        await flushPromises();

        expect(cb).not.toHaveBeenCalled();
      });
    });
  });

  describe("getBoard", () => {
    const board = {
      id: 1,
      title: "My board",
      lists: [],
    };

    describe("successful request", () => {
      it("calls the callback with the boards", async () => {
        const cb = jest.fn();

        mock.onGet(routes.BOARD_SHOW_URL + '1').reply(200, board);
        client.getBoard('1', cb);

        await flushPromises();

        expect(cb).toHaveBeenCalledWith(board);
      });
    });

    describe("failed request", () => {
      const originalError = global.console.error;
      const errorText = "You don't have access to that";

      beforeEach(() => {
        global.console.error = jest.fn();
        mock.onGet(routes.BOARD_SHOW_URL + '1').reply(401, { error: errorText });
      });

      afterEach(() => {
        global.console.error = originalError;
      });

      it("logs the error", async () => {
        client.getBoard('1', (board) => {});

        await flushPromises();

        expect(global.console.error).toHaveBeenCalledWith(`HTTP Error: ${errorText}`);
      });

      it("doesn't call the callback", async () => {
        const cb = jest.fn();
        client.getBoard('1', cb);

        await flushPromises();

        expect(cb).not.toHaveBeenCalled();
      });
    });
  });

  describe("createList", () => {
    describe("successful request", () => {
      const newList = {
        board_id: 1,
        title: "my list",
        position: 0.0
      };

      it("calls the callback with the new list", async () => {
        const cb = jest.fn();

        mock.onPost(routes.CREATE_LIST_URL).reply(201, { ...newList, id: 3 });
        client.createList(newList, cb);

        await flushPromises();

        expect(cb).toHaveBeenCalledWith({ ...newList, id: 3 });
      });
    });

    describe("failed request", () => {
      const originalError = global.console.error;
      const errorText = "That is not a valid record";

      beforeEach(() => {
        global.console.error = jest.fn();
        mock.onPost(routes.CREATE_LIST_URL).reply(422, { error: errorText });
      });

      afterEach(() => {
        global.console.error = originalError;
      });

      it("logs the error", async () => {
        client.createList({});

        await flushPromises();

        expect(global.console.error).toHaveBeenCalledWith(`HTTP Error: ${errorText}`);
      });

      it("doesn't call the callback", async () => {
        const cb = jest.fn();

        client.createList({}, cb);

        await flushPromises();

        expect(cb).not.toHaveBeenCalled();
      });
    })
  });

  describe("UpdateList", () => {
    describe("successful request", () => {
      const newList = {
        id: 1,
        board_id: 1,
        title: "my list",
        position: 1.0
      };

      it("calls the callback with the new list", async () => {
        const cb = jest.fn();

        mock.onPatch(routes.UPDATE_LIST_URL + '1').reply(200, newList);
        client.updateList(newList, cb);

        await flushPromises();

        expect(cb).toHaveBeenCalledWith(newList);
      });
    });

    // describe("failed 404 request", () => {
    //   const originalError = global.console.error;
    //   const errorText = "This list could not be found";
    //
    //   beforeEach(() => {
    //     global.console.error = jest.fn();
    //     mock.onPost(routes.UPDATE_LIST_URL + '1').reply(404, { error: errorText });
    //   });
    //
    //   afterEach(() => {
    //     global.console.error = originalError;
    //   });
    //
    //   it("logs the error", async () => {
    //     client.updateList({});
    //
    //     await flushPromises();
    //
    //     expect(global.console.error).toHaveBeenCalledWith(`Error: ${errorText}`);
    //   });
    //
    //   it("doesn't call the callback", async () => {
    //     const cb = jest.fn();
    //
    //     client.updateList({}, cb);
    //
    //     await flushPromises();
    //
    //     expect(cb).not.toHaveBeenCalled();
    //   });
    // })
  });

  describe("createBoard", () => {
    describe("successful request", () => {
      const newBoard = {
        title: "My new board"
      };

      it("calls the callback with the new board", async () => {
        const cb = jest.fn();

        mock.onPost(routes.CREATE_BOARD_URL).reply(201, { ...newBoard, id: 37 });
        client.createBoard(newBoard, cb);

        await flushPromises();

        expect(cb).toHaveBeenCalledWith({ ...newBoard, id: 37 })
      });
    });

    describe("failed request", () => {
      const originalError = global.console.error;
      const errorText = "That is not a valid record";

      beforeEach(() => {
        global.console.error = jest.fn();
        mock.onPost(routes.CREATE_BOARD_URL).reply(422, { error: errorText });
      });

      afterEach(() => {
        global.console.error = originalError;
      });

      it("logs the error", async () => {
        client.createBoard({});

        await flushPromises();

        expect(global.console.error).toHaveBeenCalledWith(`HTTP Error: ${errorText}`);
      });

      it("doesn't call the callback", async () => {
        const cb = jest.fn();

        client.createBoard({}, cb);

        await flushPromises();

        expect(cb).not.toHaveBeenCalled();
      });
    });
  });
});
