class SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist

  has_many :posts
end
