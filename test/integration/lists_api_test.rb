require 'test_helper'

class ListsAPITest < ActionDispatch::IntegrationTest
  class PostListsTest < ActionDispatch::IntegrationTest
    class ValidDataTest < ActionDispatch::IntegrationTest
      def setup
        Board.create(id: 1, title: 'New Board')
      end

      test "creates a new list" do
        assert_equal 0, List.count

        post "/api/lists",
          params: { list: { title: "My new list", board_id: 1, position: 1.0 } },
          headers: { 'Accept' => 'application/json' }

        assert_equal 1, List.count
      end

      test "returns a 201" do
        post "/api/lists",
          params: { list: { title: "My new list", board_id: 1, position: 1.0 } },
          headers: { 'Accept' => 'application/json' }


        assert_response 201
      end


      test "returns the new list" do
        new_list = { title: "My new list", board_id: 1, position: 1.0 }

        post "/api/lists",
          params: { list: new_list },
          headers: { 'Accept' => 'application/json' }

        assert_equal List.first.to_json, response.body
      end
    end

    class InvalidDataTest < ActionDispatch::IntegrationTest
      def setup
        Board.create(id: 1, title: 'New Board')
      end

      test "returns a 422" do
        post "/api/lists",
          params: { list: { board_id: 1, title: '' } },
          headers: { 'Accept' => 'application/json' }

        assert_response 422
      end
      test "returns a 404" do
        post "/api/lists",
          params: { list: { board_id: 4, title: "title", position: 2.0 } },
          headers: { 'Accept' => 'application/json' }

        assert_response 404
      end
    end
  end

  class PatchListsTest < ActionDispatch::IntegrationTest
    class ValidDataTest < ActionDispatch::IntegrationTest
      def setup
        Board.create(id: 1, title: 'New Board')
        List.create(id: 20, board_id: 1, title: "old title", position: 1.0)
      end

      test "edits list name" do
        patch "/api/lists/20",
          params: { list: { title: "new title" } },
          headers: { 'Accept' => 'application/json' }

        assert_equal "new title", List.find_by(id: 20).title
      end

      test "returns a 200" do
        patch "/api/lists/20",
          params: { list: { title: "new title" } },
          headers: { 'Accept' => 'application/json' }

        assert_response 200
      end


      test "returns the new list" do
        patch "/api/lists/20",
          params: { list: { title: "new title" } },
          headers: { 'Accept' => 'application/json' }

        assert_equal List.find_by(id: 20).to_json, response.body
      end
    end

    class InvalidDataTest < ActionDispatch::IntegrationTest
      def setup
        Board.create(id: 1, title: 'New Board')
        List.create(id: 20, board_id: 1, title: "old title", position: 1.0)
      end

      test "returns 404 error if list doesn't exist" do
        patch "/api/lists/1000000",
          params: { list: { title: "fake" } },
          headers: { 'Accept' => 'application/json'}

        assert_response 404
      end

      test "returns a 422" do
        patch "/api/lists/20",
          params: { list: { title: '' } },
          headers: { 'Accept' => 'application/json' }

        assert_response 422
      end
    end
  end
end
