class CreateMonthlyDeposits < ActiveRecord::Migration[7.0]
  def change
    create_table :monthly_deposits do |t|
      t.integer "amount", null: false
      t.integer "order", null: false
      t.integer "year", null: false
      t.references :simulation, null: false, foreign_key: true
      t.timestamps
    end
  end
end
