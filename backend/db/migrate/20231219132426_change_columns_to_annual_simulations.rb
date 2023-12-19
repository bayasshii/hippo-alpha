class ChangeColumnsToAnnualSimulations < ActiveRecord::Migration[7.0]
  def change
    add_column :annual_simulations, :order, :integer, null: false
    rename_column :annual_simulations, :year, :years
  end
end
