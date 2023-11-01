class CreateSimulationResults < ActiveRecord::Migration[7.0]
  def change
    create_table :simulation_results do |t|
      t.string "title", null: false
      t.string "principal", null: false
      t.timestamps
    end
  end
end
