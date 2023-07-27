class User < ApplicationRecord
    has_many :posts
    has_many :songs, through: :posts
    has_many :playlists
end
