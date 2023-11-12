class Simulation < ApplicationRecord
  belongs_to :user
  has_many :annual_simulations, dependent: :destroy
  validates :title, presence: true, length: { maximum: 50 }
  validates :principal, presence: true, length: { maximum: 12 }, numericality: { only_integer: true }
end