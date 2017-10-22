require "application_system_test_case"

class ListTest < ApplicationSystemTestCase
  class CreatingListTest < ApplicationSystemTestCase
    # test "creating with a blank title does not save the board" do
    #   visit "/"
    #
    #   find(".board-tile").click
    #
    #   within ".board-tile" do
    #     find("input[type='text']").set("")
    #     click_on "Create"
    #   end
    #
    #   assert_equal Board.count, 0
    #   assert_selector ".board-tile input[type='text']"
    # end
    #
    # test "creating a list successfully" do
    #   create(:board)
    #   visit board_path(1)
    #
    #   find("#new-list span").click
    #   fill_in("title", with: "My list")
    #   find("#new-list .button").click
    #
    #   assert_equal 1, List.count
    # end
    # test "creating a list successfully" do
    #   visit "/"
    #
    #   find(".board-tile").click
    #
    #   within ".board-tile" do
    #     find("input[type='text']").set("My board")
    #     click_on "Create"
    #   end
    #
    #   refute_selector ".board-tile input[type='text']"
    #   assert_equal 1, Board.count
    # end
  end
end
