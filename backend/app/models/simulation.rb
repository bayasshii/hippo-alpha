class Simulation < ApplicationRecord
  has_many :assumed_yields, dependent: :destroy
  has_many :monthly_deposits, dependent: :destroy
  validates :title, presence: true, length: { maximum: 50 }
  validates :principal, presence: true, length: { maximum: 12 }, numericality: { only_integer: true }
end