class PlaylistsController < ApplicationController

    def create
        playlist = current_user.playlists.create(playlist_params)
        if playlist.valid?
            render json: playlist,status: :created
        else
            render json: {errors: playlist.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def index
        playlists = current_user.playlists
        render json: playlists
    end

    def show
        playlist = current_user.playlists.find_by(title: params[:title])
        if playlist
            render json: playlist
        else
            render json: {error:"Playlist does not exist"}, status: :not_found
        end
    end

end
