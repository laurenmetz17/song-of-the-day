class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authorize
  
  private

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

  def current_user
    user = User.find_by(id: session[:user_id])
  end

end
