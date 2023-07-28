class User < ApplicationRecord
    validates :name, {presence: true}
    validates :username, {presence: true}
    validates :username, {uniqueness: true}
    validates :password, {presence: true}
    validates :password_confirmation, {presence: true}
    
    has_many :posts
    has_many :songs, through: :posts
    has_many :playlists

    has_secure_password
end
