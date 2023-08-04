class PostSerializer < ActiveModel::Serializer
  attributes :id, :song_id, :user_id, :comment, :user_name, :playlist_id, :date

  belongs_to :song
  belongs_to :user
  belongs_to :playlist

end
