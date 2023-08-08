class Post < ApplicationRecord
    validates :comment, {presence:true}
    validates :song_id, {presence:true}
    validates :date, {presence: true}
    #validates :date, {uniqueness:true}
    validates_uniqueness_of :date, scope: :user_id

    belongs_to :user
    belongs_to :song
    belongs_to :playlist

    def user_name
        return self.user.name
    end
end
