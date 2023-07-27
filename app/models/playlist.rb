class Playlist < ApplicationRecord
    belongs_to :user
    has_many :posts
    has_many :songs, through: :post
end
