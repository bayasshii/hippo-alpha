require "test_helper"

class SimulationResultsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get simulation_results_new_url
    assert_response :success
  end
end
