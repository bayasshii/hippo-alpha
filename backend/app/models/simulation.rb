class Simulation < ApplicationRecord
    has_many :assumed_yields, dependent: :destroy
    has_many :monthly_deposits, dependent: :destroy
end