class SimulationsController < ApplicationController
  before_action :authenticate_user!, only: [:index, :show, :new, :create, :update]
  before_action :set_simulation, only: [:show, :update, :destroy, :update_simulation_and_annual_simulations]

  def index
    simulations = current_user.simulations.order(:id)
    render json: simulations, status: :ok
  end

  def show
    render json: @simulation, status: :ok
  end

  def create
    simulation = current_user.simulations.build(simulation_params)
    handle_save(simulation, :created)
  end

  def update
    @simulation.update(simulation_params)
    handle_save(@simulation, :ok)
  end

  def destroy
    if @simulation.destroy
      render json: @simulation, status: :ok
    else
      render json: @simulation.errors, status: :unprocessable_entity
    end
  end

  def create_simulation_and_annual_simulations
    ActiveRecord::Base.transaction do
      @simulation = current_user.simulations.create!(simulation_params)
      params[:annual_simulations].each do |annual_simulation|
        @simulation.annual_simulations.create!(annual_simulation_params(annual_simulation))
      end
    end
    render json: @simulation, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.message }, status: :unprocessable_entity
  end

  def update_simulation_and_annual_simulations
    ActiveRecord::Base.transaction do
      @simulation.update!(simulation_params)
      @simulation.annual_simulations.destroy_all
      params[:annual_simulations].each do |annual_simulation|
        @simulation.annual_simulations.create!(annual_simulation_params(annual_simulation))
      end
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.message }, status: :unprocessable_entity
  end

  private

  def simulation_params
    params.require(:simulation).permit(:title, :principal, :assumed_yields, :monthly_deposit, annual_simulations: [])
  end

  def annual_simulation_params(annual_simulation)
    annual_simulation.permit(:monthly_deposit, :rate, :years, :order, :simulation_id, :id)
  end

  def set_simulation
    @simulation = current_user.simulations.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Simulation not found' }, status: :not_found
  end

  def handle_save(record, success_status)
    if record.save
      render json: record, status: success_status
    else
      render json: record.errors, status: :unprocessable_entity
    end
  end
end
