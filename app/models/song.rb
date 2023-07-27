class Song < ApplicationRecord
    has_many :posts
    has_many :playlist_songs
    has_many :users, through: :posts
    has_many :playlists, through: :playlist_songs
end
