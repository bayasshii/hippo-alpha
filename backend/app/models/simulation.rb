class Simulation < ApplicationRecord
  belongs_to :user
  has_many :annual_simulations, dependent: :destroy
  validates :title, presence: true, length: { maximum: 50 }
  validates :principal, presence: true, length: { maximum: 12 }, numericality: { only_integer: true }


  validates :amount, presence: true
  before_validate :calc_total_amount
  # total_amount が price * amount で計算される場合
  # s = Simulation(price: 100, amount: 10)
  # s.save => 失敗

  private 
  def calc_total_amount
    total_amount = price * amount
  end

  # title needs any characters
  # タイトルを入力してください

  # Validation は不整合を起こさない
  # 不整合 = あってはならない違い
  # rails としての validates の役割 = チェック & エラーメッセージの組み立て
end