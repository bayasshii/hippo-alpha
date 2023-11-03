require "test_helper"

class SimulationsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get simulations_new_url
    assert_response :success
  end
end
