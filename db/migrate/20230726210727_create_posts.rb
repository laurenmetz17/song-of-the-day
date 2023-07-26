class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.integer :song_id
      t.integer :user_id
      t.string :comment

      t.timestamps
    end
  end
end
