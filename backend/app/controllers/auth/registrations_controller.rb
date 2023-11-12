class Auth::RegistrationsController < ApplicationController
  private
  
  def sign_up_params
    params.permit(:email, :password, :password_confirmation)
  end
end
