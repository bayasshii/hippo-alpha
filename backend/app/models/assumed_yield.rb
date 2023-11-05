class AssumedYield < ApplicationRecord
  belongs_to :simulation
  validates :rate, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 999.9 }
  validates :year, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 100 }
  validates :order, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 100 }, uniqueness: { scope: :simulation_id }

  def self.find_by_simulation_id(id)
    joins(:simulation).where(simulations: { id: })
  end
end
