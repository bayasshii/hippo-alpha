class CreateSimulations < ActiveRecord::Migration[7.0]
  def change
    create_table :simulations do |t|
      t.string "title", null: false
      t.string "principal", null: false
      t.timestamps
    end
  end
end
