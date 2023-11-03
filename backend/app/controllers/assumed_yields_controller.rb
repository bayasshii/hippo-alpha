class AssumedYieldsController < ApplicationController
  def index
    simulation_id = params[:simulation_id]
    assumedYields = AssumedYield.find_by_simulation_id(simulation_id)
    assumedYields = assumedYields.sort_by{|assumedYield| assumedYield.order}
    render json: assumedYields
  end

  def update
    assumedYield = AssumedYield.find(params[:id])
    if assumedYield.update(assumed_yield_params)
      render json: assumedYield
    else
      render json: assumedYield.errors
    end
  end

  def create
    assumedYield = AssumedYield.new(assumed_yield_params)
    if assumedYield.save
      render json: assumedYield
    else
      render json: assumedYield.errors
    end
  end

  def destroy
    assumedYield = AssumedYield.find(params[:id])
    assumedYield.destroy
    render json: assumedYield
  end

  private
    def assumed_yield_params
      params.require(:assumed_yield).permit(:rate, :order, :year, :simulation_id)
    end
  
end
