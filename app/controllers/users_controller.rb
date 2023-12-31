class UsersController < ApplicationController

    skip_before_action :authorize, only: [:create, :index]
    
    def index
        users = User.all 
        render json: users
    end

    def show 
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, include: ['playlists', 'playlists.songs', 'posts', 'songs']
        else
            render json: {error:"unathorized"}, status: :unathorized
        end
    end

    def destroy 
        user = User.find(params[:id])
        listner.destroy
        head :no_content
    end
    
    def create
        user = User.create(user_params)
        if user.valid?
            render json: user, include: ['playlists', 'playlists.songs', 'posts', 'songs'], status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.permit(:name, :username, :password, :password_confirmation)
    end
end
