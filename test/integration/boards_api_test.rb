require 'test_helper'

class BoardsAPITest < ActionDispatch::IntegrationTest
  class GetBoardsTest < ActionDispatch::IntegrationTest
    test "returns a json array" do
      get "/api/boards",
        headers: { 'Accept' => 'application/json' }
      assert_match /\[.*\]/, response.body
    end
  end

  class GetBoardTest < ActionDispatch::IntegrationTest
    def setup
      @new_board = Board.create( title: "test board")
    end

    test "returns a json object" do
      get "/api/boards/#{@new_board.id}",
        headers: { 'Accept' => 'application/json' }
      assert_match /\{.*\}/, response.body
    end

    test "returns correct board" do
      get "/api/boards/#{@new_board.id}",
        headers: { 'Accept' => 'application/json' }
      assert_includes response.body, @new_board.title
    end

    test "return empty lists array if no lists" do
      get "/api/boards/#{@new_board.id}",
        headers: { 'Accept' => 'application/json' }
      assert_equal JSON.parse(response.body)['lists'].size, 0
    end

    test "returns lists if lists exists" do
      @new_board.lists << List.create(title: 'test list', position: 0)
      get "/api/boards/#{@new_board.id}",
        headers: { 'Accept' => 'application/json' }
      assert_equal JSON.parse(response.body)['lists'].size, 1
    end

    test "returns empty cards array if no cards" do
      @new_board.lists << List.create(title: 'test list', position: 0)
      get "/api/boards/#{@new_board.id}",
        headers: { 'Accept' => 'application/json' }
      assert_equal JSON.parse(response.body)['lists'][0]['cards'].size, 0
    end

    test "returns cards if cards exist" do
      list = List.create(title: 'test list', position: 0)
      @new_board.lists << list
      list.cards << Card.create(title: 'test card', position: 0)

      get "/api/boards/#{@new_board.id}",
        headers: { 'Accept' => 'application/json' }
      assert_equal JSON.parse(response.body)['lists'][0]['cards'].size, 1
    end

    test "returns 404 error if board doesn't exist" do
      get "/api/boards/1000000",
        headers: { 'Accept' => 'application/json'}

      assert_response 404
    end
  end

  class PostBoardsTest < ActionDispatch::IntegrationTest
    class ValidDataTest < ActionDispatch::IntegrationTest
      test "creates a new board" do
        assert_equal 0, Board.count

        post "/api/boards",
          params: { board: { title: "My new board" } },
          headers: { 'Accept' => 'application/json' }

        assert_equal 1, Board.count
      end

      test "returns a 201" do
        post "/api/boards",
          params: { board: { title: "My new board" } },
          headers: { 'Accept' => 'application/json' }


        assert_response 201
      end


      test "returns the new board" do
        new_board = { title: "My new board" }

        post "/api/boards",
          params: { board: new_board },
          headers: { 'Accept' => 'application/json' }

        assert_equal Board.first.to_json, response.body
      end
    end

    class InvalidDataTest < ActionDispatch::IntegrationTest
      test "returns a 422" do
        post "/api/boards",
          params: { board: { title: '' } },
          headers: { 'Accept' => 'application/json' }

        assert_response 422
      end
    end
  end
end
