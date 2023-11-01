class SimulationResultsController < ApplicationController
  
  def index
    simulationResults = SimulationResult.all.order(:id)
    render json: simulationResults
  end

  def create
    simulationResult = SimulationResult.new(simulationResult_params)
    if simulationResult.save
      render json: simulationResult
    else
      render json: simulationResult.errors
    end
  end

  private
    def simulationResult_params
      params.require(:simulationResult).permit(:title, :content)
    end
end