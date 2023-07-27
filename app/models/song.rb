class Song < ApplicationRecord
    validates :title, {presence: true}
    validates :artist, {presence: true}

    has_many :posts
    has_many :users, through: :posts
    has_many :playlists, through: :posts

    ##custom validation fetch to the itunes Api ?
end
