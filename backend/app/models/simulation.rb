class Simulation < ApplicationRecord
    has_many :assumed_yields , dependent: :destroy
end