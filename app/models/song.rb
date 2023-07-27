class Song < ApplicationRecord
    has_many :posts
    has_many :users, through: :posts
    has_many :playlists, through: :posts
end
