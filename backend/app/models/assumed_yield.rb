class AssumedYield < ApplicationRecord
    belongs_to :simulation

    def self.find_by_simulation_id(id)
        joins(:simulation).where('simulations.id = ?', id)
    end
end
