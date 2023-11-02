class SimulationResultsController < ApplicationController
  
  def index
    simulationResults = SimulationResult.all.order(:id)
    render json: simulationResults
  end

  def show
    simulationResult = SimulationResult.find(params[:id])
    render json: simulationResult
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'SimulationResult not found' }, status: :not_found
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
      params.require(:simulationResult).permit(:title, :principal,:assumed_yields, :monthly_deposit)
    end
end