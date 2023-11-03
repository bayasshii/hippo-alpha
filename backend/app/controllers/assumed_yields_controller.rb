class AssumedYieldsController < ApplicationController
  def index
    simulation_id = params[:simulation_id]
    assumedYields = AssumedYield.find_by_simulation_id(simulation_id)
    render json: assumedYields
  end
end
