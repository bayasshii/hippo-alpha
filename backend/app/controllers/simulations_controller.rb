class SimulationsController < ApplicationController
  def index
    # GET /simulations?user_id=453
    user_id = params[:user_id]  # current_user.id で　id を取るべき。params はユーザーが自由に指定できるから、この渡し方は脆弱
    simulations = Simulation.where(user_id:).order(:id)
    render json: simulations
  end

  def show
    # こっちも current_user.simulations.find(params[:id]) って書くと、確実に current_user に紐づくやつになる 
    
    # freee では
    # current_company.deals
    # Deal.includes(:line_items).hoge.fuga.fizz.where(amount: 1111) ← 「company_id を追加してください」 と全員が気にできる

    # この書き方でも同じことができる
    # Simulation.find_by(id: params[:id], user_id: current_user.id)

    # current_user.simulations.order(created_at: :asc).find(params[:id])
    #> SELECT * from simulations where id = {id} AND user_id = {user_id} ORDER BY created_at DESC LIMIT 1;
    # current_user: User

    # current_user は何 class のインスタンス = User のインスタンス

    # GET /simulations/999 ← id 999 をこれで他人全員が見えてしまう

    simulation = Simulation.find(params[:id])
    render json: simulation
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Simulation not found' }, status: :not_found
  end

  def create
    # current_user.simulations.new(simulation_params) にしないと他人の

    # current_user.simulations == Simulation with user 

    simulation = Simulation.new(simulation_params)
    if simulation.save
      render json: simulation
    else
      render json: simulation.errors, status: :unprocessable_entity
    end
  end

  def update
    simulation = current_user.simulations.find(params[:id])
    if simulation.update(simulation_params)
      render json: simulation
    else
      render json: simulation.errors, status: :unprocessable_entity
    end
  end

  private

  # Strong Parameter
  # update(params) params[:sawatteha_ikenai_column] => 保存されてしまう
  def simulation_params
    params.require(:simulation).permit(:title, :principal, :assumed_yields, :monthly_deposit, :user_id) # user_id は不要。これがあると、任意の user の Simulation を勝手に作れちゃう
  end
end
