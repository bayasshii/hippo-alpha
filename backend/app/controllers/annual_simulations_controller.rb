class AnnualSimulationsController < ApplicationController
  # curent_userの形を取ってない(AnnualSimulationはuser_idを持ってないので)けどここで認証求めてるしいいかなぁ
  before_action :authenticate_user!, only: [:index, :show, :new, :create, :update]

  def index
    simulation_id = params[:simulation_id]
    annual_simulations = AnnualSimulation.where(simulation_id:).order(:year)
    render json: annual_simulations, status: :ok
  end

  def show
    annual_simulation = AnnualSimulation.find(params[:id])
    render json: annual_simulation, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'AnnualSimulation not found' }, status: :not_found
  end

  def create
    annual_simulation = AnnualSimulation.new(annual_simulation_params)
    if annual_simulation.save
      render json: annual_simulation, status: :created
    else
      render json: annual_simulation.errors, status: :unprocessable_entity
    end
  end

  def update
    annual_simulation = AnnualSimulation.find(params[:id])
    if annual_simulation.update(annual_simulation_params)
      render json: annual_simulation, status: :ok
    else
      render json: annual_simulation.errors, status: :unprocessable_entity
    end
  end

  private

  def annual_simulation_params
    params.require(:annual_simulation).permit(:year, :rate, :monthly_deposit, :simulation_id)
  end
end
