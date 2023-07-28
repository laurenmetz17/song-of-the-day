class Playlist < ApplicationRecord
    validates :title, {presence:true}
    validates :user_id {presence:true}
    validates :title, {uniqueness:true}

    belongs_to :user
    has_many :posts
    has_many :songs, through: :post
end
