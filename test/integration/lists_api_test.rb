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
      test "returns a 422" do
        post "/api/lists",
          params: { list: { title: '' } },
          headers: { 'Accept' => 'application/json' }

        assert_response 422
      end
    end
  end
end
