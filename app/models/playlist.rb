class Playlist < ApplicationRecord
    validates :title, {presence:true}
    validates :user_id, {presence:true}
    #validates :title, {uniqueness:true}
    validates_uniqueness_of :title, scope: :user_id

    belongs_to :user
    has_many :posts
    has_many :songs, through: :posts
end
