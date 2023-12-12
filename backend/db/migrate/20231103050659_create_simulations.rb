class CreateSimulations < ActiveRecord::Migration[7.0]
  def change
    create_table :simulations do |t|
      t.string "title", null: false
      t.string "principal", null: false
      t.references :user, null: false # planetscaleの仕様上外部キー制約は削除, foreign_key: true
      t.timestamps
    end
  end
end
