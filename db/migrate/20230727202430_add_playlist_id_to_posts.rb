class AddPlaylistIdToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :playlist_id, :integer
  end
end
