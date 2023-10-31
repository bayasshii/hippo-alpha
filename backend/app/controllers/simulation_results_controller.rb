class SimulationResultsController < ApplicationController
  
  def index
    simulationResults = SimulationResult.all.order(:id)
    render json: simulationResults
  end

  def show
    render json: @simulationResults
  end

  def create
    simulationResult = SimulationResult.new(simulationResult_params)
    puts '吠えgほげ'
    if simulationResult.save
      render json: simulationResult
    else
      render json: simulationResult.errors
    end
  end

  def update
    if @simulationResult.update(simulationResult_params)
      render json: @simulationResult
    else
      render json: @simulationResult.errors
    end
  end

  def destroy
    if @simulationResult.destroy
      render json: @simulationResult
    else
      render json: @simulationResult.errors
    end
  end

  private
    def simulationResult_params
      params.require(:simulationResult).permit(:title, :content)
    end
end