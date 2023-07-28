class AddArtToSong < ActiveRecord::Migration[6.1]
  def change
    add_column :songs, :art, :string
  end
end
