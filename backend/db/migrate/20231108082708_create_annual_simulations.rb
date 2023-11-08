class CreateAnnualSimulations < ActiveRecord::Migration[7.0]
  def change
    create_table :annual_simulations do |t|
      t.integer "monthly_deposit", null: false
      t.integer "rate", null: false
      t.integer "year", null: false
      t.references :simulation, null: false, foreign_key: true
      t.timestamps
    end
  end
end
