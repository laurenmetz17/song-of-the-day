class AddDateToPost < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :date, :date
  end
end
