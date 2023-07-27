class User < ApplicationRecord
    has_many :posts
    has_many :songs, through: :posts
end
