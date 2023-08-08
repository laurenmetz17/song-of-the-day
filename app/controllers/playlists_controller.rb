class PlaylistsController < ApplicationController

    def create
        playlist = current_user.playlists.create(playlist_params)
        byebug;
        if playlist.valid?
            render json: playlist,status: :created
        else
            render json: {errors: playlist.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def index
        playlists = current_user.playlists
        byebug;
        render json: playlists, each_serializer: PlaylistSerializer
    end

    def show
        playlist = current_user.playlists.find_by(title: params[:title])
        if playlist
            render json: playlist
        else
            render json: {error:"Playlist does not exist"}, status: :not_found
        end
    end
    
    private

    def playlist_params
        params.permit(:title)
    end

end
