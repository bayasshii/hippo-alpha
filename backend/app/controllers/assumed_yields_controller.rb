class AssumedYieldsController < ApplicationController
  def index
    assumedYields = AssumedYield.find_by_simulation_result_id(3)
    render json: assumedYields
  end
end
