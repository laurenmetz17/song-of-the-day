class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username

  has_many :posts
  has_many :songs
  has_many :playlists, each_serializer: PlaylistSerializer
end
