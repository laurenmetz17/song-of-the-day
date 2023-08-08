class PostsController < ApplicationController

    def create
        post = current_user.posts.create(post_params)
        if post.valid?
            render json: post, status: :created
        else
            render json: {errors: post.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        post = current_user.posts.find_by(id: params[:id])
        post.update(comment: params[:comment])
        if post.valid?
            render json: post
        else
            render json: {errors: post.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        post = current_user.posts.find_by(id: params[:id])
        post.destroy
        head :no_content
    end

    private

    def post_params
        params.permit(:song_id, :playlist_id, :comment, :date)
    end

end
