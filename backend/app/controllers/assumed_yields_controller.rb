class AssumedYieldsController < ApplicationController
  def index
    simulation_result_id = params[:simulation_result_id]
    assumedYields = AssumedYield.find_by_simulation_result_id(simulation_result_id)
    render json: assumedYields
  end
end
