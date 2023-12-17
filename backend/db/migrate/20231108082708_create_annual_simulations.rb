class CreateAnnualSimulations < ActiveRecord::Migration[7.0]
  def change
    create_table :annual_simulations do |t|
      t.integer "monthly_deposit", null: false
      t.integer "rate", null: false
      t.integer "years", null: false
      t.integer "order", null: false
      t.references :simulation, null: false # planetscaleの仕様上外部キー制約は削除, foreign_key: true
      t.timestamps
    end
  end
end
