class MonthlyDepositsController < ApplicationController
    def index
        simulation_id = params[:simulation_id]
        monthlyDeposits = MonthlyDeposit.find_by_simulation_id(simulation_id)
        monthlyDeposits = monthlyDeposits.sort_by{|monthlyDeposit| monthlyDeposit.order} if monthlyDeposits
        render json: monthlyDeposits
    end
    
    def update
        monthlyDeposit = MonthlyDeposit.find(params[:id])
        if monthlyDeposit.update(monthly_deposit_params)
        render json: monthlyDeposit
        else
        render json: monthlyDeposit.errors
        end
    end
    
    def create
        monthlyDeposit = MonthlyDeposit.new(monthly_deposit_params)
        if monthlyDeposit.save
        render json: monthlyDeposit
        else
        render json: monthlyDeposit.errors
        end
    end
    
    def destroy
        monthlyDeposit = MonthlyDeposit.find(params[:id])
        monthlyDeposit.destroy
        render json: monthlyDeposit
    end
    
    private
        def monthly_deposit_params
          params.require(:monthly_deposit).permit(:amount, :order, :year, :simulation_id)
        end
end
