require "application_system_test_case"

class ListTest < ApplicationSystemTestCase
  class CreatingListTest < ApplicationSystemTestCase
    test "creating a list successfully" do
      create(:board, id: 1)
      visit board_path(1)

      find("#new-list span").click

      within "#new-list" do
        fill_in("title", with: "My list")
        click_button('Save')
      end

      assert_equal List.count, 1
    end
  end
end
