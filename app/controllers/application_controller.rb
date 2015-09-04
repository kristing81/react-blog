require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :html, :json

  include AbstractController::Translation
  protect_from_forgery with: :null_session
  # before_action :authenticate_user_from_token!

  def authenticate_user_from_token!
    auth_token = request.headers['Authorization']

    if auth_token
      authenticate_with_auth_token auth_token
    else
      authentication_error
    end
  end

  private

  def authenticate_with_auth_token auth_token 
    unless auth_token.include?(':')
      authentication_error
      return
    end

    user_id = auth_token.split(':').first
    user = User.where(id: user_id).first

    if user && Devise.secure_compare(user.access_token, auth_token)
      sign_in user, store: false
    else
      authentication_error
    end
  end

  def authentication_error
    render json: {error: t('unauthorized')}, status: 401  # Authentication timeout
  end
end
