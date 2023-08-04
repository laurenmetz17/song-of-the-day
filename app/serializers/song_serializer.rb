class SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :art

  has_many :posts
  has_many :playlists
end
