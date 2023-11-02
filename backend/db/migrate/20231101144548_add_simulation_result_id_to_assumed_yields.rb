class AddSimulationResultIdToAssumedYields < ActiveRecord::Migration[7.0]
  def change
    add_reference :assumed_yields, :simulation_result, null: false, foreign_key: true
  end
end
