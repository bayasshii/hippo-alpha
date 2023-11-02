require "test_helper"

class AssumedYieldsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get assumed_yields_new_url
    assert_response :success
  end
end
