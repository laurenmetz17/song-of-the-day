class SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :art

  has_many :posts
end
