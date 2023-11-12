class SimulationsController < ApplicationController
  def index
    user_id = params[:user_id]
    simulations = Simulation.where(user_id:).order(:id)
    render json: simulations
  end

  def show
    simulation = Simulation.find(params[:id])
    render json: simulation
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Simulation not found' }, status: :not_found
  end

  def create
    simulation = Simulation.new(simulation_params)
    if simulation.save
      render json: simulation
    else
      render json: simulation.errors, status: :unprocessable_entity
    end
  end

  def update
    simulation = Simulation.find(params[:id])
    if simulation.update(simulation_params)
      render json: simulation
    else
      render json: simulation.errors, status: :unprocessable_entity
    end
  end

  private

  def simulation_params
    params.require(:simulation).permit(:title, :principal, :assumed_yields, :monthly_deposit, :user_id)
  end
end
