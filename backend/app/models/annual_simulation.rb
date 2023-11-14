class AnnualSimulation < ApplicationRecord
  belongs_to :simulation
  validates :monthly_deposit, presence: true, length: { maximum: 12 }, numericality: { only_integer: true }
  validates :rate, presence: true, numericality: { only_integer: true }
  validates :year, presence: true,
            numericality: {
              only_integer: true,
              greater_than_or_equal_to: 0,
              less_than_or_equal_to: 99
            },
            uniqueness: { scope: :simulation_id }
end

# race condition
# 競争状況
# 瞬時に同じ操作がされた時、どちらが採用・尊重・利用されるのかが定まらない状況

# annu_year45_1.save
# uniqueness =>  [0.5s] SELECT * from annual_simulations where year = 45 AND simulation_id = {s_id}

# annu_year45_2.save
# uniqueness =>  [0.5s] SELECT * from annual_simulations where year = 45 AND simulation_id = {s_id}
