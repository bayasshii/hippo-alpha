class AssumedYield < ApplicationRecord
    belongs_to :simulation_result

    def self.find_by_simulation_result_id(id)
        joins(:simulation_result).where('simulation_results.id = ?', id)
    end
end
