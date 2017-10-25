require 'test_helper'

class CardsAPITest < ActionDispatch::IntegrationTest
  class PostCardsTest < ActionDispatch::IntegrationTest
    class ValidDataTest < ActionDispatch::IntegrationTest
      def setup
        Board.create(id: 1, title: "board title")
        List.create(id: 1, title: "list title", board_id: 1, position: 1.0)
      end

      test "creates a new card" do
        assert_equal 0, Card.count

        post "/api/cards",
          params: { card: { title: "card title", list_id: 1, position: 1.0 } },
          headers: { 'Accept' => 'application/json' }

        assert_equal 1, Card.count
      end

      test "returns a 201" do
        post "/api/cards",
          params: { card: { title: "card title", list_id: 1, position: 1.0 } },
          headers: { 'Accept' => 'application/json' }

        assert_response 201
      end

      test "returns the new card" do
        new_card = { title: "card title", list_id: 1, position: 1.0 }

        post "/api/cards",
          params: { card: new_card },
          headers: { 'Accept' => 'application/json' }

        assert_equal Card.first.id, JSON.parse(response.body)["id"]
      end
    end
    class InvalidDataTest < ActionDispatch::IntegrationTest
      def setup
        Board.create(id: 1, title: "board title")
        List.create(id: 1, title: "list title", board_id: 1, position: 1.0)
      end

      test "returns a 422" do
        post "/api/cards",
          params: { card: { list_id: 1, title: '' } },
          headers: { 'Accept' => 'application/json' }

        assert_response 422
      end
      test "returns a 404" do
        post "/api/cards",
          params: { card: { list_id: 4, title: "title", position: 2.0 } },
          headers: { 'Accept' => 'application/json' }

        assert_response 404
      end
    end
  end

  class PatchCardsTest < ActionDispatch::IntegrationTest
    class ValidDataTest < ActionDispatch::IntegrationTest
      def setup
        Board.create(id: 1, title: 'New Board')
        List.create(id: 20, board_id: 1, title: "new list", position: 1.0)
        Card.create(id: 50, list_id: 20, title: "old title", position: 1.0)
      end

      test "edits card name" do
        patch "/api/cards/50",
          params: { card: { title: "new title" } },
          headers: { 'Accept' => 'application/json' }

        assert_equal "new title", Card.find_by(id: 50).title
      end

      test "returns a 200" do
        patch "/api/cards/50",
          params: { card: { title: "new title" } },
          headers: { 'Accept' => 'application/json' }

        assert_response 200
      end


      test "returns the new card" do
        patch "/api/cards/50",
          params: { card: { title: "new title" } },
          headers: { 'Accept' => 'application/json' }

        assert_equal Card.find_by(id: 50).id, JSON.parse(response.body)["id"]
      end
    end

    class InvalidDataTest < ActionDispatch::IntegrationTest
      def setup
        Board.create(id: 1, title: 'New Board')
        List.create(id: 20, board_id: 1, title: "new list", position: 1.0)
        Card.create(id: 50, list_id: 20, title: "old title", position: 1.0)
      end

      test "returns 404 error if card doesn't exist" do
        patch "/api/cards/1000000",
          params: { card: { title: "fake" } },
          headers: { 'Accept' => 'application/json'}

        assert_response 404
      end

      test "returns a 422" do
        patch "/api/cards/50",
          params: { card: { title: '' } },
          headers: { 'Accept' => 'application/json' }

        assert_response 422
      end
    end
  end

  class GetCardTest < ActionDispatch::IntegrationTest
    def setup
      Board.create(id: 1, title: 'New Board')
      List.create(id: 20, board_id: 1, title: "new list", position: 1.0)
      @new_card = Card.create(
        id: 50, list_id: 20, title: "card title",
        position: 1.0, description: "card description")
    end

    test "returns a json object" do
      get "/api/cards/#{@new_card.id}",
        headers: { 'Accept' => 'application/json' }
      assert_match /\{.*\}/, response.body
    end

    test "returns correct card" do
      get "/api/cards/#{@new_card.id}",
        headers: { 'Accept' => 'application/json' }
      assert_includes response.body, @new_card.title
    end

    test "returns description if exists" do
      get "/api/cards/#{@new_card.id}",
        headers: { 'Accept' => 'application/json' }
      assert_includes response.body, @new_card.description
    end

    test "returns empty labels array if no labels" do
      get "/api/cards/#{@new_card.id}",
        headers: { 'Accept' => 'application/json' }
      assert_equal JSON.parse(response.body)['labels'].size, 0
    end

    test "returns empty comments array if no comments" do
      get "/api/cards/#{@new_card.id}",
        headers: { 'Accept' => 'application/json' }
      assert_equal JSON.parse(response.body)['comments'].size, 0
    end

    test "returns accurate comment count" do
      get "/api/cards/#{@new_card.id}",
        headers: { 'Accept' => 'application/json' }
      assert_equal JSON.parse(response.body)["comments_count"], 0
    end

    test "returns empty actions array if no actions" do
      get "/api/cards/#{@new_card.id}",
        headers: { 'Accept' => 'application/json' }
      assert_equal JSON.parse(response.body)['actions'].size, 0
    end

    test "returns default false completed" do
      get "/api/cards/#{@new_card.id}",
        headers: { 'Accept' => 'application/json' }
      assert_equal JSON.parse(response.body)["completed"], false
    end

    test "returns default false archived" do
      get "/api/cards/#{@new_card.id}",
        headers: { 'Accept' => 'application/json' }
      assert_equal JSON.parse(response.body)["archived"], false
    end

    test "returns default null duedate" do
      get "/api/cards/#{@new_card.id}",
        headers: { 'Accept' => 'application/json' }
      assert_nil JSON.parse(response.body)["due_date"]
    end

    test "returns 404 error if board doesn't exist" do
      get "/api/cards/1000000",
        headers: { 'Accept' => 'application/json'}

      assert_response 404
    end
  end
end
