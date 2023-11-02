class CreateAssumedYields < ActiveRecord::Migration[7.0]
  def change
    create_table :assumed_yields do |t|
      t.numeric "rate", null: false, precision: 11, scale: 8
      t.integer "order", null: false
      t.integer "year", null: false
      t.timestamps
    end
  end
end
