class PostSerializer < ActiveModel::Serializer
  attributes :id :song_id, :listener_id, :review, :comment, :listener_name, :playlist_id
end
