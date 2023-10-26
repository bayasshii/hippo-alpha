class AddTitleToSimulationResults < ActiveRecord::Migration[7.0]
  def change
    add_column :simulation_results, :title, :string
    add_column :simulation_results, :content, :string
  end
end
